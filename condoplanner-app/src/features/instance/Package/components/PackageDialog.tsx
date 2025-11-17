import { useEffect, useState } from 'react';
import { Autocomplete, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';

export type PackageForm = {
    carrier: string;
    notes: string;
    userId?: number;
};

export interface PackageDialogProps {
    open: boolean;
    title?: string;
    createMode?: boolean;
    canManage?: boolean;
    initialForm?: PackageForm;
    users?: { id: number; name: string; email?: string }[];
    usersLoading?: boolean;
    onClose: () => void;
    onSubmit: (form: PackageForm) => Promise<void> | void;
}

export function PackageDialog({
    open,
    title,
    createMode = false,
    canManage = false,
    initialForm,
    users = [],
    usersLoading = false,
    onClose,
    onSubmit
}: PackageDialogProps) {
    const [form, setForm] = useState<PackageForm>({ carrier: '', notes: '', userId: undefined });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (open) {
            setForm(initialForm ?? { carrier: '', notes: '', userId: undefined });
        }
    }, [open, initialForm]);

    const handleSubmit = async () => {
        setSaving(true);
        try {
            await onSubmit(form);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
            <DialogTitle>{title ?? (createMode ? 'Cadastrar encomenda' : 'Editar encomenda')}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    {createMode && canManage && (
                        <Autocomplete
                            options={users}
                            getOptionLabel={(o) => o?.name || ''}
                            loading={usersLoading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Morador"
                                    placeholder="Selecione o morador"
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {usersLoading ? <CircularProgress color="inherit" size={16} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        )
                                    }}
                                />
                            )}
                            value={users.find(u => u.id === form.userId) || null}
                            onChange={(_, v) => setForm(f => ({ ...f, userId: v?.id }))}
                            fullWidth
                        />
                    )}
                    <TextField
                        label="Transportadora"
                        value={form.carrier}
                        onChange={(e) => setForm(f => ({ ...f, carrier: e.target.value }))}
                        size="small"
                        fullWidth
                    />
                    <TextField
                        label="Observações"
                        value={form.notes}
                        onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                        size="small"
                        fullWidth
                        multiline
                        minRows={2}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={saving} variant="contained" startIcon={saving ? <CircularProgress size={16} /> : undefined}>
                    {createMode ? 'Cadastrar' : 'Salvar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PackageDialog;