import { useState } from 'react';
import { useAuthStore } from '../stores/auth.store';
import type { LoginRequest, RegisterRequest } from '../apiClient';

export function useAuth() {
    const { login, register, logout, isAuthenticated, user } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(loginRequest: LoginRequest) {
        try {
            setError(null);
            setLoading(true);
            await login(loginRequest);
        } catch (err: unknown) {
            setError((err as Error).message || 'Erro ao efetuar login');
        } finally {
            setLoading(false);
        }
    }

    async function handleRegister(registerRequest: RegisterRequest) {
        try {
            setError(null);
            setLoading(true);
            await register(registerRequest);
        } catch (err: unknown) {
            setError((err as Error).message || 'Erro ao registrar');
        } finally {
            setLoading(false);
        }
    }

    return { handleLogin, handleRegister, logout, isAuthenticated, user, loading, error };
}
