import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/auth.store";

export const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const authStore = useAuthStore();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            authStore.setUser(JSON.parse(user));
        }
    }, []);

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ backgroundColor: "#fafafa" }}>
            {!isMobile && <Header handleNav={navigate} />}

            <Box
                sx={{
                    mt: !isMobile ? 8 : 0,
                    mb: isMobile ? 8 : 0,
                    width: '100vw',
                    marginX: 'auto',
                }}
            >
                <Outlet />
            </Box>

            {isMobile && <Footer handleNav={navigate} />}
        </Box>
    );
};
