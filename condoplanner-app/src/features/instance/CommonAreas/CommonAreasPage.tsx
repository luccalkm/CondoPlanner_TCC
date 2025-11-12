import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Grid,
    CardContent,
    CardActions,
    Button,
    IconButton,
    CircularProgress,
    Tooltip,
    Paper,
    useMediaQuery,
    useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useInstanceStore } from '../../../stores/instance.store';
import useCommonAreaViewStore from '../../../stores/commonAreaView.store';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import type { CommonAreaDto, UpsertCommonAreaInput } from '../../../apiClient';
import { UploadPhotoButton } from './components/UploadPhotoButton';
import { CommonAreaDialog } from './components/CommonAreaDialog';
import { AddAPhoto, AddBusiness, DomainDisabled } from '@mui/icons-material';
import { CommonAreaCarousel } from './components/CommonAreaCarousel';
import { useCommonAreasStore } from '../../../stores/commonArea.store';
import { placeholderImage as placeholderHelper } from './utils';

const placeholderImage = (seed: number) => placeholderHelper(seed);

export default function CommonAreasPage() {
    const { selectedCondominium, isAdminSelected, isSyndicSelected } = useInstanceStore();
    const { areas, loadingAreas, saveArea, loadAreas } = useCommonAreasStore(selectedCondominium?.id);
    const { setCurrentArea } = useCommonAreaViewStore();
    const [openDialog, setOpenDialog] = useState(false);
    const [editing, setEditing] = useState<CommonAreaDto | null>(null);
    const canManage = useMemo(() => isAdminSelected() || isSyndicSelected(), [isAdminSelected, isSyndicSelected]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const condominiumId = selectedCondominium?.id;
    const navigate = useNavigate();

    function openNew() {
        setEditing(null);
        setOpenDialog(true);
    }

    function openEdit(area: CommonAreaDto) {
        setEditing(area);
        setOpenDialog(true);
    }

    async function handleSave(input: UpsertCommonAreaInput) { await saveArea(input); }
    

    return (
        <Box width={isMobile ? "auto" : "70%"} margin={"0 auto"} p={3}>
            <Paper variant='outlined' sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                    <Typography variant="h5" fontWeight={700}>Áreas Comuns</Typography>
                </Box>
                {canManage && (
                    isMobile ? (
                        <IconButton color="primary" onClick={openNew} aria-label="Nova Área">
                            <AddBusiness />
                        </IconButton>
                    ) : (
                        <Button startIcon={<AddIcon />} variant="contained" onClick={openNew}>
                            Nova Área
                        </Button>
                    )
                )}
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
                {loadingAreas && (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress />
                    </Box>
                )}

                {!loadingAreas && areas.length === 0 && (
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>

                        <Typography variant="body1" color="text.secondary">
                            Nenhuma área comum cadastrada ainda.
                        </Typography>
                        <DomainDisabled fontSize='large' color="disabled" />
                    </Box>
                )}

                <Grid container spacing={2}>
                    {areas.map(area => {
                        const opening = (area.openingTime || '').substring(0, 5);
                        const closing = (area.closingTime || '').substring(0, 5);

                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} key={area.id}>
                                <Paper variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CommonAreaCarousel
                                        alt={area.name ?? 'Área Comum'}
                                        fallbackUrl={placeholderImage(area.id ?? Math.random() * 1000)}
                                        height={160}
                                        areaId={area.id ?? 0}
                                        photos={area.photos || []}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Tooltip title={area.name ?? ''}>
                                            <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                                                {area.name || 'Sem nome'}
                                            </Typography>
                                        </Tooltip>
                                        <Tooltip title={area.description ?? ''}>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {area.description || 'Sem descrição'}
                                            </Typography>
                                        </Tooltip>
                                        <Box mt={1}>
                                            <Typography variant="caption">
                                                Tipo: {area.type || 'N/D'} • Capacidade: {area.capacity ?? 0}
                                            </Typography>
                                        </Box>
                                        <Box mt={0.5}>
                                            <Typography variant="caption">
                                                Horário: {opening || '--:--'} - {closing || '--:--'}
                                            </Typography>
                                        </Box>
                                        {area.requiresApproval && (
                                            <Typography variant="caption" color="warning.main">
                                                Requer aprovação
                                            </Typography>
                                        )}
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                                        <Typography variant="caption" color={area.available ? 'success.main' : 'error.main'}>
                                            {area.available ? 'Disponível' : 'Indisponível'}
                                        </Typography>
                                        <Box display="flex" gap={1} alignItems="center">
                                            <IconButton size="small" onClick={() => { setCurrentArea(area); navigate(condominiumId ? `/c/${condominiumId}/areas/${area.id}` : `/areas/${area.id}`); }} aria-label="Ir">
                                                <ArrowForward fontSize="small" />
                                            </IconButton>
                                            {canManage && (
                                                <Box display="flex" gap={1}>
                                                    <UploadPhotoButton
                                                        areaId={area.id!}
                                                        onUploaded={() => loadAreas()}
                                                        size="small"
                                                        icon={<AddAPhoto fontSize="small" />}
                                                    />
                                                    <IconButton size="small" onClick={() => openEdit(area)} aria-label="Editar">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            )}
                                        </Box>
                                    </CardActions>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>

            <CommonAreaDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                editing={editing}
                condominiumId={condominiumId || 0}
                onSave={handleSave}
            />
        </Box>
    );
}
