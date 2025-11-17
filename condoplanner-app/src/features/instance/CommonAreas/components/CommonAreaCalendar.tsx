import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme, Paper } from '@mui/material';
import CalendarHeader from '../../../common/CalendarHeader';
import CreateReservationDialog from './CreateReservationDialog';
import useCommonAreaViewStore from '../../../../stores/commonAreaView.store';
import useReservationStore from '../../../../stores/reservation.store';
import { type ReservationDto } from '../../../../apiClient';
import { CalendarGrid } from "./CalendarGrid";

function buildMonth(year: number, month: number) {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const weeks: (Date | null)[][] = [];
    let week: (Date | null)[] = [];
    for (let i = 0; i < first.getDay(); i++) week.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
        week.push(new Date(year, month, d));
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }
    while (week.length < 7) week.push(null);
    weeks.push(week);
    return weeks;
}

interface CommonAreaCalendarProps {
    canEdit: boolean;
}

export function CommonAreaCalendar({ canEdit }: CommonAreaCalendarProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [curYear, setCurYear] = useState(new Date().getFullYear());
    const [curMonth, setCurMonth] = useState(new Date().getMonth());
    const { currentArea } = useCommonAreaViewStore();
    const { fetchForAreaMonth, byMonth, loading } = useReservationStore();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        if (!currentArea?.id) return;
        fetchForAreaMonth(currentArea.id, curYear, curMonth);
    }, [currentArea?.id, curYear, curMonth, fetchForAreaMonth]);

    const weeks = useMemo(() => buildMonth(curYear, curMonth), [curYear, curMonth]);
    const today0 = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);

    function prevMonth() {
        const d = new Date(curYear, curMonth - 1, 1);
        setCurYear(d.getFullYear());
        setCurMonth(d.getMonth());
    }

    function nextMonth() {
        const d = new Date(curYear, curMonth + 1, 1);
        setCurYear(d.getFullYear());
        setCurMonth(d.getMonth());
    }

    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    function monthReservations(): ReservationDto[] {
        if (!currentArea?.id) return [];
        const k = `${currentArea.id}-${curYear}-${curMonth}` as `${number}-${number}-${number}`;
        return byMonth[k] ?? [];
    }

    const reservations = monthReservations();

    const dayMap = useMemo(() => {
        const map = new Map<string, ReservationDto[]>();
        for (const r of reservations) {
            if (!r.date) continue;
            const key = new Date(r.date).toISOString().slice(0, 10);
            const arr = map.get(key) ?? [];
            arr.push(r);
            map.set(key, arr);
            if (r.startTime && r.endTime && r.startTime >= r.endTime) {
                const d = new Date(key);
                d.setDate(d.getDate() + 1);
                const nextKey = d.toISOString().slice(0, 10);
                const arr2 = map.get(nextKey) ?? [];
                arr2.push(r);
                map.set(nextKey, arr2);
            }
        }
        for (const [k, arr] of map.entries()) {
            arr.sort((a, b) => (a.startTime ?? '').localeCompare(b.startTime ?? ''));
            map.set(k, arr);
        }
        return map;
    }, [reservations]);

    return (
        <>
            <Paper variant="outlined" sx={{ py: 2}}>
                <Box>
                    <CalendarHeader
                        year={curYear}
                        month={curMonth}
                        onPrev={prevMonth}
                        onNext={nextMonth}
                        mobile={isMobile}
                        actionSlot={
                            <Typography variant="caption" color="text.secondary" mr={2}>
                                {loading ? 'Carregando…' : `${reservations.length} reservas`}
                            </Typography>
                        }
                    />

                    <Box sx={{ mb: 1 }}>
                        <Box display="flex" justifyContent="space-between" px={1}>
                            {weekDays.map(d => (
                                <Box key={d} sx={{ textAlign: 'center' }}>
                                    <Typography variant="caption" color="text.secondary">{d}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <CalendarGrid
                        weeks={weeks}
                        dayMap={dayMap}
                        today0={today0}
                        canEdit={canEdit}
                        variant={isMobile ? 'mobile' : 'desktop'}
                        onSelect={(d) => { setSelectedDate(d); setOpenDialog(true); }}
                    />
                </Box>
            </Paper>
            <CreateReservationDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                area={currentArea!}
                defaultDate={selectedDate ?? new Date(curYear, curMonth, 1)}
            />
        </>
    );
}

export default CommonAreaCalendar;
