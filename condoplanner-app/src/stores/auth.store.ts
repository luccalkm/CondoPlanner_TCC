import { create } from 'zustand';
import { AuthService } from '../features/auth/services/auth.service';
import type { LoginRequest, RegisterRequest } from '../apiClient';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: { nome: string; email: string } | null;

    login: (loginRequest: LoginRequest) => Promise<void>;
    register: (registerRequest: RegisterRequest) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token') ?? "",
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,

    login: async (loginRequest) => {
        const res = await AuthService.login(loginRequest);
        if (res.token && res.nome && res.email) {
            localStorage.setItem('token', res.token);
            set({ token: res.token, isAuthenticated: true, user: { nome: res.nome, email: res.email } });
        } else {
            throw new Error('Invalid login response');
        }
    },

    register: async (registerRequest) => {
        const res = await AuthService.register(registerRequest);
        if (res.token && res.nome && res.email) {
            localStorage.setItem('token', res.token);
            set({ token: res.token, isAuthenticated: true, user: { nome: res.nome, email: res.email } });
        } else {
            throw new Error('Invalid register response');
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, isAuthenticated: false, user: null });
    },
}));
