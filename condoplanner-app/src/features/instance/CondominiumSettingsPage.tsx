import { Box, Typography } from '@mui/material';
import { useInstanceStore } from '../../stores/instance.store';

const CondominiumSettingsPage = () => {
    const { selectedCondominium } = useInstanceStore();
    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={700}>Configurações do Condomínio</Typography>
            <Typography variant="body2" color="text.secondary">Gerencie parâmetros específicos de: {selectedCondominium?.nome || 'carregando...'}</Typography>
        </Box>
    );
};

export default CondominiumSettingsPage;
