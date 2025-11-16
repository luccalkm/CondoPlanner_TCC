import { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import {
    Box, Paper, Typography, TextField, Button, MenuItem, Select, InputLabel,
    FormControl, Stack, Alert, CircularProgress} from '@mui/material';
import { ApiConfiguration } from '../../../apiClient/apiConfig';
import { ResidentialLinksApi, ETipoOcupacao, type BlockDto, EStatusVinculoResidencial } from '../../../apiClient';
import { useInstanceStore } from '../../../stores/instance.store';
import { ArrowBack } from '@mui/icons-material';

const api = new ResidentialLinksApi(ApiConfiguration);

export const ResidentialLinkGate = () => {
    const { condominiumId } = useParams();
    const navigate = useNavigate();
    const id = Number(condominiumId);
    const { selectedCondominium, isAdminSelected } = useInstanceStore();
    const blocks = useMemo<BlockDto[]>(
        () => (selectedCondominium?.blocks ?? []) as BlockDto[],
        [selectedCondominium]
    );

    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [apartmentNumber, setApartmentNumber] = useState('');
    const [blockId, setBlockId] = useState<number | ''>('');
    const [tipoOcupacao, setTipoOcupacao] = useState<ETipoOcupacao>(ETipoOcupacao.Proprietario);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        let active = true;
        if (!id || Number.isNaN(id)) return;

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const userLink = await api.apiResidentialLinksMyCondominiumIdGet({ condominiumId: id });
                if (userLink && userLink.status == EStatusVinculoResidencial.Pendente) {
                    setAllowed(false);
                    setSubmitted(true);
                    return;
                }
                if (active) setAllowed(true);
            } catch {
                if (active) setAllowed(false);
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => { active = false; };
    }, [id]);

    const handleSubmit = async () => {
        if (!apartmentNumber.trim()) {
            setError('Informe o número do apartamento.');
            return;
        }
        setError(null);
        setSubmitting(true);
        try {
            await api.apiResidentialLinksRequestPost({
                createResidentialLinkRequest: {
                    condominiumId: id,
                    apartmentNumber: apartmentNumber.trim(),
                    blockId: blockId === '' ? undefined : Number(blockId),
                    tipoOcupacao
                }
            });
            setSubmitted(true);
        } catch (e: unknown) {
            setError((e as Error)?.message || 'Erro ao enviar solicitação.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (allowed || isAdminSelected()) {
        return <Outlet />;
    }

    return (
        <Paper variant='outlined' sx={{ width: '75vw', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', p: 3, borderRadius: 3 }}>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight={700}>
                    Vínculo residencial necessário
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Para acessar as informações deste condomínio, você precisa solicitar a vinculação ao seu apartamento.
                    Informe os dados abaixo e aguarde a aprovação do Administrador/Síndico.
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}
                {submitted && (
                    <>
                        <Alert severity="warning">
                            Solicitação enviada. Aguarde a aprovação do Administrador/Síndico.
                        </Alert>
                        <Button size='small' variant='outlined' startIcon={<ArrowBack />} onClick={() => navigate('/condominios')}>
                            Voltar para meus condomínios
                        </Button>
                    </>
                )}

                {!submitted && (
                    <>
                        {blocks?.length > 1 && (
                            <FormControl fullWidth size="small">
                                <InputLabel id="block-label">Bloco</InputLabel>
                                <Select
                                    labelId="block-label"
                                    label="Bloco"
                                    value={blockId}
                                    onChange={(e) => setBlockId(e.target.value as number | '')}
                                >
                                    <MenuItem value="">Não sei / Não se aplica</MenuItem>
                                    {blocks.map((b) => (
                                        <MenuItem key={b.id} value={b.id!}>{b.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        <TextField
                            label="Número do apartamento"
                            placeholder="Ex.: 101"
                            value={apartmentNumber}
                            onChange={(e) => setApartmentNumber(e.target.value)}
                            fullWidth
                            size="small"
                        />

                        <FormControl fullWidth size="small">
                            <InputLabel id="ocupacao-label">Tipo de ocupação</InputLabel>
                            <Select
                                labelId="ocupacao-label"
                                label="Tipo de ocupação"
                                value={tipoOcupacao}
                                onChange={(e) => setTipoOcupacao(e.target.value as ETipoOcupacao)}
                            >
                                <MenuItem value={ETipoOcupacao.Proprietario}>Proprietário</MenuItem>
                                <MenuItem value={ETipoOcupacao.Inquilino}>Inquilino</MenuItem>
                                <MenuItem value={ETipoOcupacao.Familiar}>Familiar</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack direction="row" gap={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? 'Enviando...' : 'Solicitar vínculo'}
                            </Button>
                            <Button variant="outlined" onClick={() => navigate('/condominios')}>
                                Voltar para lista
                            </Button>
                        </Stack>
                    </>
                )}
            </Stack>
        </Paper>
    );
};

export default ResidentialLinkGate;