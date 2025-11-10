import { AccountBox, Email, Numbers, Visibility, VisibilityOff, Save, Logout } from "@mui/icons-material";
import { Divider, Grid, Paper, TextField, Typography, IconButton, Button, CircularProgress, useTheme, alpha } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import type { ChangePasswordInput, UserDto } from "../../apiClient";
import { UsersApi } from "../../apiClient";
import { ApiConfiguration } from "../../apiClient/apiConfig";
import { useAuthStore } from "../../stores/auth.store";
import { useAlertStore } from "../../stores/alert.store";

const usersApi = new UsersApi(ApiConfiguration);

export const SettingsPage = () => {
    const { user, setUser, logout } = useAuthStore();
    const { showAlert } = useAlertStore();
    const theme = useTheme();

    const [savingUser, setSavingUser] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserDto>({});

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [errors, setErrors] = useState<{
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});

    const [savingPassword, setSavingPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]);

    const validate = useCallback(() => {
        const newErrors: typeof errors = {};

        if (!currentPassword.trim()) {
            return;
        }

        if (!newPassword.trim()) {
            newErrors.newPassword = "Nova senha é obrigatória.";
        } else {
            if (newPassword.length < 8) {
                newErrors.newPassword = "Mínimo de 8 caracteres.";
            } else if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
                newErrors.newPassword = "Deve conter letra e número.";
            }
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirmação obrigatória.";
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = "As senhas não coincidem.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [currentPassword, newPassword, confirmPassword]);

    useEffect(() => {
        validate();
    }, [currentPassword, newPassword, confirmPassword, validate]);

    async function handleSavePassword() {
        if (!validate()) return;

        if (!currentUser.id) {
            showAlert("Usuário não identificado.", "error");
            return;
        }

        try {
            setSavingPassword(true);

            const payload: ChangePasswordInput = {
                password: newPassword,
                userId: currentUser.id
            };

            await usersApi.apiUsersChangePasswordPost({ changePasswordInput: payload });
            showAlert("Senha alterada com sucesso!", "success");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setErrors({});
        } catch (e: unknown) {
            const msg = (e as Error).message || "Erro ao alterar senha";
            showAlert(msg, "error");
        } finally {
            setSavingPassword(false);
        }
    }

    function handleUserFieldChange<K extends keyof UserDto>(field: K, value: UserDto[K]) {
        const updated = { ...currentUser, [field]: value };
        setCurrentUser(updated);
        setUser(updated);
    }

    const handleSaveUserChanges = async () => {
        setSavingUser(true);
        await usersApi.apiUsersPut({
            userDto: currentUser
        }).then(() => {
            showAlert("Perfil atualizado com sucesso!", "success");
        }).catch((error: Error) => {
            showAlert(`Erro ao atualizar perfil: ${error.message}`, "error");
        }).finally(() => {
            setSavingUser(false);
        });
    };

    return (
        <>
            <Paper elevation={3} sx={{ m: 3, p: 3 }}>
                <Grid container alignItems={'center'} gap={2}>
                    <Typography color="primary" variant="h5" gutterBottom sx={{ m: 0 }}>
                        Perfil
                    </Typography>
                </Grid>
                <Typography variant="subtitle2" color="textSecondary">
                    Aqui você pode ajustar as configurações do aplicativo.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Nome de Usuário"
                            variant="outlined"
                            value={currentUser.nome || ""}
                            onChange={(e) => handleUserFieldChange('nome', e.target.value)}
                            InputProps={{
                                startAdornment: <AccountBox color="primary" sx={{ mr: 1 }} />
                            }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={currentUser.email || ""}
                            onChange={(e) => handleUserFieldChange('email', e.target.value)}
                            InputProps={{
                                startAdornment: <Email color="primary" sx={{ mr: 1 }} />
                            }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="CPF"
                            variant="outlined"
                            value={currentUser.cpf || ""}
                            onChange={(e) => handleUserFieldChange('cpf', e.target.value)}
                            InputProps={{
                                startAdornment: <Numbers color="primary" sx={{ mr: 1 }} />
                            }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Divider />
                    </Grid>
                    <Grid size={12} display="flex" justifyContent="flex-end">
                        <Button
                            loading={savingUser}
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            onClick={handleSaveUserChanges}
                        >
                            Salvar Perfil
                        </Button>
                    </Grid>

                </Grid>
            </Paper>

            <Paper elevation={3} sx={{ m: 3, p: 3 }}>
                <Grid container alignItems={'center'} gap={2}>
                    <Typography color="primary" variant="h5" gutterBottom sx={{ m: 0 }}>
                        Segurança
                    </Typography>
                </Grid>
                <Typography variant="subtitle2" color="textSecondary">
                    Gerencie suas configurações de segurança e privacidade.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Senha Atual"
                            type={showCurrent ? "text" : "password"}
                            variant="outlined"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            error={!!errors.currentPassword}
                            helperText={errors.currentPassword}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowCurrent(s => !s)}
                                        edge="end"
                                    >
                                        {showCurrent ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Nova Senha"
                            type={showNew ? "text" : "password"}
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword || "Mínimo 8 caracteres, deve ter letra e número."}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowNew(s => !s)}
                                        edge="end"
                                    >
                                        {showNew ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Confirmar Nova Senha"
                            type={showConfirm ? "text" : "password"}
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowConfirm(s => !s)}
                                        edge="end"
                                    >
                                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />
                    </Grid>
                    <Grid size={12} display="flex" justifyContent="flex-end">
                        <Button
                            loading={savingPassword}
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={!savingPassword && <Save />}
                            onClick={handleSavePassword}
                            disabled={savingPassword || !newPassword || !confirmPassword || Object.keys(errors).length > 0}
                        >
                            {savingPassword ? <CircularProgress size={20} color="inherit" /> : "Salvar Nova Senha"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            

            <Paper elevation={3} sx={{ mt: 1, mx: 3, mb: 3, py: 1 }}>
                <Grid container alignItems={'center'} px={1}>
                    <Button
                    fullWidth
                        startIcon={<Logout />}
                        sx={{
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                            color: alpha(theme.palette.error.main, 0.7),
                            borderColor: alpha(theme.palette.error.main, 0.5),
                            fontWeight: 'bold',
                        }}
                        variant="outlined"
                        onClick={logout}
                    >
                        Sair
                    </Button>
                </Grid>
            </Paper>
        </>

    );
};