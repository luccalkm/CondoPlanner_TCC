import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    InputAdornment,
    Divider,
    Button,
} from "@mui/material";
import { useCondominiumStore } from "../../../stores/condominium.store";
import { useDebounce } from "use-debounce";
import { DomainAdd, Email, LocationOn, Numbers } from "@mui/icons-material";
import { AddressApi, type CondominioDto } from "../../../apiClient";
import { ApiConfiguration } from "../../../apiClient/apiConfig";

type CreateOrEditCondominiumProps = {
    condominiumId?: number | null;
    onClose: () => void;
};

export default function CreateOrEditCondominium({
    condominiumId,
    onClose
}: CreateOrEditCondominiumProps) {
    const { condominiums, createOrEditCondominium } = useCondominiumStore();
    const addressApi = useMemo(() => new AddressApi(ApiConfiguration), []);

    const [saving, setSaving] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);
    const [cepValido, setCepValido] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [form, setForm] = useState<CondominioDto>({
        id: condominiumId || undefined,
        nome: "",
        cnpj: "",
        email: "",
        endereco: {
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: "",
            pais: "Brasil",
        },
    });

    const [debouncedCep] = useDebounce(form.endereco?.cep, 1300);

    const fetchAddress = useCallback(async () => {
        const cep = debouncedCep?.replace(/\D/g, "");
        if (cep?.length !== 8) return;

        setLoadingCep(true);
        try {
            const response = await addressApi.apiAddressPost({
                getCepInput: { cep },
            });

            setForm((prev) => ({
                ...prev,
                endereco: {
                    ...prev.endereco,
                    logradouro: response.logradouro || "",
                    bairro: response.bairro || "",
                    cidade: response.cidade || "",
                    estado: response.estado || "",
                    pais: response.pais || "Brasil",
                },
            }));
            setCepValido(true);
        } catch (error) {
            console.warn("CEP não encontrado ou inválido", error);
            setCepValido(false);
        } finally {
            setLoadingCep(false);
        }
    }, [debouncedCep, addressApi]);

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    useEffect(() => {
        if (!condominiumId) return;

        setLoadingData(true);
        const cond = condominiums.find((c) => c.id === condominiumId);

        if (cond) {
            setForm({
                id: cond.id,
                nome: cond.nome || "",
                cnpj: cond.cnpj || "",
                email: cond.email || "",
                endereco: {
                    logradouro: cond.endereco?.logradouro || "",
                    numero: cond.endereco?.numero || "",
                    complemento: cond.endereco?.complemento || "",
                    bairro: cond.endereco?.bairro || "",
                    cidade: cond.endereco?.cidade || "",
                    estado: cond.endereco?.estado || "",
                    cep: cond.endereco?.cep || "",
                    pais: cond.endereco?.pais || "Brasil",
                },
            });
            setCepValido(true);
        }

        setLoadingData(false);
    }, [condominiumId, condominiums]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddressChange = (field: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            endereco: { ...prev.endereco, [field]: value },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await createOrEditCondominium(form)
            .then(() => {
                onClose();
            })
            .finally(() => {
                setSaving(false);
            });
    };

    const isFormValid = cepValido && form.nome && form.email;

    if (loadingData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" py={6}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    maxWidth: 600,
                    mx: "auto",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {condominiumId ? "Editar Condomínio" : "Dados do Condomínio"}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                label="Nome do condomínio"
                                fullWidth
                                value={form.nome}
                                onChange={(e) => handleChange("nome", e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DomainAdd color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="CNPJ"
                                fullWidth
                                value={form.cnpj}
                                onChange={(e) => handleChange("cnpj", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Numbers color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                required
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                    maxWidth: 600,
                    mx: "auto",
                    my: 2,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Endereço
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            label="CEP"
                            fullWidth
                            value={form.endereco?.cep}
                            onChange={(e) =>
                                handleAddressChange("cep", e.target.value.replace(/\D/g, ""))
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {loadingCep ? (
                                            <CircularProgress size={18} />
                                        ) : (
                                            <LocationOn color="action" />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                            helperText="Digite o CEP para buscar automaticamente"
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Logradouro"
                            fullWidth
                            value={form.endereco?.logradouro}
                            disabled={!cepValido}
                            onChange={(e) => handleAddressChange("logradouro", e.target.value)}
                        />
                    </Grid>

                    <Grid size={8}>
                        <TextField
                            label="Complemento"
                            fullWidth
                            disabled={!cepValido}
                            value={form.endereco?.complemento}
                            onChange={(e) => handleAddressChange("complemento", e.target.value)}
                        />
                    </Grid>

                    <Grid size={4}>
                        <TextField
                            label="Número"
                            fullWidth
                            disabled={!cepValido}
                            value={form.endereco?.numero}
                            onChange={(e) => handleAddressChange("numero", e.target.value)}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Bairro"
                            fullWidth
                            disabled={!cepValido}
                            value={form.endereco?.bairro}
                            onChange={(e) => handleAddressChange("bairro", e.target.value)}
                        />
                    </Grid>

                    <Grid size={8}>
                        <TextField
                            label="Cidade"
                            fullWidth
                            disabled={!cepValido}
                            value={form.endereco?.cidade}
                            onChange={(e) => handleAddressChange("cidade", e.target.value)}
                        />
                    </Grid>

                    <Grid size={4}>
                        <TextField
                            label="Estado"
                            fullWidth
                            disabled={!cepValido}
                            value={form.endereco?.estado}
                            onChange={(e) => handleAddressChange("estado", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Grid size={12}>
                <Button
                    loading={saving}
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={!isFormValid}
                    onClick={handleSubmit}
                >
                    {condominiumId ? "Salvar Alterações" : "Salvar Condomínio"}
                </Button>
            </Grid>
        </>
    );
}
