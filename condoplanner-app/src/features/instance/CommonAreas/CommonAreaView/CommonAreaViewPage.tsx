import { useMemo, useEffect } from 'react';
import { Box, useTheme, useMediaQuery, Grid } from '@mui/material';
import { CommonAreaApi } from '../../../../apiClient';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';
import { useInstanceStore } from '../../../../stores/instance.store';
import useCommonAreaViewStore from '../../../../stores/commonAreaView.store';
import AreaHeader from './components/AreaHeader';
import AreaPhotosPanel from './components/AreaPhotosPanel';
import AreaInfoChips from './components/AreaInfoChips';
import CommonAreaCalendar from './components/CommonAreaCalendar';

const api = new CommonAreaApi(ApiConfiguration);

const CommonAreaViewPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { isAdminSelected } = useInstanceStore();
    const { currentArea, setCurrentArea } = useCommonAreaViewStore();

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
            } catch {
                // ignore - UI will show empty state
            }
        }
        ensureAreaFromUrl();
        return () => { mounted = false; };
    }, [currentArea, setCurrentArea]);

    const area = currentArea;
    
    const canEdit = useMemo(() => {
        if (isAdminSelected && isAdminSelected()) return true;
        return false;
    }, [isAdminSelected]);

    return (
        <Box p={isMobile ? 1 : 3} sx={{ maxWidth: 1000, margin: '0 auto' }}>
            <AreaHeader area={area} canEdit={canEdit} />

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
            <CommonAreaCalendar canEdit={canEdit} />
        </Box>
    );
};

export default CommonAreaViewPage;
