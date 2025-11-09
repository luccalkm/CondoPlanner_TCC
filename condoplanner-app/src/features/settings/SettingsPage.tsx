import { AccountBox } from "@mui/icons-material";
import { Divider, Grid, Paper, Typography } from "@mui/material";

// type SettingsPageProps = {

// };

export const SettingsPage = () => {
    return (
        <Paper elevation={3} sx={{ m: 3, p: 3 }}>
            <Grid size={12} container alignItems={'center'} gap={2}>
                <AccountBox />
                <Typography variant="h6" gutterBottom sx={{ m: 0}}>
                    Perfil
                </Typography>
            </Grid>
            <Typography variant="subtitle2" color="textSecondary">
                Aqui você pode ajustar as configurações do aplicativo.
            </Typography>
            <Divider sx={{ my: 2 }} />
        </Paper>
    );
};