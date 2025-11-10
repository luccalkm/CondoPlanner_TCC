import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    TablePagination,
    IconButton,
    Typography,
    Tooltip,
    TextField,
    CircularProgress,
    Stack,
    Switch,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CondominiumApi, type UpsertUserCondominiumInput, type UserCondominiumDto, type UserDto } from '../../../../apiClient';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';
import { useInstanceStore } from '../../../../stores/instance.store';
import { useCondominiumStore } from '../../../../stores/condominium.store';
import { useAlertStore } from '../../../../stores/alert.store';
import EditMemberDialog from './EditMemberDialog';

const condominiumApi = new CondominiumApi(ApiConfiguration);

const MembersList: React.FC = () => {
    const { selectedCondominium, isAdminSelected, isSyndicSelected } = useInstanceStore();
    const { userCondominiumRelations, condominiumRelations, fetchCondominiumRelations } = useCondominiumStore();
    const showAlert = useAlertStore(s => s.showAlert);

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserDto[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [query, setQuery] = useState('');
    const [editOpen, setEditOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<{ user: UserDto; relation?: UserCondominiumDto } | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const isAdmin = isAdminSelected();
    const isSyndic = isSyndicSelected();

    useEffect(() => {
        if (!selectedCondominium) return;
        let mounted = true;
        setLoading(true);
        (async () => {
            try {
                const list = await condominiumApi.apiCondominiumCondominioIdUsersGet({ condominioId: selectedCondominium.id! });
                if (!mounted) return;
                setUsers(list || []);
            } catch (e) {
                console.error(e);
                showAlert('Falha ao carregar membros.', 'error');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [selectedCondominium, refreshKey, showAlert]);

    useEffect(() => {
        if (selectedCondominium && (isAdmin || isSyndic)) {
            fetchCondominiumRelations(selectedCondominium.id!);
        }
    }, [selectedCondominium, isAdmin, isSyndic, fetchCondominiumRelations, refreshKey]);

    const relationsByUserId = useMemo(() => {
        const canSeeAll = (isAdmin || isSyndic) && condominiumRelations.length > 0;
        const source = canSeeAll ? condominiumRelations : userCondominiumRelations;

        const map = new Map<number, UserCondominiumDto>();
        source.forEach(r => {
            if (r.userId != null && r.condominiumId === selectedCondominium?.id) {
                map.set(r.userId, r);
            }
        });
        return map;
    }, [userCondominiumRelations, condominiumRelations, selectedCondominium, isAdmin, isSyndic]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return users;
        return users.filter(u => {
            const name = u.name ?? '';
            const email = u.email ?? '';
            const cpf = u.cpf ?? '';
            return name.toLowerCase().includes(q) || email.toLowerCase().includes(q) || cpf.toLowerCase().includes(q);
        });
    }, [users, query]);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    function openEdit(user: UserDto) {
        const relation = relationsByUserId.get(user.id!);
        setSelectedMember({ user, relation });
        setEditOpen(true);
    }

    async function toggleActive(user: UserDto, relation?: UserCondominiumDto) {
        if (!selectedCondominium || !user.id) return;
        const currentActive = relation?.active;
        const input: UpsertUserCondominiumInput = {
            condominiumId: selectedCondominium.id,
            userId: user.id,
            userType: relation?.userType ?? undefined,
            active: !currentActive,
        };
        try {
            await condominiumApi.apiCondominiumUpsertUserCondominiumPost({ upsertUserCondominiumInput: input });
            showAlert(!currentActive ? 'Usuário ativado.' : 'Usuário inativado.', 'success');
            setRefreshKey(k => k + 1);
        } catch (e) {
            console.error(e);
            showAlert('Falha ao atualizar status.', 'error');
        }
    }

    const rows = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ p: 2 }} variant="outlined">
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
                <Typography variant="h6" fontWeight={600}>Membros</Typography>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Pesquisar usuário"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <Tooltip title="Atualizar">
                                    <IconButton size="small" onClick={() => setRefreshKey(k => k + 1)}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                    }}
                />
            </Stack>

            <Box>
                <TableContainer sx={{ minHeight: 120, overflowX: 'auto' }}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Ativo</TableCell>
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(u => {
                                    const rel = relationsByUserId.get(u.id!) ?? undefined;
                                    const active = rel?.active;
                                    const canToggle = (isAdmin || isSyndic) && !!rel;
                                    return (
                                        <TableRow key={u.id}>
                                            <TableCell>
                                                <Typography fontWeight={600}>{u.name}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Typography variant="body2">
                                                        {active === undefined ? '-' : (active ? 'Sim' : 'Não')}
                                                    </Typography>
                                                    <Switch
                                                        size="small"
                                                        checked={!!active}
                                                        disabled={!canToggle}
                                                        onChange={() => canToggle && toggleActive(u, rel)}
                                                    />
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                    <Tooltip title="Editar papel / vínculo">
                                                        <IconButton size="small" onClick={() => openEdit(u)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {rows.length === 0 && !loading && (
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <Box p={2} textAlign="center">
                                                <Typography variant="body2" color="text.secondary">Nenhum membro encontrado.</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>

                <TablePagination
                    component="div"
                    count={filtered.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 8, 12, 20]}
                />
            </Box>

            <EditMemberDialog
                open={editOpen}
                onClose={() => setEditOpen(false)}
                member={selectedMember}
                onSaved={() => { setEditOpen(false); setRefreshKey(k => k + 1); }}
            />
        </Paper>
    );
};

export default MembersList;