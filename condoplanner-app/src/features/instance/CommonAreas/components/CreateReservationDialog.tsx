import { useMemo, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import useReservationStore from '../../../../stores/reservation.store';
import type { CreateReservationInput } from '../../../../apiClient';

interface CreateReservationDialogProps {
    open: boolean;
    onClose: () => void;
    areaId: number;
    defaultDate?: Date | null;
    capacity?: number;
}

export default function CreateReservationDialog({ open, onClose, areaId, defaultDate, capacity }: CreateReservationDialogProps) {
    const today = useMemo(() => defaultDate ?? new Date(), [defaultDate]);
        const [startDate, setStartDate] = useState<string>(today.toISOString().slice(0, 10));
        const [startTime, setStartTime] = useState('12:00');
        const [endDate, setEndDate] = useState<string>(today.toISOString().slice(0, 10));
        const [endTime, setEndTime] = useState('13:00');
    const [guests, setGuests] = useState<number>(Math.min(4, capacity ?? 999));
    const [purpose, setPurpose] = useState('');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const create = useReservationStore(s => s.create);
        const invalid = useMemo(() => {
            const s = new Date(`${startDate}T${startTime}:00Z`).getTime();
            const e = new Date(`${endDate}T${endTime}:00Z`).getTime();
            return e <= s;
        }, [startDate, startTime, endDate, endTime]);

    async function handleSubmit() {
        setSubmitting(true);
        try {
            const input: CreateReservationInput = {
                areaId,
                    startDate: new Date(`${startDate}T${startTime}:00Z`),
                    endDate: new Date(`${endDate}T${endTime}:00Z`),
                guests,
                purpose,
                notes
            };
            await create(input);
            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nova Reserva</DialogTitle>
            <DialogContent>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2} mt={0.5}>
                        <TextField label="Data Início" type="date" fullWidth value={startDate} onChange={e => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} />
                        <TextField label="Data Fim" type="date" fullWidth value={endDate} onChange={e => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} />
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                            <TextField label="Hora Início" type="time" fullWidth value={startTime} onChange={e => setStartTime(e.target.value)} InputLabelProps={{ shrink: true }} />
                            <TextField label="Hora Fim" type="time" fullWidth value={endTime} onChange={e => setEndTime(e.target.value)} InputLabelProps={{ shrink: true }} error={invalid} helperText={invalid ? 'Fim deve ser maior que início' : 'Período'} />
                    </Box>
                    <TextField label="Convidados" type="number" fullWidth value={guests} onChange={e => setGuests(Number(e.target.value))} inputProps={{ min: 0, max: capacity ?? undefined }} />
                    <TextField label="Finalidade" fullWidth value={purpose} onChange={e => setPurpose(e.target.value)} />
                    <TextField label="Observações" fullWidth multiline minRows={2} value={notes} onChange={e => setNotes(e.target.value)} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} disabled={submitting || invalid}>Reservar</Button>
            </DialogActions>
        </Dialog>
    );
}
