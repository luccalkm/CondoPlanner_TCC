import React from "react";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import { GridView } from "@mui/icons-material";
import CondominiumCard from "./CondominiumCard";
import { useCondominiumStore } from "../../../stores/condominium.store";

interface Props {
    loading: boolean;
    onOpen: (id: number) => void;
    onEdit: (id: number) => void;
}

const CondominiumList: React.FC<Props> = ({ loading, onEdit, onOpen }) => {
    const { userCondominiumRelations } = useCondominiumStore();

    if (loading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress />
            </Box>
        );

    if (userCondominiumRelations.length === 0)
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
            {userCondominiumRelations.map((relation) => (
                <Grid key={`${relation.condominiumId}-${relation.userId}`} size={{ xs: 12, sm: 6, md: 4 }}>
                    <CondominiumCard
                        userCondominiumRelation={relation}
                        onEdit={onEdit}
                        onOpen={onOpen}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default CondominiumList;
