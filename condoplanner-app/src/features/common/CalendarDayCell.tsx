import { alpha, Box, Chip, Stack, Typography, useTheme, Grid } from '@mui/material';
import { EStatusReserva, type ReservationDto } from '../../apiClient';
import { memo } from 'react';

export interface CalendarDayCellProps {
    date: Date | null;
    items: ReservationDto[];
    isToday: boolean;
    isPast: boolean;
    canEdit: boolean;
    variant: 'mobile' | 'desktop';
    onSelect?: (date: Date) => void;
}

function statusColor(s?: EStatusReserva) {
    switch (s) {
        case EStatusReserva.Pendente: return 'warning';
        case EStatusReserva.Aprovado: return 'success';
        case EStatusReserva.Concluida: return 'info';
        case EStatusReserva.Rejeitado:
        case EStatusReserva.Cancelado:
        default: return 'default';
    }
}

export const CalendarDayCell = memo(function CalendarDayCell({ date, items, isToday, isPast, canEdit, variant, onSelect }: CalendarDayCellProps) {
    const theme = useTheme();
    const key = date ? date.toISOString().slice(0, 10) : 'empty';
    const isMobile = variant === 'mobile';
    const minHeight = isMobile ? 92 : 120;

    const handleSelectDate = () => {
        if (canEdit && date && !isPast) {
            onSelect?.(date);
        }
    };

    return (
        <Grid size={12 / 7}>
            <Box
                onClick={handleSelectDate}
                key={key}
                sx={{
                    p: isMobile ? 0.5 : 0.75,
                    minHeight,
                    maxHeight: minHeight,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    bgcolor: isToday ? alpha(theme.palette.primary.main, 0.08) : date?.getMonth() !== new Date().getMonth() ? alpha(theme.palette.text.primary, 0.03) : 'transparent',
                    borderRadius: 0,
                    border: '0.5px solid ' + (isToday ? alpha(theme.palette.primary.main, 0.4) : '#e0e0e0'),
                    opacity: isPast ? 0.6 : 1,
                    filter: isPast ? 'grayscale(0.15)' : 'none',
                    transition: 'background-color 0.12s ease',
                    boxSizing: 'border-box',
                    cursor: canEdit && date && !isPast ? 'pointer' : 'default'
                }}

            >
                <Box display="flex" justifyContent="space-between" width="100%" alignItems="flex-start">
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, lineHeight: 1 }}>
                        {date ? date.getDate() : ''}
                    </Typography>
                    {!isMobile && items.length > 0 && (
                        <Typography variant="caption" color="primary">{items.length}</Typography>
                    )}
                </Box>
                <Stack spacing={isMobile ? 0.25 : 0.5} sx={{ mt: 0.25, width: '100%' }}>
                    {items.slice(0, isMobile ? 1 : 2).map((r, idx) => (
                        <Chip
                            key={idx}
                            size="small"
                            color={statusColor(r.status)}
                            label={`${(r.startTime ?? '').slice(0, 5)}-${(r.endTime ?? '').slice(0, 5)}`}
                            sx={{ height: 20, fontSize: 10, maxWidth: '100%' }}
                        />
                    ))}
                    {items.length > (isMobile ? 1 : 2) && (
                        <Typography variant="caption" color="text.secondary">+{items.length - (isMobile ? 1 : 2)} mais</Typography>
                    )}
                </Stack>

            </Box>
        </Grid>
    );
});

export default CalendarDayCell;
