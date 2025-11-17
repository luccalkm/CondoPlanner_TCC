import { useMemo, useEffect } from 'react';
import { Box, useTheme, useMediaQuery, Grid, Paper } from '@mui/material';
import { CommonAreaApi } from '../../../apiClient';
import { ApiConfiguration } from '../../../apiClient/apiConfig';
import { useInstanceStore } from '../../../stores/instance.store';
import { useCondominiumStore } from '../../../stores/condominium.store';
import useCommonAreaViewStore from '../../../stores/commonAreaView.store';
import AreaHeader from './components/AreaHeader';
import AreaPhotosPanel from './components/AreaPhotosPanel';
import AreaInfoChips from './components/AreaInfoChips';
import CommonAreaCalendar from './components/CommonAreaCalendar';
import { useAlertStore } from '../../../stores/alert.store';

const api = new CommonAreaApi(ApiConfiguration);

const CommonAreaViewPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { selectedCondominium } = useInstanceStore();
    const { userCondominiumRelations } = useCondominiumStore();
    const { currentArea, setCurrentArea, handleWorkingTime } = useCommonAreaViewStore();

    const showAlert = useAlertStore((state) => state.showAlert);

    useEffect(() => {
        let mounted = true;
        async function ensureAreaFromUrl() {
            if (currentArea) return;
            try {
                const parts = window.location.pathname.split('/');
                const idx = parts.findIndex(p => p === 'areas');
                const idStr = idx >= 0 && parts.length > idx + 1 ? parts[idx + 1] : null;
                if (!idStr) return;
                const id = Number(idStr);
                if (!Number.isFinite(id)) return;
                const fetched = await api.apiCommonAreaIdGet({ id });
                if (mounted) setCurrentArea(fetched);
            } catch (error: unknown) {
                showAlert("CEP não encontrado ou inválido. Error: " + (error instanceof Error ? error.message : String(error)), "error");
            }
        }
        ensureAreaFromUrl();
        return () => { mounted = false; };
    }, [currentArea, setCurrentArea, showAlert]);

    const area = currentArea;

    const canCreateReservation = useMemo(() => {
        if (!selectedCondominium) return false;
        return userCondominiumRelations.some(r => r.condominiumId === selectedCondominium.id);
    }, [selectedCondominium, userCondominiumRelations]);



    return (
        <Box p={isMobile ? 1 : 3} sx={{ maxWidth: 1000, margin: '0 auto' }}>
            <AreaHeader area={area} handleWorkingTime={handleWorkingTime} />

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <AreaPhotosPanel area={area} />
                </Grid>

                <Grid container size={{ xs: 12, sm: 6 }} spacing={2}>
                    <AreaInfoChips
                        area={area}
                    />
                </Grid>
            </Grid>
            {
                currentArea &&
                    currentArea.requiresApproval ? (
                    <CommonAreaCalendar canEdit={canCreateReservation} />
                ) : (
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        O espaço <b>{currentArea?.name}</b> não permite reservas. O espaço é público e disponível durante o período estabelecido pelo condomínio.
                    </Paper>
                )
            }
        </Box>
    );
};

export default CommonAreaViewPage;
