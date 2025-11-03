import { Configuration, type ErrorContext, type ResponseContext } from '../apiClient';

const token = localStorage.getItem('token');

export const ApiConfiguration = new Configuration({
    basePath: "https://localhost:7257", // TODO: move para variável de ambiente
    headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },

    middleware: [
        {
            onError: async (context: ErrorContext) => {
                const contentType = context.response?.headers.get('content-type');
                if (contentType && contentType.includes('json')) {
                    const json = await context.response?.json().catch(() => null);
                    throw new Error(json?.message || json?.error?.message || 'Erro desconhecido.');
                }
                return context.response;
            }
        },
        {
            post: async (context: ResponseContext) => {
                const ret = context.response;
                const contentType = ret.headers.get('content-type');
                if (contentType && contentType.includes('json')) {
                    if ([400, 401, 500].includes(ret.status)) {
                        const json = await ret.json().catch(() => null);
                        throw new Error(json?.message || json?.error?.message || 'Erro inesperado.');
                    } else {
                        const jsonClone = async () => {
                            const result = await ret.clone().json().catch(() => null);
                            return result;
                        };
                        ret.json = jsonClone;
                    }
                }
                return ret;
            }
        }
    ]
});
