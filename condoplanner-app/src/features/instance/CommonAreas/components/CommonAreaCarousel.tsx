import { useMemo, useRef, useState } from 'react';
import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import cameraAndPhotographyUrl from "../../../../assets/camerasAndPhotography.json";
import Lottie from 'lottie-react';
import { AddPhotoAlternate } from '@mui/icons-material';

type Photo = { id?: number; base64Data?: string | null; contentType?: string | null };

type Props = {
    areaId: number;
    alt: string;
    fallbackUrl?: string;
    height?: number | string;
    rounded?: number;
    photos?: Photo[];
};

export function CommonAreaCarousel({
    alt,
    fallbackUrl,
    height = 160,
    rounded = 4,
    photos
}: Props) {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const ids = useMemo(() => (photos || []).map(p => p.id ?? 0), [photos]);
    const sources = useMemo(() => (photos || []).map(p => p.base64Data ? `data:${p.contentType};base64,${p.base64Data}` : (fallbackUrl || null)), [photos, fallbackUrl]);
    const loading = useMemo(() => (photos || []).map(p => !p.base64Data), [photos]);

    const currentSrc = sources[index] ?? fallbackUrl ?? null;

    function go(delta: number) {
        if (ids.length === 0) return;
        const next = ((index + delta) % ids.length + ids.length) % ids.length;
        setIndex(next);
    }

    if (photos == null || photos.length === 0) {
        return (
            <Box ref={containerRef} sx={{ width: '100%' }}>
                <Lottie animationData={cameraAndPhotographyUrl} style={{ height }} />
                <Box width={'100%'} display={"flex"} justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color='disabled' align="center">
                        Nenhuma foto disponível
                    </Typography>
                    <IconButton>
                        <AddPhotoAlternate />
                    </IconButton>
                </Box>
            </Box>
        );
    }

    return (
        <Box ref={containerRef} position="relative" sx={{ width: '100%' }}>
            {!currentSrc || (loading[index] ?? false) ? (
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
                            onClick={() => { setIndex(i); }}
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
