import { Box, Typography } from '@mui/material';
import { useInstanceStore } from '../../stores/instance.store';

const NoticesPage = () => {
    const { selectedCondominium } = useInstanceStore();
    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={700}>Comunicados</Typography>
            <Typography variant="body2" color="text.secondary">Contexto do condomínio: {selectedCondominium?.nome || 'carregando...'}</Typography>
        </Box>
    );
};

export default NoticesPage;
