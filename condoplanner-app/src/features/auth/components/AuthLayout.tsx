import { Grid, Card, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (localStorage.getItem("token")) return <Navigate to={"/condominios"} replace />;

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "100vh",
                width: "100vw",
                px: { xs: 2, sm: 0 },
                background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
            }}
        >
            <Card
                sx={{
                    p: { xs: 3, sm: 5 },
                    width: { xs: "100%", sm: 420 },
                    borderRadius: 4,
                    boxShadow: 6,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Box mb={3} textAlign="center">
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        fontWeight={700}
                        color="primary"
                    >
                        CondoPlanner
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5, fontSize: { xs: 13, sm: 14 } }}
                    >
                        Acesse sua conta ou crie um novo cadastro
                    </Typography>
                </Box>

                <Outlet />
            </Card>
        </Grid>
    );
}