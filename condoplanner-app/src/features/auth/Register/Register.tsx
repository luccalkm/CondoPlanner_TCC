import {
    Typography,
    TextField,
    Button,
    Link,
    Grid,
    Box,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useAlertStore } from '../../../stores/alert.store';
import type { RegisterRequest } from '../../../apiClient';

const sanitize = (value: string): string => value.replace(/\D/g, '');

const validateField = {
    nome: (value: string) => (!value.trim() ? 'Informe seu nome.' : ''),
    sobrenome: (value: string) => (!value.trim() ? 'Informe seu sobrenome.' : ''),
    email: (value: string) => {
        if (!value.trim()) return 'Informe seu email.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido.';
        return '';
    },
    telefone: (value: string) => {
        const sanitized = sanitize(value);
        if (!sanitized) return 'Informe seu telefone.';
        if (!/^\d{10,11}$/.test(sanitized)) return 'Formato de telefone inválido.';
        return '';
    },
    cpf: (value: string) => {
        const sanitized = sanitize(value);
        if (!sanitized) return 'Informe seu CPF.';
        if (!/^\d{11}$/.test(sanitized)) return 'Formato de CPF inválido.';
        return '';
    },
    senha: (value: string) => {
        if (!value.trim()) return 'Informe uma senha.';
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)) {
            return 'A senha deve ter pelo menos 8 caracteres, incluindo 1 dígito, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.';
        }
        return '';
    },
    confirmarSenha: (value: string, form: Record<string, string>) => {
        if (!value.trim()) return 'Confirme sua senha.';
        if (value !== form.senha) return 'As senhas não coincidem.';
        return '';
    },
};

export default function Register() {
    const { handleRegister, loading } = useAuth();
    const showAlert = useAlertStore((state) => state.showAlert);
    const navigate = useNavigate();

    const [form, setForm] = useState<{
        nome: string;
        sobrenome: string;
        email: string;
        telefone: string;
        cpf: string;
        senha: string;
        confirmarSenha: string;
    }>({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        cpf: '',
        senha: '',
        confirmarSenha: '',
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const update = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    };

    function validateFields(): boolean {
        const errors: Record<string, string> = {};

        Object.keys(form).forEach((field) => {
            const validate = validateField[field as keyof typeof validateField];
            if (validate) {
                errors[field] = validate(form[field as keyof typeof form], form);
            }
        });

        setFieldErrors(errors);
        return Object.keys(errors).every((key) => !errors[key]);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateFields()) return;

        const registerRequest: RegisterRequest = {
            nome: `${form.nome} ${form.sobrenome}`,
            email: form.email,
            telefone: sanitize(form.telefone),
            cpf: sanitize(form.cpf),
            senha: form.senha,
        };

        const response = await handleRegister(registerRequest);

        if (response.success) {
            showAlert('Registro realizado com sucesso!', 'success');
            navigate('/login');
        } else {
            showAlert(response.message || 'Erro ao registrar.', 'error');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <TextField
                        required
                        label="Nome"
                        fullWidth
                        value={form.nome}
                        onChange={(e) => update('nome', e.target.value)}
                        error={!!fieldErrors.nome}
                        helperText={fieldErrors.nome}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField
                        required
                        label="Sobrenome"
                        fullWidth
                        value={form.sobrenome}
                        onChange={(e) => update('sobrenome', e.target.value)}
                        error={!!fieldErrors.sobrenome}
                        helperText={fieldErrors.sobrenome}
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                        required
                        label="Email"
                        fullWidth
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField
                        required
                        label="Telefone"
                        fullWidth
                        value={form.telefone}
                        onChange={(e) => update('telefone', e.target.value)}
                        error={!!fieldErrors.telefone}
                        helperText={fieldErrors.telefone}
                        placeholder="(11) 91234-5678"
                    />
                </Grid>
                <Grid size={6}>
                    <TextField
                        required
                        label="CPF"
                        fullWidth
                        value={form.cpf}
                        onChange={(e) => update('cpf', e.target.value)}
                        error={!!fieldErrors.cpf}
                        helperText={fieldErrors.cpf}
                        placeholder="123.456.789-00"
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                        required
                        label="Senha"
                        fullWidth
                        type="password"
                        value={form.senha}
                        onChange={(e) => update('senha', e.target.value)}
                        error={!!fieldErrors.senha}
                        helperText={fieldErrors.senha}
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                        required
                        label="Confirmar senha"
                        fullWidth
                        type="password"
                        value={form.confirmarSenha}
                        onChange={(e) => update('confirmarSenha', e.target.value)}
                        error={!!fieldErrors.confirmarSenha}
                        helperText={fieldErrors.confirmarSenha}
                    />
                </Grid>
            </Grid>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                    mt: 3,
                    py: 1.3,
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                }}
            >
                {loading ? 'Criando conta...' : 'Registrar'}
            </Button>

            <Typography variant="body2" textAlign="center" mt={2}>
                Já tem conta? <Link href="/login">Entrar</Link>
            </Typography>
        </Box>
    );
}
