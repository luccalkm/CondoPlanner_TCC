import { Grid, Paper, Typography } from '@mui/material';

type Area = {
    name?: string | null;
    description?: string | null;
};

interface AreaHeaderProps {
    area: Area | null | undefined;
}

export function AreaHeader({ area }: AreaHeaderProps) {
    return (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12 }}>
                    <Typography variant="h5" fontWeight={700}>{area?.name ?? 'Área comum'}</Typography>
                    <Typography variant="body2" color="text.secondary">{area?.description}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AreaHeader;
