import { useMemo, useState } from 'react';
import { alpha, Box, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CalendarHeader from './CalendarHeader';

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

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            {isMobile ? (
                <Box>
                    <CalendarHeader year={curYear} month={curMonth} onPrev={prevMonth} onNext={nextMonth} canEdit={canEdit} mobile />

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
                                    return (
                                        <Box key={key} sx={{ minWidth: 44 }}>
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
                                            </Paper>
                                        </Box>
                                    );
                                })}
                            </Box>
                        ))}
                    </Stack>
                </Box>
            ) : (
                <Box>
                    <CalendarHeader year={curYear} month={curMonth} onPrev={prevMonth} onNext={nextMonth} canEdit={canEdit} />

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
                                        const dayReservations: unknown[] = [];
                                        const isToday = dt ? new Date().toDateString() === dt.toDateString() : false;
                                        return (
                                            <Box key={key}>
                                                <Paper variant="outlined" sx={{ minHeight: 80, p: 1, bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : 'transparent', border: isToday ? `1px solid ${alpha(theme.palette.primary.main, 0.4)}` : undefined }}>
                                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                                        <Typography variant="caption">{dt ? dt.getDate() : ''}</Typography>
                                                        {dayReservations.length > 0 && (
                                                            <Typography variant="caption" color="primary">{dayReservations.length}</Typography>
                                                        )}
                                                    </Box>
                                                    <Box mt={0.5}>
                                                        {dayReservations.length > 2 && (
                                                            <Typography variant="caption" color="text.secondary">+{dayReservations.length - 2} mais</Typography>
                                                        )}
                                                    </Box>
                                                </Paper>
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
    );
}

export default CommonAreaCalendar;
