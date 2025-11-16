import React from "react";
import { Paper, Typography, Divider, Grid, TextField, InputAdornment, CircularProgress } from "@mui/material";
import { DomainAdd, Numbers, Email, LocationOn } from "@mui/icons-material";
import type { AddressDto } from "../../../../apiClient";

type Props = {
    form: {
        name: string;
        cnpj: string;
        email: string;
        address: AddressDto;
    };
    onField: (field: string, value: string) => void;
    onAddress: (field: string, value: string) => void;
    loadingCep: boolean;
    cepValido: boolean;
};

export const StepCondoAddress: React.FC<Props> = ({
    form,
    onField,
    onAddress,
    loadingCep,
    cepValido,
}) => {
    return (
        <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
                Dados do condomínio
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TextField
                        label="Nome do condomínio"
                        fullWidth
                        required
                        value={form.name}
                        onChange={(e) => onField("name", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DomainAdd color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        label="CNPJ"
                        fullWidth
                        value={form.cnpj}
                        onChange={(e) => onField("cnpj", e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        label="Email"
                        fullWidth
                        required
                        value={form.email}
                        onChange={(e) => onField("email", e.target.value)}
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

            <Typography variant="subtitle1" sx={{ mt: 3 }}>
                Endereço
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        label="CEP"
                        fullWidth
                        value={form.address.zipCode}
                        onChange={(e) => onAddress("zipCode", e.target.value.replace(/\D/g, ""))}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {loadingCep ? <CircularProgress size={18} /> : <LocationOn color="action" />}
                                </InputAdornment>
                            ),
                        }}
                        helperText="Digite o CEP para buscar automaticamente"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                    <TextField
                        label="Logradouro"
                        fullWidth
                        value={form.address.street}
                        disabled={!cepValido}
                        onChange={(e) => onAddress("street", e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                        label="Número"
                        fullWidth
                        value={form.address.number}
                        disabled={!cepValido}
                        onChange={(e) => onAddress("number", e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 9 }}>
                    <TextField
                        label="Complemento"
                        fullWidth
                        value={form.address.complement}
                        disabled={!cepValido}
                        onChange={(e) => onAddress("complement", e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        label="Bairro"
                        fullWidth
                        value={form.address.district}
                        disabled={!cepValido}
                        onChange={(e) => onAddress("district", e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                        label="Cidade"
                        fullWidth
                        value={form.address.city}
                        disabled={!cepValido}
                        onChange={(e) => onAddress("city", e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                    <TextField
                        label="UF"
                        fullWidth
                        value={form.address.state}
                        disabled={!cepValido}
                        onChange={(e) => onAddress("state", e.target.value)}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};