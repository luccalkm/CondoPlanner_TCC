import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Stack,
    Box,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useAlertStore } from '../../../../stores/alert.store';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';
import { CondominiumApi, ETipoUsuario, type UpsertUserCondominiumInput, type UserCondominiumDto, type UserDto } from '../../../../apiClient';
import { useInstanceStore } from '../../../../stores/instance.store';

const condominiumApi = new CondominiumApi(ApiConfiguration);

interface Props {
    open: boolean;
    onClose: () => void;
    member: { user: UserDto; relation?: UserCondominiumDto } | null;
    onSaved?: () => void;
}

const roleOptions = [
    { label: 'Administrador', value: ETipoUsuario.Administrador },
    { label: 'Síndico', value: ETipoUsuario.Sindico },
    { label: 'Morador', value: ETipoUsuario.Morador },
    { label: 'Funcionário', value: ETipoUsuario.Porteiro },
];

const EditMemberDialog: React.FC<Props> = ({ open, onClose, member, onSaved }) => {
    const { selectedCondominium } = useInstanceStore();

    const showAlert = useAlertStore(s => s.showAlert);
    const [role, setRole] = useState<ETipoUsuario | ''>('');
    const [active, setActive] = useState<boolean>(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (member) {
            setRole((member.relation?.userType) as ETipoUsuario | '');
            setActive(member.relation?.active ?? true);
        } else {
            setRole('');
            setActive(true);
        }
    }, [member, selectedCondominium]);

    async function save() {
        const condoId = member?.relation?.condominiumId ?? selectedCondominium?.id;
        if (!member || !member.user || !member.user.id) {
            showAlert('Dados do usuário não disponíveis.', 'error');
            return;
        }
        if (!condoId) {
            showAlert('Dados do condomínio não disponíveis.', 'error');
            return;
        }

        setSaving(true);
        try {
            const input: UpsertUserCondominiumInput = {
                condominiumId: condoId,
                userId: member.user.id,
                userType: role as ETipoUsuario,
                active,
            };
            await condominiumApi.apiCondominiumUpsertUserCondominiumPost({ upsertUserCondominiumInput: input });
            showAlert('Alterações salvas.', 'success');
            onSaved?.();
        } catch (e) {
            console.error(e);
            showAlert('Falha ao salvar alterações.', 'error');
        } finally {
            setSaving(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
                <Typography variant="h6" fontWeight={700}>Editar membro</Typography>
                <IconButton onClick={onClose}><Close /></IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                {!member ? (
                    <Typography variant="body2" color="text.secondary">Nenhum membro selecionado.</Typography>
                ) : (
                    <Stack spacing={2}>

                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>{member.user.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{member.user.email}</Typography>
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'} mb={2}>
                            <Typography variant="body2" color="text.secondary">CPF: {member.user.cpf ?? '—'}</Typography>
                            <Typography variant="body2" color="text.secondary">Telefone: {member.user.phone ?? '—'}</Typography>
                        </Box>

                        <FormControl fullWidth size="small">
                            <InputLabel id="role-label">Papel</InputLabel>
                            <Select
                                labelId="role-label"
                                label="Papel"
                                value={role}
                                onChange={(e) => setRole(e.target.value as ETipoUsuario)}
                            >
                                {roleOptions.map(o => (
                                    <MenuItem key={String(o.value)} value={o.value}>{o.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="outlined" color='error' onClick={onClose}>Cancelar</Button>
                            <Button variant="contained" onClick={save} disabled={saving || role === ''}>
                                {saving ? <CircularProgress size={18} /> : 'Salvar'}
                            </Button>
                        </Stack>
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditMemberDialog;