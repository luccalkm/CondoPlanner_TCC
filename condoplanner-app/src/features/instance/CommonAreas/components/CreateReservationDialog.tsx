import { useMemo, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import useReservationStore from '../../../../stores/reservation.store';
import type { CommonAreaDto, CreateReservationInput } from '../../../../apiClient';
import { useAlertStore } from "../../../../stores/alert.store";

interface CreateReservationDialogProps {
    open: boolean;
    onClose: () => void;
    area?: CommonAreaDto;
    defaultDate?: Date | null;
}

export default function CreateReservationDialog({ open, onClose, area, defaultDate }: CreateReservationDialogProps) {
    const { showAlert } = useAlertStore();
    const create = useReservationStore(s => s.create);

    const today = useMemo(() => defaultDate ?? new Date(), [defaultDate]);
    const [startDate, setStartDate] = useState<string>(today.toISOString().slice(0, 10));
    const [startTime, setStartTime] = useState('12:00');
    const [endDate, setEndDate] = useState<string>(today.toISOString().slice(0, 10));
    const [endTime, setEndTime] = useState('13:00');
    // const [guests, setGuests] = useState<number>(Math.min(4, area?.capacity ?? 999));

    const [purpose, setPurpose] = useState('');
    const [notes, setNotes] = useState('');

    const [submitting, setSubmitting] = useState(false);

    const isReservationTimeInvalid = useMemo(() => {
        const initialReservationTime = new Date(`${startDate}T${startTime}:00Z`).getTime();
        const endReservationTime = new Date(`${endDate}T${endTime}:00Z`).getTime();
        return endReservationTime <= initialReservationTime;
    }, [startDate, startTime, endDate, endTime]);

    async function handleSubmit() {
        setSubmitting(true);
        try {
            const input: CreateReservationInput = {
                areaId: area!.id,
                startDate: new Date(`${startDate}T${startTime}:00Z`),
                endDate: new Date(`${endDate}T${endTime}:00Z`),
                // guests,
                purpose,
                notes
            };
            await create(input);
            onClose();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao criar reserva';
            showAlert(errorMessage, 'error');
        } finally {
            setSubmitting(false);
        }
    }

    // const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Number(e.target.value);
    //     if (area && area.capacity && value > area.capacity) {
    //         setGuests(area.capacity);
    //         showAlert(`Número máximo de convidados é ${area.capacity}`, 'warning');
    //     } else {
    //         setGuests(value);
    //     }
    // };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nova Reserva</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={2} columnSpacing={1} sx={{ mt: 1 }}>

                    <Grid size={12}>
                        <TextField label="Finalidade" fullWidth value={purpose} onChange={e => setPurpose(e.target.value)} />
                    </Grid>
                    <Grid size={6}>
                        <TextField label="Data Início" type="date" fullWidth value={startDate} onChange={e => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid size={6}>
                        <TextField label="Data Fim" type="date" fullWidth value={endDate} onChange={e => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <TextField label="Hora Início" type="time" fullWidth value={startTime} onChange={e => setStartTime(e.target.value)} InputLabelProps={{ shrink: true }} />
                            </Grid>
                            <Grid size={6}>
                                <TextField label="Hora Fim" type="time" fullWidth value={endTime} onChange={e => setEndTime(e.target.value)} InputLabelProps={{ shrink: true }} error={isReservationTimeInvalid} helperText={isReservationTimeInvalid ? 'Fim deve ser maior que início' : 'Período'} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid size={3}>
                        <TextField label="Convidados" type="number" fullWidth value={guests} onChange={handleGuestsChange} inputProps={{ min: 0, max: area?.capacity ?? undefined }} />
                    </Grid> */}
                    <Grid size={12}>
                        <TextField label="Observações" fullWidth multiline value={notes} onChange={e => setNotes(e.target.value)} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error" disabled={submitting}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} disabled={submitting || isReservationTimeInvalid}>Reservar</Button>
            </DialogActions>
        </Dialog>
    );
}
