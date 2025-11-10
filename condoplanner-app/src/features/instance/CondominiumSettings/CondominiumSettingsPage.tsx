import { Box, Typography, Grid, Card, CardContent, Button, CircularProgress, Divider, Paper } from '@mui/material';
import { useInstanceStore } from '../../../stores/instance.store';
import { useAlertStore } from '../../../stores/alert.store';
import { ETipoUsuario, CondominiumInviteApi, type GenerateInviteRequest, type GenerateInviteResponse } from '../../../apiClient';
import { ApiConfiguration } from '../../../apiClient/apiConfig';
import { useState, useMemo } from 'react';
import InviteDialog, { type InviteData } from './InviteDialog';
import MembersList from './components/MembersList';
import { AdminPanelSettings } from '@mui/icons-material';

const inviteApi = new CondominiumInviteApi(ApiConfiguration);

const roleOptions: { label: string; type: ETipoUsuario; description: string }[] = [
    { label: 'Síndico', type: ETipoUsuario.Sindico, description: 'Responsável pela gestão do condomínio.' },
    { label: 'Morador', type: ETipoUsuario.Morador, description: 'Acesso padrão para residentes.' },
    { label: 'Funcionário', type: ETipoUsuario.Porteiro, description: 'Equipe operacional / apoio.' },
];

const CondominiumSettingsPage = () => {
    const { selectedCondominium, isAdminSelected } = useInstanceStore();
    const showAlert = useAlertStore(s => s.showAlert);

    const [loadingInvite, setLoadingInvite] = useState<ETipoUsuario | null>(null);

    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
    const [inviteData, setInviteData] = useState<InviteData | null>(null);

    const condominiumName = useMemo(() => selectedCondominium?.name ?? null, [selectedCondominium]);

    async function generateInvite(role: ETipoUsuario) {
        if (!selectedCondominium) {
            showAlert('Condomínio não selecionado.', 'error');
            return;
        }
        setLoadingInvite(role);
        try {
            const req: GenerateInviteRequest = {
                condominiumId: selectedCondominium.id,
                role,
                singleUse: false,
                maxUses: null,
                expiresInDays: 1,
            };

            const res: GenerateInviteResponse = await inviteApi.apiCondominiumInvitesPost({
                generateInviteRequest: req
            });

            if (!res.token) {
                showAlert('Erro ao gerar convite (token vazio).', 'error');
                return;
            }

            const url = `${window.location.origin}/accept-invite?token=${res.token}`;
            const roleLabel = roleOptions.find(o => o.type === role)?.label ?? String(role);

            setInviteData({
                roleType: role,
                roleLabel,
                url,
                expires: res.expiresAt ?? null
            });
            setInviteDialogOpen(true);
            showAlert(`Convite gerado para papel ${roleLabel}.`, 'success');
        } catch (e) {
            console.error(e);
            showAlert('Falha ao gerar convite.', 'error');
        } finally {
            setLoadingInvite(null);
        }
    }

    return (
        <Box p={3}>
            <Paper variant='outlined' sx={{ p: 2, mb: 3 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <AdminPanelSettings sx={{ color: 'primary.main' }} />
                    <Typography variant="h5" fontWeight={700}>Administração</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {selectedCondominium?.name || 'carregando...'} - {selectedCondominium?.email || 'sem email cadastrado'}
                </Typography>
            </Paper>
            <Divider sx={{ my: 3 }} />
            {isAdminSelected() && (
                <Box>
                    <Grid container spacing={2}>
                        {roleOptions.map(r => (
                            <Grid key={r.type} size={{ xs: 12, sm: 4 }}>
                                <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1" fontWeight={600}>{r.label}</Typography>
                                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>{r.description}</Typography>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="small"
                                            onClick={() => generateInvite(r.type)}
                                            disabled={loadingInvite === r.type}
                                            startIcon={loadingInvite === r.type ? <CircularProgress size={16} /> : undefined}
                                        >
                                            {loadingInvite === r.type ? 'Gerando...' : 'Gerar QRCode'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{ my: 3 }} />

                </Box>
            )}
            
            <MembersList />
            
            <InviteDialog
                open={inviteDialogOpen}
                onClose={() => setInviteDialogOpen(false)}
                invite={inviteData}
                condominiumName={condominiumName}
            />
        </Box>
    );
};

export default CondominiumSettingsPage;
