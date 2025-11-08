import { create } from 'zustand';
import { AuthApi, type AuthenticationResponse, type LoginRequest, type RegisterRequest, type RegisterResponse, type UsuarioDto } from '../apiClient';
import { ApiConfiguration } from '../apiClient/apiConfig';

const authApi = new AuthApi(ApiConfiguration);

interface AuthState {
    isAuthenticated: boolean;
    user: UsuarioDto | null;

    login: (loginRequest: LoginRequest) => Promise<AuthenticationResponse>;
    register: (registerRequest: RegisterRequest) => Promise<RegisterResponse>;
    logout: () => void;
    setUser: (user: UsuarioDto) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token') ?? "",
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,

    setUser: (user: UsuarioDto) => set({ user }),

    login: async (loginRequest): Promise<AuthenticationResponse> => {
        const res = await authApi.apiAuthLoginPost({ loginRequest });

        if (!res.sucesso)
            throw new Error(res.erro || 'Erro ao efetuar login');

        localStorage.setItem('token', res.token!);
        localStorage.setItem('user', JSON.stringify(res.usuario));
        set({ isAuthenticated: true, user: res.usuario || null });
        return res;
    },

    register: async (registerRequest): Promise<RegisterResponse> => {
        const res = await authApi.apiAuthRegistrarPost({ registerRequest });

        if (!res.sucesso) 
            throw new Error('Registro realizado com sucesso');

        return res;
        
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false, user: null });
    },
}));
