import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlertStore } from '../../../../stores/alert.store';
import { ReservationApi, type ReservationDto } from '../../../../apiClient';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';
import { useInstanceStore } from '../../../../stores/instance.store';

const reservationApi = new ReservationApi(ApiConfiguration);

const PendingReservations = () => {
    const [pendingReservations, setPendingReservations] = useState<ReservationDto[] | null>(null);
    const [loading, setLoading] = useState(false);
    const showAlert = useAlertStore(s => s.showAlert);
    const { selectedCondominiumId } = useInstanceStore();

    useEffect(() => {
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

        fetchPendingReservations();
    }, [showAlert, selectedCondominiumId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        );
    }

    if (!pendingReservations || pendingReservations.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary" textAlign="center">
                Nenhuma reserva pendente encontrada.
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
                Reservas Pendentes
            </Typography>
            <List>
                {pendingReservations.map(reservation => (
                    <ListItem key={reservation.id} divider>
                        <ListItemText
                            primary={`Reserva para ${reservation.area?.name}`}
                            secondary={`Data: ${reservation.startTime} - Até: ${reservation.endTime}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default PendingReservations;
