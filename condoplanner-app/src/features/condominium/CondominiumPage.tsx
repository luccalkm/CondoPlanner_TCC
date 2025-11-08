import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { CondominioDto } from "../../apiClient";
import { useCondominiumStore } from "../../stores/condominium.store";
import { useAuthStore } from "../../stores/auth.store";

const CondominiumListPage: React.FC = () => {
    const { condominiums, loading, fetchCondominiums } = useCondominiumStore();
    const { user } = useAuthStore();

    useEffect(() => {
        fetchCondominiums(user?.id);
        console.log(condominiums)
    }, []);

    return (
        <Box
            sx={{
                p: 3,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            {/* Título da Página */}
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Meus Condomínios
            </Typography>

            {/* Loading */}
            {loading ? (
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {condominiums.length > 0 ? (
                        <Grid container spacing={2}>
                            {condominiums.map((cond: CondominioDto) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cond.id}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 3,
                                            boxShadow: 1,
                                            transition: '0.3s',
                                            '&:hover': { boxShadow: 4, transform: 'translateY(-3px)' },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {cond.nome}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {cond.endereco?.logradouro}, {cond.endereco?.cidade}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => console.log('Abrir detalhes', cond.id)}>
                                                Detalhes
                                            </Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => console.log('Editar', cond.id)}
                                            >
                                                Editar
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ textAlign: 'center', mt: 8 }}>
                            <Typography color="text.secondary">Nenhum condomínio encontrado.</Typography>
                        </Box>
                    )}
                </>
            )}

            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: { xs: 80, sm: 24 },
                    right: 24,
                    boxShadow: 3,
                }}
                onClick={() => console.log('Novo condomínio')}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default CondominiumListPage;
