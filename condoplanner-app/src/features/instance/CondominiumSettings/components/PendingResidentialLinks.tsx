import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Stack,
    Tooltip,
    IconButton,
    Chip,
    Grid,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { type GridColDef } from '@mui/x-data-grid';
import CenteredDataGrid from '../../../../components/CenteredDataGrid';
import {
    ResidentialLinksApi,
    type ResidentialLinkDto,
    ETipoOcupacao,
} from '../../../../apiClient';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';
import { useInstanceStore } from '../../../../stores/instance.store';
import { useAlertStore } from '../../../../stores/alert.store';

const api = new ResidentialLinksApi(ApiConfiguration);

const occLabel = (t?: ETipoOcupacao) => {
    switch (t) {
        case ETipoOcupacao.Proprietario: return 'Proprietário';
        case ETipoOcupacao.Inquilino: return 'Inquilino';
        case ETipoOcupacao.Familiar: return 'Familiar';
        default: return '-';
    }
};

const PendingResidentialLinks: React.FC = () => {
    const { selectedCondominium, isAdminSelected, isSyndicSelected } = useInstanceStore();
    const canReview = useMemo(() => isAdminSelected() || isSyndicSelected(), [isAdminSelected, isSyndicSelected]);
    const showAlert = useAlertStore(s => s.showAlert);

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<ResidentialLinkDto[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [actingId, setActingId] = useState<number | null>(null);



    useEffect(() => {
        if (!selectedCondominium || !canReview) return;

        const fetchPendingResidentialLinks = async () => {
            setLoading(true);
            try {
                const data = await api.apiResidentialLinksPendingCondominiumIdGet({
                    condominiumId: selectedCondominium?.id as number,
                });
                setRows(data ?? []);
            } catch (e) {
                console.error(e);
                showAlert('Falha ao carregar solicitações de vínculo.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchPendingResidentialLinks();
    }, [selectedCondominium, canReview, refreshKey, showAlert]);

    const decide = async (row: ResidentialLinkDto, aprovar: boolean) => {
        if (!row.id) return;
        try {
            setActingId(row.id);
            await api.apiResidentialLinksReviewPost({
                reviewResidentialLinkRequest: { linkId: row.id, aprovar },
            });
            showAlert(aprovar ? 'Vínculo aprovado.' : 'Vínculo rejeitado.', 'success');
            setRefreshKey(k => k + 1);
        } catch (e) {
            console.error(e);
            showAlert('Falha ao processar decisão.', 'error');
        } finally {
            setActingId(null);
        }
    };

    const columns: GridColDef<ResidentialLinkDto>[] = [
        {
            field: 'unit',
            headerName: 'Unidade',
            flex: 1,
            valueGetter: (_v, r) => `${r.blockName ?? '-'} • ${r.apartmentNumber ?? '-'}`,
        },
        {
            field: 'occupationType',
            headerName: 'Ocupação',
            flex: 0.8,
            valueGetter: (_v, r) => occLabel(r.occupationType),
        },
        {
            field: 'userName',
            headerName: 'Solicitante',
            flex: 0.6,
            renderCell: (p) => (
                <Chip size="small" label={p.row.userName ?? '-'} />
            ),
        },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 0.8,
            sortable: false,
            filterable: false,
            renderCell: (p) => (
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ width: '100%' }}>
                    <Tooltip title="Aprovar">
                        <span>
                            <IconButton
                                size="small"
                                color="success"
                                disabled={actingId === p.row.id || loading}
                                onClick={() => decide(p.row, true)}
                            >
                                <CheckIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Rejeitar">
                        <span>
                            <IconButton
                                size="small"
                                color="error"
                                disabled={actingId === p.row.id || loading}
                                onClick={() => decide(p.row, false)}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    if (!canReview || !selectedCondominium) return null;

    return (
        <Paper sx={{ p: 2, mt: 2 }} variant="outlined">
            <Grid
                container
                size={12}
                alignItems={'center'}
            >
                <Grid size={10}>
                    <Typography fontWeight={600}>
                        Vínculos residenciais pendentes
                    </Typography>
                </Grid>
                <Grid size={2}>
                    <Tooltip title="Atualizar">
                        <IconButton size="small" onClick={() => setRefreshKey(k => k + 1)} disabled={loading}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>

                <Grid size={12} textAlign={'right'} my={1} spacing={1}>
                    <Chip size="small" variant='outlined' color={rows.length > 0 ? 'warning' : 'info'} label={`${rows.length} pendente(s)`} />
                </Grid>
            </Grid>

            <Box>
                <CenteredDataGrid
                    rows={rows}
                    getRowId={(r) => r.id as number}
                    columns={columns}
                    loading={loading}
                    embedPagination
                />
            </Box>
        </Paper>
    );
};

export default PendingResidentialLinks;