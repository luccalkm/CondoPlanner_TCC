import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Paper,
    Button,
    IconButton,
    InputAdornment,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Add, AddHome, Search } from "@mui/icons-material";
import { useCondominiumStore } from "../../stores/condominium.store";
import { useAuthStore } from "../../stores/auth.store";
import CondominiumList from "./components/CondominiumList";
import CondominiumDialog from "./components/CondominiumDialog";

const CondominiumPage: React.FC = () => {
    const { condominiums, fetchCondominiums, loading } = useCondominiumStore();
    const { user } = useAuthStore();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [query, setQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchCondominiums(user?.id);
    }, [fetchCondominiums, user]);

    const filtered = condominiums.filter((c) =>
        c.nome?.toLowerCase().includes(query.toLowerCase())
    );

    const handleOpenDialog = () => {
        setEditingId(null);
        setOpenDialog(true);
    };

    const handleEditCondominium = (id: number) => {
        setEditingId(id);
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => setOpenDialog(false);
    const handleOpenCondominium = (id: number) => console.log("Abrir", id);

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4 },
                py: { xs: 2, sm: 3 },
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginX: "auto",
                width: isMobile ? "auto" : "70%",
            }}
        >
            <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
                <Grid container alignItems="center">
                    <Grid size={12}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Meus Condomínios
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Gerencie e organize seus condomínios
                        </Typography>
                    </Grid>

                    <Box display={'flex'} gap={2} alignItems="center" width="100%">
                        <TextField
                            fullWidth
                            sx={{ width: "60%" }}
                            placeholder="Pesquisar..."
                            size="small"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search color="action" />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 3 },
                            }}
                        />

                        {isMobile ? (
                            <IconButton color="primary" onClick={handleOpenDialog}>
                                <AddHome />
                            </IconButton>
                        ) : (
                            <Button
                                sx={{ width: "40%" }}
                                startIcon={<Add />}
                                variant="contained"
                                color="primary"
                                onClick={handleOpenDialog}
                            >
                                ADICIONAR CONDOMÍNIO
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Paper>

            <Paper sx={{ p: 2, borderRadius: 3, flexGrow: 1 }}>
                <Typography variant="h5" mb={2} sx={{ fontWeight: 700 }}>
                    Todos os condomínios
                </Typography>
                <CondominiumList
                    condominiums={filtered}
                    loading={loading}
                    onOpen={handleOpenCondominium}
                    onEdit={handleEditCondominium}
                />
            </Paper>

            <CondominiumDialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullScreen={isMobile}
                condominiumId={editingId} 
            />
        </Box>
    );
};

export default CondominiumPage;
