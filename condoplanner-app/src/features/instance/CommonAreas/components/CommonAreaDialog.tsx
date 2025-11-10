import { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, TextField, FormControlLabel, Checkbox, Button
} from '@mui/material';
import type { CommonAreaDto, UpsertCommonAreaInput } from '../../../../apiClient';
import { toHHmm, toHHmmss } from '../utils';

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (input: UpsertCommonAreaInput) => Promise<void>;
    condominiumId: number;
    editing?: CommonAreaDto | null;
};

 

export function CommonAreaDialog({ open, onClose, onSave, condominiumId, editing }: Props) {
    const [form, setForm] = useState<UpsertCommonAreaInput>({
        id: null,
        condominiumId,
        name: '',
        description: '',
        type: '',
        capacity: 0,
        openingTime: '08:00:00',
        closingTime: '18:00:00',
        maxDuration: 60,
        available: true,
        requiresApproval: false,
        availableDays: 7,
        notes: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (editing) {
            setForm({
                id: editing.id ?? null,
                condominiumId,
                name: editing.name ?? '',
                description: editing.description ?? '',
                type: editing.type ?? '',
                capacity: editing.capacity ?? 0,
                openingTime: editing.openingTime ?? '08:00:00',
                closingTime: editing.closingTime ?? '18:00:00',
                maxDuration: editing.maxDuration ?? 60,
                available: editing.available ?? true,
                requiresApproval: editing.requiresApproval ?? false,
                availableDays: editing.availableDays ?? 7,
                notes: editing.notes ?? ''
            });
        } else {
            setForm((f: typeof form) => ({ ...f, id: null, condominiumId }));
        }
    }, [editing, condominiumId]);

    function update<K extends keyof UpsertCommonAreaInput>(key: K, value: UpsertCommonAreaInput[K]) {
        setForm((prev: UpsertCommonAreaInput) => ({ ...prev, [key]: value }));
    }

    async function handleSave() {
        setSaving(true);
        try {
            await onSave(form);
            onClose();
        } finally {
            setSaving(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{editing ? 'Editar Área Comum' : 'Nova Área Comum'}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6}}>
                        <TextField label="Nome" fullWidth value={form.name ?? ''} onChange={e => update('name', e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}}>
                        <TextField label="Tipo" fullWidth value={form.type ?? ''} onChange={e => update('type', e.target.value)} />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Descrição"
                            fullWidth
                            multiline
                            minRows={2}
                            value={form.description ?? ''}
                            onChange={e => update('description', e.target.value)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4}}>
                        <TextField
                            label="Capacidade"
                            type="number"
                            fullWidth
                            value={form.capacity ?? 0}
                            onChange={e => update('capacity', Number(e.target.value))}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4}}>
                        <TextField
                            label="Duração Máx. (min)"
                            type="number"
                            fullWidth
                            value={form.maxDuration ?? 60}
                            onChange={e => update('maxDuration', Number(e.target.value))}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4}}>
                        <TextField
                            label="Dias Disponíveis"
                            type="number"
                            fullWidth
                            value={form.availableDays ?? 7}
                            onChange={e => update('availableDays', Number(e.target.value))}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6}}>
                        <TextField
                            label="Hora Abertura"
                            type="time"
                            fullWidth
                            value={toHHmm(form.openingTime)}
                            onChange={e => update('openingTime', toHHmmss(e.target.value))}
                            inputProps={{ step: 60 }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}}>
                        <TextField
                            label="Hora Fechamento"
                            type="time"
                            fullWidth
                            value={toHHmm(form.closingTime)}
                            onChange={e => update('closingTime', toHHmmss(e.target.value))}
                            inputProps={{ step: 60 }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!form.available}
                                    onChange={e => update('available', e.target.checked)}
                                />
                            }
                            label="Disponível"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!form.requiresApproval}
                                    onChange={e => update('requiresApproval', e.target.checked)}
                                />
                            }
                            label="Requer Aprovação"
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Observações"
                            fullWidth
                            multiline
                            minRows={2}
                            value={form.notes ?? ''}
                            onChange={e => update('notes', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={saving}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" disabled={saving}>
                    {saving ? 'Salvando...' : 'Salvar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}