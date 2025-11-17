import { Grid } from "@mui/material";
import type { ReservationDto } from "../../../../apiClient";
import CalendarDayCell from "./CalendarDayCell";

export function CalendarGrid({
    weeks,
    dayMap,
    today0,
    canEdit,
    variant,
    onSelect,
}: {
    weeks: (Date | null)[][];
    dayMap: Map<string, ReservationDto[]>;
    today0: Date;
    canEdit: boolean;
    variant: 'mobile' | 'desktop';
    onSelect: (date: Date) => void;
}) {
    return (
        <Grid container spacing={0}>
            {weeks.flat().map((dt, i) => {
                const key = dt ? dt.toISOString().slice(0, 10) : `empty-${i}`;
                const items = dt ? dayMap.get(key) ?? [] : [];
                const isToday = dt ? new Date().toDateString() === dt.toDateString() : false;
                const isPast = dt ? new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()) < today0 : false;
                return (
                    <CalendarDayCell
                        key={key}
                        date={dt}
                        items={items}
                        isToday={isToday}
                        isPast={isPast}
                        canEdit={canEdit}
                        variant={variant}
                        onSelect={onSelect}
                    />
                );
            })}
        </Grid>
    );
}