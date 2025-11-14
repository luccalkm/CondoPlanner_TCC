import { Paper, Chip, Typography } from '@mui/material';
import { AccessTime, People, CalendarMonth, CheckCircleOutline, Cancel } from '@mui/icons-material';
import type { CommonAreaDto } from '../../../../apiClient';

interface AreaInfoChipsProps {
    area: CommonAreaDto | null | undefined;
}

export function AreaInfoChips({ area }: AreaInfoChipsProps) {
    return (
        <>
        
            {area?.description && (
                <Paper variant="outlined" sx={{ width: '100%', flexWrap: 'wrap', p: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Descrição</Typography>
                    <Typography variant="body2" color="text.secondary">{area?.description}</Typography>
                </Paper>
            )}
            <Paper variant="outlined" sx={{ display: 'flex', width: '100%', flexDirection: 'row', gap: 1, p: 2, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip
                    icon={area?.available ? <CheckCircleOutline fontSize="small" /> : <Cancel fontSize="small" />}
                    label={area?.available ? 'Disponível' : 'Indisponível'}
                    color={area?.available ? 'success' : 'default'}
                    size="small"
                />
                <Chip icon={<People fontSize="small" />} label={`${area?.capacity ?? 0} pessoas`} size="small" />
                <Chip icon={<CalendarMonth fontSize="small" />} label={`${area?.availableDays ?? 0} dias`} size="small" />
                <Chip icon={<AccessTime fontSize="small" />} label={`${(area?.openingTime ?? '').substring(0, 5) || '--:--'} - ${(area?.closingTime ?? '').substring(0, 5) || '--:--'}`} size="small" />
            </Paper>
            {area?.notes && (
                <Paper variant="outlined" sx={{ width: '100%', flexWrap: 'wrap', p: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Observações</Typography>
                    <Typography variant="body2" color="text.secondary">{area?.notes}</Typography>
                </Paper>
            )}
        </>
    );
}

export default AreaInfoChips;
