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
import { AddressApi, type CondominiumDto } from "../../../apiClient";
import { ApiConfiguration } from "../../../apiClient/apiConfig";
import { useAuthStore } from "../../../stores/auth.store";
import { useAlertStore } from "../../../stores/alert.store";

type CreateOrEditCondominiumProps = {
    condominiumId?: number | null;
    onClose: () => void;
};

export default function CreateOrEditCondominium({
    condominiumId,
    onClose
}: CreateOrEditCondominiumProps) {
    const { condominiums, createOrEditCondominium, fetchCondominiums } = useCondominiumStore();
    const { user } = useAuthStore();
    const addressApi = useMemo(() => new AddressApi(ApiConfiguration), []);
    const showAlert = useAlertStore((state) => state.showAlert);

    const [saving, setSaving] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);
    const [cepValido, setCepValido] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [form, setForm] = useState<CondominiumDto>({
        id: condominiumId || undefined,
        name: "",
        cnpj: "",
        email: "",
        address: {
            street: "",
            number: "",
            complement: "",
            district: "",
            city: "",
            state: "",
            zipCode: "",
            country: "Brasil",
        },
    });

    const [debouncedCep] = useDebounce(form.address?.zipCode, 1300);

    const fetchAddress = useCallback(async () => {
        const cep = debouncedCep?.replace(/\D/g, "");
        if (cep?.length !== 8) return;

        setLoadingCep(true);
        try {
            const response = await addressApi.apiAddressCepGet({ cep });

            setForm((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    street: response.street || "",
                    district: response.district || "",
                    city: response.city || "",
                    state: response.state || "",
                    country: response.country || "Brasil",
                },
            }));
            setCepValido(true);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            showAlert("CEP não encontrado ou inválido. Error: " + errorMessage, "error");
            setCepValido(false);
        } finally {
            setLoadingCep(false);
        }
    }, [debouncedCep, addressApi, showAlert]);

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
                name: cond.name || "",
                cnpj: cond.cnpj || "",
                email: cond.email || "",
                address: {
                    street: cond.address?.street || "",
                    number: cond.address?.number || "",
                    complement: cond.address?.complement || "",
                    district: cond.address?.district || "",
                    city: cond.address?.city || "",
                    state: cond.address?.state || "",
                    zipCode: cond.address?.zipCode || "",
                    country: cond.address?.country || "Brasil",
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
            address: { ...prev.address, [field]: value },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await createOrEditCondominium(form)
            .then(() => {
                fetchCondominiums(user?.id);
                onClose();
            })
            .finally(() => {
                setSaving(false);
            });
    };

    const isFormValid = cepValido && form.name && form.email;

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
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
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
                            value={form.address?.zipCode}
                            onChange={(e) =>
                                handleAddressChange("zipCode", e.target.value.replace(/\D/g, ""))
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
                            value={form.address?.street}
                            disabled={!cepValido}
                            onChange={(e) => handleAddressChange("street", e.target.value)}
                        />
                    </Grid>

                    <Grid size={8}>
                        <TextField
                            label="Complemento"
                            fullWidth
                            disabled={!cepValido}
                            value={form.address?.complement}
                            onChange={(e) => handleAddressChange("complement", e.target.value)}
                        />
                    </Grid>

                    <Grid size={4}>
                        <TextField
                            label="Número"
                            fullWidth
                            disabled={!cepValido}
                            value={form.address?.number}
                            onChange={(e) => handleAddressChange("number", e.target.value)}
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Bairro"
                            fullWidth
                            disabled={!cepValido}
                            value={form.address?.district}
                            onChange={(e) => handleAddressChange("district", e.target.value)}
                        />
                    </Grid>

                    <Grid size={8}>
                        <TextField
                            label="Cidade"
                            fullWidth
                            disabled={!cepValido}
                            value={form.address?.city}
                            onChange={(e) => handleAddressChange("city", e.target.value)}
                        />
                    </Grid>

                    <Grid size={4}>
                        <TextField
                            label="Estado"
                            fullWidth
                            disabled={!cepValido}
                            value={form.address?.state}
                            onChange={(e) => handleAddressChange("state", e.target.value)}
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
