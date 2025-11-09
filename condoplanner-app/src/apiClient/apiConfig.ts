import { Configuration, type ErrorContext, type ResponseContext, type RequestContext } from '../apiClient';

function isPublicPath() {
    const publicPaths = ['/login', '/register'];
    return publicPaths.includes(window.location.pathname);
}

function handleUnauthorized() {
    localStorage.removeItem('token');

    if (isPublicPath()) return;

    window.location.replace('/login');
}

export const ApiConfiguration = new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL || "https://localhost:7257",
    middleware: [
        {
            async pre(context: RequestContext) {
                const token = localStorage.getItem('token');
                if (token) {
                    context.init.headers = {
                        ...(context.init.headers || {}),
                        Authorization: `Bearer ${token}`,
                    };
                }
                return context;
            }
        },
        {
            async post(context: ResponseContext) {
                const res = context.response;
                if (res.status === 401) {
                    handleUnauthorized();

                    throw new Error('Não autorizado. Redirecionando para login.');
                }
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('json')) {
                    if ([400, 500].includes(res.status)) {
                        const json = await res.json().catch(() => null);
                        throw new Error(json?.message || json?.error?.message || 'Erro inesperado.');
                    } else {

                        const jsonClone = async () => {
                            const result = await res.clone().json().catch(() => null);
                            return result;
                        };
                        res.json = jsonClone;
                    }
                }
                return res;
            }
        },
        {
            async onError(context: ErrorContext) {
                const status = context.response?.status;
                if (status === 401) {
                    handleUnauthorized();
                    throw new Error('Não autorizado. Redirecionando para login.');
                }
                const contentType = context.response?.headers.get('content-type');
                if (contentType && contentType.includes('json')) {
                    const json = await context.response?.json().catch(() => null);
                    throw new Error(json?.message || json?.error?.message || 'Erro desconhecido.');
                }
                return context.response;
            }
        }
    ]
});
