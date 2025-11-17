import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Paper, Button, Stack, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlertStore } from '../../../../stores/alert.store';
import { ReservationApi, type ReservationDto } from '../../../../apiClient';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';
import { useInstanceStore } from '../../../../stores/instance.store';
import { useAuthStore } from "../../../../stores/auth.store";

const reservationApi = new ReservationApi(ApiConfiguration);

const PendingReservations = () => {
    const [pendingReservations, setPendingReservations] = useState<ReservationDto[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
    const showAlert = useAlertStore(s => s.showAlert);
    const { selectedCondominiumId } = useInstanceStore();
    const { user } = useAuthStore();

    const fetchPendingReservations = async () => {
        setLoading(true);
        try {
            const reservations = await reservationApi.apiReservationPendingCondominiumIdGet({ condominiumId: selectedCondominiumId! });
            setPendingReservations(reservations);
        } catch (error) {
            console.error(error);
            showAlert('Erro ao carregar reservas pendentes.', 'error');
        } finally {
            setLoading(false);
        }
    };


    const handleApprove = async (reservationId: number, isApprove: boolean) => {
        setActionLoadingId(reservationId);
        try {
            await reservationApi.apiReservationApproveOrRejectPost({
                approveOrRejectReservationInput: {
                    reservationId,
                    shouldApprove: isApprove,
                    userId: user?.id
                }
            });
            showAlert(`Reserva ${isApprove ? 'aprovada' : 'recusada'}.`, 'success');
        } catch {
            showAlert('Erro ao efetuar ação de aprovar ou reprovar.', 'error');
        } finally {
            setActionLoadingId(null);
            fetchPendingReservations();
        }
    };

    useEffect(() => {
        fetchPendingReservations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAlert, selectedCondominiumId]);

    const totalCount = pendingReservations?.length ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const paged = pendingReservations
        ? pendingReservations.slice((page - 1) * pageSize, page * pageSize)
        : [];

    if (loading) {
        return (
            <Paper elevation={3} sx={{ padding: 2 }} variant="outlined">

                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            </Paper>

        );
    }

    if (!pendingReservations || pendingReservations.length === 0) {
        return (
            <Paper elevation={3} sx={{ padding: 2 }} variant="outlined">

                <Typography variant="body1" color="text.secondary" textAlign="center">
                    Nenhuma reserva pendente encontrada.
                </Typography>
            </Paper>

        );
    }

    return (
        <Paper elevation={3} sx={{ padding: 2 }} variant="outlined">
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={700}>Reservas Pendentes</Typography>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, p) => setPage(p)}
                    size="small"
                    color="primary"
                />
            </Stack>
            <List>
                {paged.map(reservation => (
                    <ListItem
                        key={reservation.id}
                        divider
                        secondaryAction={
                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    disabled={actionLoadingId === reservation.id}
                                    onClick={() => handleApprove(reservation.id!, true)}
                                >
                                    Aprovar
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    disabled={actionLoadingId === reservation.id}
                                    onClick={() => handleApprove(reservation.id!, false)}
                                >
                                    Recusar
                                </Button>
                            </Stack>
                        }
                    >
                        <ListItemText
                            primary={`Reserva para ${reservation.commonArea?.name ?? 'Área'}`}
                            secondary={`Início: ${reservation.startTime} • Fim: ${reservation.endTime}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Box mt={2} textAlign="center">
                <Typography variant="caption">
                    Exibindo {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalCount)} de {totalCount}
                </Typography>
            </Box>
        </Paper>
    );
};

export default PendingReservations;
