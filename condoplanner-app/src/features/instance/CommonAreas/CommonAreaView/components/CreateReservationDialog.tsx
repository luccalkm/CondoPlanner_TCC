import { useMemo, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import useReservationStore from '../../../../../stores/reservation.store';
import type { CreateReservationInput } from '../../../../../apiClient';

interface CreateReservationDialogProps {
    open: boolean;
    onClose: () => void;
    areaId: number;
    defaultDate?: Date | null;
    capacity?: number;
}

export default function CreateReservationDialog({ open, onClose, areaId, defaultDate, capacity }: CreateReservationDialogProps) {
    const today = useMemo(() => defaultDate ?? new Date(), [defaultDate]);
    const [date, setDate] = useState<string>(today.toISOString().slice(0, 10));
    const [start, setStart] = useState('12:00');
    const [end, setEnd] = useState('13:00');
    const [guests, setGuests] = useState<number>(Math.min(4, capacity ?? 999));
    const [purpose, setPurpose] = useState('');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const create = useReservationStore(s => s.create);
    // For now, only allow same-day reservations: end must be greater than start
    const invalid = useMemo(() => end <= start, [start, end]);

    async function handleSubmit() {
        setSubmitting(true);
        try {
            const input: CreateReservationInput = {
                areaId,
                date: new Date(date + 'T00:00:00Z'),
                startTime: start + ':00',
                endTime: end + ':00',
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
                    <TextField label="Data" type="date" fullWidth value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                        <TextField label="Início" type="time" fullWidth value={start} onChange={e => setStart(e.target.value)} InputLabelProps={{ shrink: true }} />
                        <TextField label="Término" type="time" fullWidth value={end} onChange={e => setEnd(e.target.value)} InputLabelProps={{ shrink: true }} error={invalid} helperText={invalid ? 'Término deve ser maior que o início (mesmo dia)' : 'Mesmo dia'} />
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
