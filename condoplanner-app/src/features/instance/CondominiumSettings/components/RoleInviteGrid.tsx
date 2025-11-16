import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Divider,
    CardActions,
    Button,
    CircularProgress,
} from '@mui/material';
import { ETipoUsuario } from '../../../../apiClient';

type RoleOption = { label: string; type: ETipoUsuario; description: string };

interface RoleInviteGridProps {
    roles: RoleOption[];
    loadingRole: ETipoUsuario | null;
    onGenerate: (role: ETipoUsuario) => void;
}

const RoleInviteGrid: React.FC<RoleInviteGridProps> = ({ roles, loadingRole, onGenerate }) => {
    return (
        <Box>
            <Grid container spacing={2}>
                {roles.map((r) => (
                    <Grid key={r.type} size={{ xs: 12, sm: 4 }}>
                        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight={600}>{r.label}</Typography>
                                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                    {r.description}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button
                                    fullWidth
                                    size="small"
                                    onClick={() => onGenerate(r.type)}
                                    disabled={loadingRole === r.type}
                                    startIcon={loadingRole === r.type ? <CircularProgress size={16} /> : undefined}
                                >
                                    {loadingRole === r.type ? 'Gerando...' : 'Gerar QRCode'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ my: 3 }} />
        </Box>
    );
};

export default RoleInviteGrid;