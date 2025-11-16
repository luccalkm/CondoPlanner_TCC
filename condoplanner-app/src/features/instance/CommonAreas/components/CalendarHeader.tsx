import { Box, IconButton, Typography, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import type { ReactNode } from 'react';

interface CalendarHeaderProps {
    year: number;
    month: number;
    onPrev: () => void;
    onNext: () => void;
    canEdit: boolean;
    mobile?: boolean;
    actionSlot?: ReactNode;
}

export function CalendarHeader({ year, month, onPrev, onNext, canEdit, mobile, actionSlot }: CalendarHeaderProps) {
    const label = new Date(year, month).toLocaleString(undefined, { month: 'long', year: 'numeric' });
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton size={mobile ? 'small' : 'medium'} onClick={onPrev}><ChevronLeft /></IconButton>
                <Typography variant={mobile ? 'subtitle1' : 'h6'} fontWeight={mobile ? 600 : undefined}>{label}</Typography>
                <IconButton size={mobile ? 'small' : 'medium'} onClick={onNext}><ChevronRight /></IconButton>
            </Box>
            <Box>
                {actionSlot ? actionSlot : (
                    canEdit ? (
                        <Button variant="contained" size="small" disabled>{mobile ? 'Adicionar' : 'Adicionar Reserva'}</Button>
                    ) : (
                        <Button variant={mobile ? 'outlined' : 'outlined'} size="small" disabled>{mobile ? 'Adicionar' : 'Adicionar (sem permissão)'}</Button>
                    )
                )}
            </Box>
        </Box>
    );
}

export default CalendarHeader;
