import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Article, MeetingRoom, Settings, Logout, SpaceDashboard } from '@mui/icons-material';
import { useInstanceStore } from '../../stores/instance.store';
import { useAuth } from '../../hooks/useAuth';
import { InstanceFooter } from './InstanceFooter';

export const InstanceLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const { condominiumId } = useParams();
    const id = Number(condominiumId);
    const { selectedCondominium, clearSelection, isAdminSelected, isSyndicSelected } = useInstanceStore();
    const { logout } = useAuth();

    const handleLeave = () => {
        clearSelection();
        navigate('/condominios');
    };

    const handleLogout = () => {
        clearSelection();
        logout();
        navigate('/login');
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ backgroundColor: '#fafafa' }}>
            {!isMobile && (
                <AppBar position="fixed" color="primary" elevation={2}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                            {selectedCondominium?.name || `Condomínio #${id}`}
                        </Typography>
                        <IconButton color="inherit" onClick={() => navigate('areas')}><SpaceDashboard /></IconButton>
                        <IconButton color="inherit" onClick={() => navigate('comunicados')}><Article /></IconButton>
                        {(isAdminSelected() || isSyndicSelected()) && <IconButton color="inherit" onClick={() => navigate('configuracoes')}><Settings /></IconButton>}
                        <IconButton color="inherit" onClick={handleLeave}><MeetingRoom /></IconButton>
                        <IconButton color="inherit" onClick={handleLogout}><Logout /></IconButton>
                    </Toolbar>
                </AppBar>
            )}
            <Box sx={{ mt: !isMobile ? 8 : 0, mb: isMobile ? 8 : 0, width: '100vw', marginX: 'auto' }}>
                <Outlet />
            </Box>
            {isMobile && (
                <InstanceFooter
                    basePath={`/c/${id}`}
                    handleNav={(path) => navigate(path)}
                    onLeave={handleLeave}
                />
            )}
        </Box>
    );
};
