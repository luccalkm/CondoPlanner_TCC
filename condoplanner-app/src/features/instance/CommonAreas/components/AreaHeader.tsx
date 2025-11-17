import { Grid, Paper, Typography, useTheme } from '@mui/material';
import type { CommonAreaDto } from "../../../../apiClient";

interface AreaHeaderProps {
    area: CommonAreaDto | null | undefined;
    handleWorkingTime: (openingTime: string, closingTime: string) => { open: boolean; text: string; };
}

export function AreaHeader({ area, handleWorkingTime }: AreaHeaderProps) {
    const theme = useTheme();

    return (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h5" fontWeight={700}>{area?.name ?? 'Área comum'}</Typography>
                    <Typography variant="body2" color="text.secondary">{area?.description}</Typography>
                    <Typography variant="body2" color={handleWorkingTime().open ? theme.palette.success.main : theme.palette.error.main}>{handleWorkingTime().text}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AreaHeader;
