import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

type Area = {
  name?: string | null;
  description?: string | null;
};

interface AreaHeaderProps {
  area: Area | null | undefined;
  canEdit: boolean;
}

export function AreaHeader({ area, canEdit }: AreaHeaderProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 6 }}>
          <Typography variant="h5" fontWeight={700}>{area?.name ?? 'Área comum'}</Typography>
          <Typography variant="body2" color="text.secondary">{area?.description}</Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          {canEdit && (
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" startIcon={<Add />}>Editar / Adicionar</Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AreaHeader;
