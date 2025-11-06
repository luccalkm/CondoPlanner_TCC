
import { Grid, Card, Typography } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {

    if (localStorage.getItem("token"))
        return <Navigate to={"/condominios"} replace />
        
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '100vh',
                minWidth: '100vw',
                background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
            }}
        >
            <Card sx={{ p: 4, width: 400, boxShadow: 6, borderRadius: 3 }}>
                <Typography variant="h5" mb={2} fontWeight={600} textAlign="center">
                    CondoPlanner
                </Typography>
                <Outlet />
            </Card>
        </Grid>
    );
}