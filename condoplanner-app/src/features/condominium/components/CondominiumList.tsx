import React from "react";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { GridView } from "@mui/icons-material";
import type { CondominioDto } from "../../../apiClient";
import CondominiumCard from "./CondominiumCard";

interface Props {
    condominiums: CondominioDto[];
    loading: boolean;
    onOpen: (id: number) => void;
    onEdit: (id: number) => void;
}

const CondominiumList: React.FC<Props> = ({ condominiums, loading, onEdit, onOpen }) => {
    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress />
            </Box>
        );

    if (condominiums.length === 0)
        return (
            <Box textAlign="center" mt={6}>
                <GridView sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                <Typography color="text.secondary">
                    Nenhum condomínio encontrado.
                </Typography>
            </Box>
        );

    return (
        <Grid container spacing={2} maxHeight={'60vh'} overflow={'auto'}>
            {condominiums.map((cond) => (
                <Grid key={cond.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <CondominiumCard
                        cond={cond}
                        onEdit={onEdit}
                        onOpen={onOpen}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default CondominiumList;
