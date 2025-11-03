
import { Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Email, Lock } from '@mui/icons-material';
import type { LoginRequest } from '../../../apiClient';

export default function Login() {
    const { handleLogin, error, loading } = useAuth();
    const navigate = useNavigate();

    const [request, setRequest] = useState({ email: '', senha: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginRequest: LoginRequest = { ...request };
        await handleLogin(loginRequest);
        navigate('/dashboard');
    };

    return (
        <>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={request.email}
                    onChange={(e) => setRequest({ ...request, email: e.target.value })}
                    InputProps={{ startAdornment: <Email fontSize="small" sx={{ mr: 1 }} /> }}
                />
                <TextField
                    label="Senha"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={request.senha}
                    onChange={(e) => setRequest({ ...request, senha: e.target.value })}
                    InputProps={{ startAdornment: <Lock fontSize="small" sx={{ mr: 1 }} /> }}
                />
                <Button onClick={handleSubmit} type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2 }}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </Button>
            </>

            <Typography variant="body2" textAlign="center" mt={2}>
                Não tem uma conta? <Link href="/register">Registrar</Link>
            </Typography>
        </>
    );
}