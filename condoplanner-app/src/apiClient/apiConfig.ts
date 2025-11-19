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
    basePath: import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7257',
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

                if (res.status >= 400) {
                    const contentType = res.headers.get('content-type') || '';
                    let message = '';

                    try {
                        if (contentType.includes('json')) {
                            const json = await res.clone().json().catch(() => null);
                            message = json?.message || json?.error?.message || json?.title || res.statusText || 'Erro inesperado.';
                        } else {
                            const text = await res.clone().text().catch(() => null);
                            message = (text && text.trim()) ? text : (res.statusText || 'Erro inesperado.');
                        }
                    } catch {
                        message = res.statusText || 'Erro inesperado.';
                    }

                    throw new Error(message);
                }

                const okContentType = res.headers.get('content-type') || '';
                if (okContentType.includes('json')) {
                    const jsonClone = async () => {
                        const result = await res.clone().json().catch(() => null);
                        return result;
                    };
                    res.json = jsonClone;
                }
                return res;
            }
        },
        {
            async onError(context: ErrorContext) {
                const res = context.response;

                if (res?.status === 401) {
                    handleUnauthorized();
                    throw new Error('Não autorizado. Redirecionando para login.');
                }

                if (res) {
                    const contentType = res.headers.get('content-type') || '';
                    try {
                        if (contentType.includes('json')) {
                            const json = await res.clone().json().catch(() => null);
                            throw new Error(json?.message || json?.error?.message || json?.title || res.statusText || 'Erro desconhecido.');
                        } else {
                            const text = await res.clone().text().catch(() => null);
                            throw new Error((text && text.trim()) ? text : (res.statusText || 'Erro desconhecido.'));
                        }
                    } catch {
                        throw new Error(res?.statusText || 'Erro desconhecido.');
                    }
                }

                const errorObj = context.error;
                const fallback = (errorObj && typeof (errorObj as Error).message === 'string')
                    ? (errorObj as Error).message
                    : (context.error ? String(context.error) : 'Falha de rede ou CORS.');
                throw new Error(fallback);
            }
        }
    ]
});
