import { Box, Typography, Divider, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useInstanceStore } from '../../../stores/instance.store';
import { useAlertStore } from '../../../stores/alert.store';
import { ETipoUsuario, CondominiumInviteApi, type GenerateInviteRequest, type GenerateInviteResponse } from '../../../apiClient';
import { ApiConfiguration } from '../../../apiClient/apiConfig';
import { useState, useMemo } from 'react';
import InviteDialog, { type InviteData } from './components/InviteDialog';
import MembersList from './components/MembersList';
import { AdminPanelSettings } from '@mui/icons-material';
import RoleInviteGrid from './components/RoleInviteGrid';
import PendingResidentialLinks from './components/PendingResidentialLinks';

const inviteApi = new CondominiumInviteApi(ApiConfiguration);

const roleOptions: { label: string; type: ETipoUsuario; description: string }[] = [
    { label: 'Síndico', type: ETipoUsuario.Sindico, description: 'Responsável pela gestão do condomínio.' },
    { label: 'Morador', type: ETipoUsuario.Morador, description: 'Acesso padrão para residentes.' },
    { label: 'Funcionário', type: ETipoUsuario.Porteiro, description: 'Equipe operacional / apoio.' },
];

const CondominiumSettingsPage = () => {
    const { selectedCondominium, isAdminSelected } = useInstanceStore();
    const showAlert = useAlertStore(s => s.showAlert);
    const theme = useTheme();

    const [loadingInvite, setLoadingInvite] = useState<ETipoUsuario | null>(null);

    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
    const [inviteData, setInviteData] = useState<InviteData | null>(null);

    const condominiumName = useMemo(() => selectedCondominium?.name ?? null, [selectedCondominium]);

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Box p={3} sx={{ width: isMobile ? 'auto' : '60%', margin: '0 auto' }}>
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
                <RoleInviteGrid
                    roles={roleOptions}
                    loadingRole={loadingInvite}
                    onGenerate={generateInvite}
                />
            )}
            <MembersList />
            <InviteDialog
                open={inviteDialogOpen}
                onClose={() => setInviteDialogOpen(false)}
                invite={inviteData}
                condominiumName={condominiumName}
            />

            <Divider sx={{ my: 3 }} />
            <PendingResidentialLinks />
        </Box>
    );
};

export default CondominiumSettingsPage;
