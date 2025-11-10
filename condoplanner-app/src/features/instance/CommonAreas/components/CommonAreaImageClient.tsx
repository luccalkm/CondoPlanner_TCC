import { useEffect, useState } from 'react';
import { CommonAreaApi } from '../../../../apiClient';
import { Skeleton } from '@mui/material';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';

type Props = {
    photoId?: number;
    alt: string;
    height?: number | string;
    fallbackUrl?: string;
    style?: React.CSSProperties;
};

const api = new CommonAreaApi(ApiConfiguration);
const photoCache = new Map<number, string>();

export function CommonAreaImageClient({ photoId, alt, height = 160, fallbackUrl, style }: Props) {
    const [src, setSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(!!photoId);

    useEffect(() => {
        let active = true;

        async function load() {
            if (!photoId) {
                setSrc(fallbackUrl || null);
                setLoading(false);
                return;
            }

            const cached = photoCache.get(photoId);
            if (cached) {
                setSrc(cached);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const dto = await api.apiCommonAreaPhotosPhotoIdGet({ photoId, includeData: true });
                if (dto?.base64Data && dto.contentType) {
                    const dataUri = `data:${dto.contentType};base64,${dto.base64Data}`;
                    photoCache.set(photoId, dataUri);
                    if (active) setSrc(dataUri);
                } else if (active) {
                    setSrc(fallbackUrl || null);
                }
            } catch (err) {
                console.error('Erro carregando foto com client swagger', err);
                if (active) setSrc(fallbackUrl || null);
            } finally {
                if (active) setLoading(false);
            }
        }

        load();
        return () => { active = false; };
    }, [photoId, fallbackUrl]);

    if (loading && !src) {
        return <Skeleton variant="rectangular" height={height} />;
    }

    return (
        <img
            src={src || fallbackUrl || ''}
            alt={alt}
            height={height}
            style={{ padding: 2, width: '100%', objectFit: 'cover', borderRadius: 4, ...style }}
        />
    );
}