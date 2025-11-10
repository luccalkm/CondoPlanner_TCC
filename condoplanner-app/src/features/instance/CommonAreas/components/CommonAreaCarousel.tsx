import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Box, IconButton, Skeleton, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CommonAreaApi } from '../../../../apiClient';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';

type Props = {
    areaId: number;
    alt: string;
    fallbackUrl?: string;
    height?: number | string;
    rounded?: number;
};

export function CommonAreaCarousel({
    areaId,
    alt,
    fallbackUrl,
    height = 160,
    rounded = 4
}: Props) {
    const [ids, setIds] = useState<number[]>([]);
    const [index, setIndex] = useState(0);
    const [sources, setSources] = useState<(string | null)[]>(() => ids.map(() => null));
    const [loading, setLoading] = useState<boolean[]>(() => ids.map(() => false));
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    const idsKey = useMemo(() => ids.join(','), [ids]);

    useEffect(() => {
        let active = true;
        const api = new CommonAreaApi(ApiConfiguration);
        async function loadAll() {
            const list = await api.apiCommonAreaAreasAreaIdPhotosGet({ areaId, includeData: true });
            if (!active) return;
            const newIds = list.map(p => p.id).filter((v): v is number => typeof v === 'number');
            setIds(newIds);
            setSources(list.map(p => p.base64Data ? `data:${p.contentType};base64,${p.base64Data}` : (fallbackUrl || null)));
            setLoading(list.map(p => !p.base64Data));
            setIndex(0);
        }
        loadAll();
        return () => { active = false; };
    }, [areaId, fallbackUrl]);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setVisible(true);
                }
            },
            { rootMargin: '100px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const ensureLoaded = useCallback(() => { }, []);

    useEffect(() => {
        if (!visible || ids.length === 0) return;
    }, [visible, idsKey, ids]);

    function go(delta: number) {
        if (ids.length === 0) return;
        const next = ((index + delta) % ids.length + ids.length) % ids.length;
        setIndex(next);
        ensureLoaded();
    }

    if (!ids.length) {
        return (
            <img
                src={fallbackUrl || ''}
                alt={alt}
                height={height}
                style={{ padding: 2, width: '100%', objectFit: 'cover', borderRadius: rounded }}
            />
        );
    }

    const currentSrc = sources[index];

    return (
        <Box ref={containerRef} position="relative" sx={{ width: '100%' }}>
            {!currentSrc || loading[index] ? (
                <Skeleton variant="rectangular" height={height} sx={{ borderRadius: rounded }} />
            ) : (
                <img
                    src={currentSrc || fallbackUrl || ''}
                    alt={alt}
                    height={height}
                    style={{ padding: 2, width: '100%', objectFit: 'cover', borderRadius: rounded }}
                    loading="lazy"
                />
            )}

            {ids.length > 1 && (
                <>
                    <IconButton
                        size="small"
                        onClick={() => go(-1)}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: 8,
                            transform: 'translateY(-50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'background.paper' }
                        }}
                        aria-label="Anterior"
                    >
                        <ChevronLeftIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => go(1)}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: 8,
                            transform: 'translateY(-50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'background.paper' }
                        }}
                        aria-label="Próximo"
                    >
                        <ChevronRightIcon fontSize="small" />
                    </IconButton>
                </>
            )}

            {ids.length > 1 && (
                <Stack direction="row" spacing={0.75} sx={{ position: 'absolute', bottom: 8, width: '100%', justifyContent: 'center' }}>
                    {ids.map((_, i) => (
                        <Box
                            key={i}
                            onClick={() => { setIndex(i); ensureLoaded(); }}
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: i === index ? 'primary.main' : 'grey.400',
                                cursor: 'pointer',
                                boxShadow: 1
                            }}
                        />
                    ))}
                </Stack>
            )}
        </Box>
    );
}
