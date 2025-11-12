import { useEffect, useMemo, useState } from 'react';
import { alpha, Box, Chip, Stack, Typography, useMediaQuery, useTheme, Paper, Button } from '@mui/material';
import CalendarHeader from './CalendarHeader';
import CreateReservationDialog from './CreateReservationDialog';
import useCommonAreaViewStore from '../../../../../stores/commonAreaView.store';
import useReservationStore from '../../../../../stores/reservation.store';
import { EStatusReserva, type ReservationDto } from '../../../../../apiClient';

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

    return (
        <>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                {isMobile ? (
                    <Box>
                        <CalendarHeader
                            year={curYear}
                            month={curMonth}
                            onPrev={prevMonth}
                            onNext={nextMonth}
                            canEdit={canEdit}
                            mobile
                            actionSlot={
                                <Box>
                                    <Paper elevation={0} sx={{ p: 0 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {loading ? 'Carregando…' : `${reservations.length} reservas`}
                                        </Typography>
                                    </Paper>
                                </Box>
                            }
                        />

                        <Box sx={{ mb: 1 }}>
                            <Box display="flex" justifyContent="space-between">
                                {weekDays.map(d => (
                                    <Box key={d} sx={{ textAlign: 'center' }}>
                                        <Typography variant="caption" color="text.secondary">{d}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Stack spacing={1}>
                            {weeks.map((week, wi) => (
                                <Box key={wi} display="flex" justifyContent="space-between" sx={{ overflowX: 'auto' }}>
                                    {week.map((dt, di) => {
                                        const key = dt ? dt.toISOString().slice(0, 10) : `n${wi}-${di}`;
                                        const isToday = dt ? new Date().toDateString() === dt.toDateString() : false;
                                        const items = dt ? (dayMap.get(key) ?? []) : [];
                                        return (
                                            <Box key={key} sx={{ minWidth: 44, position: 'relative' }}>
                                                <Paper
                                                    variant="outlined"
                                                    sx={{
                                                        p: 1,
                                                        minHeight: 68,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'flex-start',
                                                        bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                                        border: isToday ? `1px solid ${alpha(theme.palette.primary.main, 0.4)}` : undefined,
                                                        borderRadius: 1
                                                    }}
                                                >
                                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                        {dt ? dt.getDate() : ''}
                                                    </Typography>
                                                    <Stack spacing={0.25} sx={{ mt: 0.5, width: '100%' }}>
                                                        {items.slice(0, 2).map((r, idx) => (
                                                            <Chip key={idx}
                                                                size="small"
                                                                color={statusColor(r.status) as any}
                                                                label={`${(r.startTime ?? '').slice(0,5)}-${(r.endTime ?? '').slice(0,5)}`}
                                                                sx={{ height: 20 }}
                                                            />
                                                        ))}
                                                        {items.length > 2 && (
                                                            <Typography variant="caption" color="text.secondary">+{items.length - 2} mais</Typography>
                                                        )}
                                                    </Stack>
                                                </Paper>
                                                {canEdit && dt && (
                                                    <Box position="absolute" top={0} left={0} right={0} bottom={0} onClick={() => { setSelectedDate(dt); setOpenDialog(true); }} sx={{ cursor: 'pointer' }} />
                                                )}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                ) : (
                    <Box>
                        <CalendarHeader
                            year={curYear}
                            month={curMonth}
                            onPrev={prevMonth}
                            onNext={nextMonth}
                            canEdit={canEdit}
                            actionSlot={
                                canEdit && currentArea?.id ? (
                                    <Button variant="contained" size="small" onClick={() => setOpenDialog(true)}>Adicionar Reserva</Button>
                                ) : undefined
                            }
                        />

                        <Box>
                            <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
                                {weekDays.map(d => (
                                    <Box key={d}>
                                        <Typography variant="caption" color="text.secondary">{d}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Box mt={1}>
                                {weeks.map((week, wi) => (
                                    <Box key={wi} display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} sx={{ mb: 1 }}>
                                        {week.map((dt, di) => {
                                            const key = dt ? dt.toISOString().slice(0, 10) : `n${wi}-${di}`;
                                            const items = dt ? (dayMap.get(key) ?? []) : [];
                                            const isToday = dt ? new Date().toDateString() === dt.toDateString() : false;
                                            return (
                                                <Box key={key} position="relative">
                                                    <Paper variant="outlined" sx={{ minHeight: 92, p: 1, bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : 'transparent', border: isToday ? `1px solid ${alpha(theme.palette.primary.main, 0.4)}` : undefined, borderRadius: 1 }}>
                                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                                            <Typography variant="caption">{dt ? dt.getDate() : ''}</Typography>
                                                            {items.length > 0 && (
                                                                <Typography variant="caption" color="primary">{items.length}</Typography>
                                                            )}
                                                        </Box>
                                                        <Stack spacing={0.5} mt={0.5}>
                                                            {items.slice(0, 2).map((r, idx) => (
                                                                <Chip key={idx}
                                                                    size="small"
                                                                    color={statusColor(r.status) as any}
                                                                    label={`${(r.startTime ?? '').slice(0,5)}-${(r.endTime ?? '').slice(0,5)}`}
                                                                    sx={{ height: 22, fontSize: 12 }}
                                                                />
                                                            ))}
                                                            {items.length > 2 && (
                                                                <Typography variant="caption" color="text.secondary">+{items.length - 2} mais</Typography>
                                                            )}
                                                        </Stack>
                                                    </Paper>
                                                    {canEdit && dt && (
                                                        <Box position="absolute" top={0} left={0} right={0} bottom={0} onClick={() => { setSelectedDate(dt); setOpenDialog(true); }} sx={{ cursor: 'pointer' }} />
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                )}
            </Paper>
            <CreateReservationDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                areaId={currentArea?.id ?? 0}
                defaultDate={selectedDate ?? new Date(curYear, curMonth, 1)}
                capacity={currentArea?.capacity}
            />
        </>
    );
}

export default CommonAreaCalendar;
