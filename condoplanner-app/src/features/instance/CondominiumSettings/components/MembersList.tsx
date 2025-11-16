import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    Box,
    Paper,
    IconButton,
    Typography,
    Tooltip,
    TextField,
    Stack,
    Switch,
} from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
    CondominiumApi,
    type UpsertUserCondominiumInput,
    type UserCondominiumDto,
    type UserDto,
} from '../../../../apiClient';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';
import { useInstanceStore } from '../../../../stores/instance.store';
import { useCondominiumStore } from '../../../../stores/condominium.store';
import { useAlertStore } from '../../../../stores/alert.store';
import EditMemberDialog from './EditMemberDialog';
import CenteredDataGrid from '../../../../components/CenteredDataGrid';

const condominiumApi = new CondominiumApi(ApiConfiguration);

const MembersList: React.FC = () => {
    const { selectedCondominium, isAdminSelected, isSyndicSelected } = useInstanceStore();
    const { userCondominiumRelations, condominiumRelations, fetchCondominiumRelations } =
        useCondominiumStore();
    const showAlert = useAlertStore((s) => s.showAlert);

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserDto[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [query, setQuery] = useState('');
    const [editOpen, setEditOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<{
        user: UserDto;
        relation?: UserCondominiumDto;
    } | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const isAdmin = isAdminSelected();
    const isSyndic = isSyndicSelected();

    useEffect(() => {
        if (!selectedCondominium) return;
        let mounted = true;
        setLoading(true);
        (async () => {
            try {
                const list = await condominiumApi.apiCondominiumCondominioIdUsersGet({
                    condominioId: selectedCondominium.id!,
                });
                if (!mounted) return;
                setUsers(list || []);
            } catch (e) {
                console.error(e);
                showAlert('Falha ao carregar membros.', 'error');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
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
        source.forEach((r) => {
            if (r.userId != null && r.condominiumId === selectedCondominium?.id) {
                map.set(r.userId, r);
            }
        });
        return map;
    }, [userCondominiumRelations, condominiumRelations, selectedCondominium, isAdmin, isSyndic]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return users;
        return users.filter((u) => {
            const name = u.name ?? '';
            const email = u.email ?? '';
            const cpf = u.cpf ?? '';
            return (
                name.toLowerCase().includes(q) ||
                email.toLowerCase().includes(q) ||
                cpf.toLowerCase().includes(q)
            );
        });
    }, [users, query]);

    const openEdit = useCallback((user: UserDto) => {
        const relation = relationsByUserId.get(user.id!);
        setSelectedMember({ user, relation });
        setEditOpen(true);
    }, [relationsByUserId]);

    const toggleActive = useCallback(async (user: UserDto, relation?: UserCondominiumDto) => {
        if (!selectedCondominium || !user.id) return;
        const currentActive = relation?.active;
        const input: UpsertUserCondominiumInput = {
            condominiumId: selectedCondominium.id,
            userId: user.id,
            userType: relation?.userType ?? undefined,
            active: !currentActive,
        };
        try {
            await condominiumApi.apiCondominiumUpsertUserCondominiumPost({
                upsertUserCondominiumInput: input,
            });
            showAlert(!currentActive ? 'Usuário ativado.' : 'Usuário inativado.', 'success');
            setRefreshKey((k) => k + 1);
        } catch (e) {
            console.error(e);
            showAlert('Falha ao atualizar status.', 'error');
        }
    }, [selectedCondominium, showAlert]);

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Nome',
                flex: 1,
                renderCell: (params) => params.row?.name ?? '-',
            },
            {
                field: 'active',
                headerName: 'Ativo',
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: (params) => {
                    const u: UserDto = params.row;
                    const rel = u?.id ? relationsByUserId.get(u.id) : undefined;
                    const active = rel?.active;
                    const canToggle = (isAdmin || isSyndic) && !!rel;
                    return (
                        <Stack
                            direction="row"
                            justifyContent="center"
                            spacing={1}
                            sx={{ width: '100%' }}
                        >
                            <Typography variant="body2">
                                {active === undefined ? '-' : active ? 'Sim' : 'Não'}
                            </Typography>
                            <Switch
                                size="small"
                                checked={!!active}
                                disabled={!canToggle}
                                onChange={() => canToggle && toggleActive(u, rel)}
                            />
                        </Stack>
                    );
                },
            },
            {
                field: 'actions',
                headerName: 'Ações',
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: (params) => {
                    const u: UserDto = params.row;
                    return (
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            sx={{ width: '100%' }}
                        >
                            <Tooltip title="Editar papel / vínculo">
                                <IconButton size="small" onClick={() => openEdit(u)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    );
                },
            },
        ],
        [relationsByUserId, isAdmin, isSyndic, openEdit, toggleActive]
    );

    return (
        <Paper sx={{ p: 2 }} variant="outlined">
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                mb={2}
            >
                <Typography variant="h6" fontWeight={600}>
                    Membros
                </Typography>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Pesquisar usuário"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <Tooltip title="Atualizar">
                                    <IconButton size="small" onClick={() => setRefreshKey((k) => k + 1)}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                            ),
                        },
                    }}
                />
            </Stack>

            <Box>
                <CenteredDataGrid
                    rows={filtered}
                    columns={columns}
                    getRowId={(r) => r.id as number}
                    pagination
                    paginationModel={{ page, pageSize: rowsPerPage }}
                    onPaginationModelChange={(m) => { setPage(m.page); setRowsPerPage(m.pageSize); }}
                    pageSizeOptions={[5, 8, 12, 20]}
                    loading={loading}
                    disableRowSelectionOnClick
                />
            </Box>

            <EditMemberDialog
                open={editOpen}
                onClose={() => setEditOpen(false)}
                member={selectedMember}
                onSaved={() => {
                    setEditOpen(false);
                    setRefreshKey((k) => k + 1);
                }}
            />
        </Paper>
    );
};

export default MembersList;