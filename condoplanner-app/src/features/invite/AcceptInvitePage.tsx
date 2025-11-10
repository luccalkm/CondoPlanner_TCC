import { useEffect, useState } from 'react';
import { CircularProgress, Typography, Button, Paper, Box } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CondominiumInviteApi, type AcceptInviteRequest, type AcceptInviteResponse } from '../../apiClient';
import { ApiConfiguration } from '../../apiClient/apiConfig';
import { useAuthStore } from '../../stores/auth.store';
import { useCondominiumStore } from '../../stores/condominium.store';
import { useAlertStore } from '../../stores/alert.store';
import { useInviteStore } from '../../stores/invite.store';

const inviteApi = new CondominiumInviteApi(ApiConfiguration);

const AcceptInvitePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthStore();
    const { fetchCondominiums } = useCondominiumStore();
    const showAlert = useAlertStore(s => s.showAlert);
    const { setPendingInviteToken, clearPendingInviteToken } = useInviteStore();
    const [processing, setProcessing] = useState(true);
    const [statusMsg, setStatusMsg] = useState('Processando convite...');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setProcessing(false);
            setStatusMsg('Token ausente.');
            showAlert('Link de convite inválido.', 'error');
            return;
        }

        if (!isAuthenticated) {
            setPendingInviteToken(token);
            showAlert('Faça login para concluir o convite.', 'info');
            navigate('/login');
            return;
        }

        (async () => {
            try {
                const req: AcceptInviteRequest = { token };
                const res: AcceptInviteResponse = await inviteApi.apiCondominiumAcceptInvitePost({
                    acceptInviteRequest: req
                });

                if (!res.success) {
                    setProcessing(false);
                    setStatusMsg(res.message || 'Convite não pôde ser aceito.');
                    showAlert(res.message || 'Falha ao aceitar convite.', 'error');
                    return;
                }

                showAlert('Convite aceito! Bem-vindo.', 'success');
                clearPendingInviteToken();
                await fetchCondominiums(user?.id);
                setProcessing(false);
                setStatusMsg('Condomínio associado com sucesso.');
                setTimeout(() => navigate('/condominios'), 1500);
            } catch (e: unknown) {
                console.error(e);
                const errorMessage = e instanceof Error ? e.message : String(e);
                setProcessing(false);
                setStatusMsg(errorMessage || 'Erro ao comunicar com servidor.');
                showAlert('Erro ao aceitar convite.', 'error');
            }
        })();
    }, [isAuthenticated, searchParams, navigate, showAlert, setPendingInviteToken, clearPendingInviteToken, fetchCondominiums, user]);

    return (
        <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#fefefe">

            <Paper sx={{ p: 3, textAlign: "center", mx: "auto", bgcolor: "#fff", boxShadow: 3, minWidth: 300 }}>
                <Typography variant="h5" fontWeight={700} mb={2}>Aceitando Convite</Typography>
                {processing ? (
                    <>
                        <CircularProgress sx={{ mb: 2 }} />
                        <Typography variant="body2">{statusMsg}</Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="body1" mb={2}>{statusMsg}</Typography>
                        <Button variant="contained" onClick={() => navigate('/condominios')}>
                            Ir para Meus Condomínios
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default AcceptInvitePage;