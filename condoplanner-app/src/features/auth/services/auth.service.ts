import { AuthApi, type AuthenticationResponse, type LoginRequest, type RegisterRequest } from '../../../apiClient'; import { ApiConfiguration } from '../../../apiClient/apiConfig';

const api = new AuthApi(ApiConfiguration);

export const AuthService = {
    async login(data: LoginRequest): Promise<AuthenticationResponse> {
        const res = await api.apiAuthLoginPost({ loginRequest: data });
        return res;
    },

    async register(data: RegisterRequest): Promise<AuthenticationResponse> {
        const res = await api.apiAuthRegistrarPost({ registerRequest: data });
        return res;
    },
};
