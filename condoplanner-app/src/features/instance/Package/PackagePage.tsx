import { useEffect, useMemo, useState } from 'react';
import {
    Avatar, Box, Button, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText,
    Menu, MenuItem, Paper, Skeleton, Stack, Tooltip, Typography, useMediaQuery, useTheme
} from '@mui/material';
import { Add, Edit, LocalShipping, MoreVert } from '@mui/icons-material';
import { useInstanceStore } from '../../../stores/instance.store';
import { useCondominiumStore } from '../../../stores/condominium.store';
import { useAuthStore } from '../../../stores/auth.store';
import { useAlertStore } from '../../../stores/alert.store';
import { ETipoUsuario, EStatusEncomenda, type PackageDto, PackageApi, ResidentialLinksApi, type CreatePackageInput, type UpdatePackageInput } from '../../../apiClient';
import { ApiConfiguration } from '../../../apiClient/apiConfig';
import PackageDialog, { type PackageForm } from './components/PackageDialog';

const api = new PackageApi(ApiConfiguration);
const linkApi = new ResidentialLinksApi(ApiConfiguration);

const PackagePage = () => {
    const { selectedCondominiumId, currentResidentialLink, setCurrentResidentialLink, isAdminSelected, isSyndicSelected } = useInstanceStore();
    const { userCondominiumRelations } = useCondominiumStore();
    const { user } = useAuthStore();
    const { showAlert } = useAlertStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [loadingPackages, setLoadingPackages] = useState(false);
    const [packages, setPackages] = useState<PackageDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    const isDoormanSelected = useMemo(() => {
        if (!selectedCondominiumId || !user) return false;
        return userCondominiumRelations.some(r =>
            r.condominiumId === selectedCondominiumId &&
            r.userId === user.id &&
            r.userType === ETipoUsuario.Porteiro
        );
    }, [selectedCondominiumId, user, userCondominiumRelations]);

    const canManage = useMemo(() => isAdminSelected() || isSyndicSelected() || isDoormanSelected,
        [isAdminSelected, isSyndicSelected, isDoormanSelected]);

    const fetchPackages = async () => {
        setLoadingPackages(true);
        setError(null);
        try {
            if (!selectedCondominiumId) {
                setPackages([]);
                return;
            }

            if (canManage) {
                const data = await api.apiPackageCondominiumCondominiumIdGet({ condominiumId: selectedCondominiumId });
                setPackages(data);
            } else {
                let linkId = currentResidentialLink?.id;
                if (!linkId) {
                    try {
                        const link = await linkApi.apiResidentialLinksMyCondominiumIdGet({ condominiumId: selectedCondominiumId });
                        setCurrentResidentialLink(link);
                        linkId = link.id ?? undefined;
                    } catch {
                        linkId = undefined;
                    }
                }
                if (linkId) {
                    const data = await api.apiPackageLinkResidentialLinkIdGet({ residentialLinkId: linkId });
                    setPackages(data);
                } else {
                    setPackages([]);
                }
            }
        } catch (e) {
            console.error('Error fetching packages:', e);
            setError('Erro ao buscar encomendas.');
            showAlert('Erro ao buscar encomendas.', 'error');
        } finally {
            setLoadingPackages(false);
        }
    };

    useEffect(() => {
        fetchPackages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCondominiumId, canManage]);

    // Create/Edit dialog state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuForId, setMenuForId] = useState<number | null>(null);
    const openMenu = Boolean(anchorEl);
    const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>, id: number) => { setAnchorEl(e.currentTarget); setMenuForId(id); };
    const handleCloseMenu = () => { setAnchorEl(null); setMenuForId(null); };

    const [openEdit, setOpenEdit] = useState(false);
    const [editing, setEditing] = useState<PackageDto | null>(null);
    const [createMode, setCreateMode] = useState(false);
    const [residentOptions, setResidentOptions] = useState<{ id: number; name: string; email?: string; linkId: number }[]>([]);
    const [loadingResidents, setLoadingResidents] = useState(false);

    const handleOpenCreate = async () => {
        setCreateMode(true);
        setEditing(null);
        if (selectedCondominiumId) {
            setLoadingResidents(true);
            try {
                const links = await linkApi.apiResidentialLinksActiveCondominiumIdGet({
                    condominiumId: selectedCondominiumId
                });
                const opts = (links ?? [])
                    .filter(l => l?.id && l?.usuarioId)
                    .map(l => {
                        const labelParts: string[] = [];
                        if (l?.userName) labelParts.push(l.userName);
                        const apt = l?.apartmentNumber ?? undefined;
                        const bloco = l?.blockName ?? undefined;
                        if (bloco || apt) {
                            labelParts.push(`— ${[bloco, apt].filter(Boolean).join(' / ')}`);
                        }
                        return {
                            id: l!.usuarioId!,
                            name: labelParts.join(' '),
                            linkId: l!.id!,
                        };
                    });
                setResidentOptions(opts);
            } catch {
                setResidentOptions([]);
            } finally {
                setLoadingResidents(false);
            }
        } else {
            setResidentOptions([]);
        }
        setOpenEdit(true);
    };

    const handleOpenEdit = (pkg: PackageDto) => {
        setCreateMode(false);
        setEditing(pkg);
        setOpenEdit(true);
        handleCloseMenu();
    };

    const handleSubmit = async (form: PackageForm) => {
        if (!selectedCondominiumId) return;

        if (createMode) {
            if (!form.userId) {
                showAlert('Selecione o morador para a encomenda.', 'warning');
                return;
            }
            const selected = residentOptions.find(o => o.id === form.userId);
            if (!selected?.linkId) {
                showAlert('Não foi possível identificar o vínculo residencial do morador selecionado.', 'error');
                return;
            }
            const input: CreatePackageInput = {
                carrier: form.carrier?.trim() || undefined,
                notes: form.notes?.trim() || undefined,
                condominiumId: selectedCondominiumId,
                residentialLinkId: selected.linkId,
            };
            await api.apiPackagePost({ createPackageInput: input });
            showAlert('Encomenda cadastrada com sucesso.', 'success');
        } else if (editing?.id) {
            const input: UpdatePackageInput = {
                carrier: form.carrier?.trim() || undefined,
                notes: form.notes?.trim() || undefined,
            };
            await api.apiPackageIdPut({ id: editing.id, updatePackageInput: input });
            showAlert('Encomenda atualizada com sucesso.', 'success');
        }

        setOpenEdit(false);
        await fetchPackages();
    };

    return (
        <Box p={3} sx={{ width: isMobile ? 'auto' : '70%', margin: '0 auto' }}>
            <Paper variant='outlined' sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" fontWeight={700}>Encomendas</Typography>
                {canManage && (
                    isMobile ? (
                        <Tooltip title="Cadastrar encomenda">
                            <IconButton color='primary' onClick={handleOpenCreate}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Button startIcon={<Add />} variant='contained' onClick={handleOpenCreate}>
                            Nova encomenda
                        </Button>
                    )
                )}
            </Paper>

            <Paper variant='outlined' sx={{ p: 0 }}>
                {loadingPackages && (
                    <Box p={2}>
                        {[...Array(5)].map((_, i) => (
                            <Stack key={i} direction="row" spacing={2} alignItems="center" sx={{ py: 1.25 }}>
                                <Skeleton variant="circular" width={40} height={40} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton variant="text" width="45%" />
                                    <Skeleton variant="text" width="70%" />
                                </Box>
                                <Skeleton variant="rectangular" width={28} height={28} />
                            </Stack>
                        ))}
                    </Box>
                )}

                {!loadingPackages && error && (
                    <Box p={3} textAlign="center">
                        <Typography color="error">{error}</Typography>
                    </Box>
                )}

                {!loadingPackages && !error && packages.length === 0 && (
                    <Box p={3} textAlign="center">
                        <Typography color="text.secondary">Nenhuma encomenda encontrada.</Typography>
                    </Box>
                )}

                {!loadingPackages && !error && packages.length > 0 && (
                    <List>
                        {packages
                            .sort((a, b) => new Date(b.receivedAt ?? 0).getTime() - new Date(a.receivedAt ?? 0).getTime())
                            .map((p) => {
                                const status = p.status ?? EStatusEncomenda.Recebido;
                                const statusColor: 'default' | 'success' | 'warning' | 'info' =
                                    status === EStatusEncomenda.Retirado ? 'success' :
                                    status === EStatusEncomenda.AguardandoRetirada ? 'warning' :
                                    status === EStatusEncomenda.Notificado ? 'info' : 'default';
                                return (
                                    <ListItem
                                        key={p.id}
                                        secondaryAction={canManage ? (
                                            <IconButton edge="end" onClick={(e) => handleOpenMenu(e, p.id!)}>
                                                <MoreVert />
                                            </IconButton>
                                        ) : undefined}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LocalShipping />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        {p.carrier || 'Transportadora N/D'}
                                                    </Typography>
                                                    <Chip size="small" label={status.replace('_', ' ')} color={statusColor} />
                                                </Box>
                                            }
                                            secondary={
                                                <>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Recebido em: {p.receivedAt ? new Date(p.receivedAt).toLocaleString() : 'N/D'}
                                                        {p.pickedUpAt && ` • Retirado em: ${new Date(p.pickedUpAt).toLocaleString()}`}
                                                    </Typography>
                                                    {p.notes && (
                                                        <Typography variant="body2" color="text.secondary">{p.notes}</Typography>
                                                    )}
                                                </>
                                            }
                                        />
                                    </ListItem>
                                );
                            })}
                    </List>
                )}
            </Paper>

            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
                <MenuItem onClick={() => {
                    const pkg = packages.find(x => x.id === menuForId);
                    if (pkg) handleOpenEdit(pkg);
                }}>
                    <Edit fontSize="small" style={{ marginRight: 8 }} /> Editar
                </MenuItem>
            </Menu>

            <PackageDialog
                open={openEdit}
                createMode={createMode}
                canManage={canManage}
                initialForm={{
                    carrier: editing?.carrier ?? '',
                    notes: editing?.notes ?? '',
                    userId: undefined,
                }}
                users={residentOptions}
                usersLoading={loadingResidents}
                onClose={() => setOpenEdit(false)}
                onSubmit={handleSubmit}
            />
        </Box>
    );
};

export default PackagePage;