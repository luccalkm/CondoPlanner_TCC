import { Apartment, Logout, Settings } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

type HeaderProps = {
    handleNav: (path: string) => void;
};

export const Header = ({ handleNav }: HeaderProps) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        handleNav("/login");
    };

    return (
        <AppBar position="fixed" color="primary" elevation={2}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    CondoPlanner
                </Typography>
                <IconButton color="inherit" onClick={() => handleNav("/condominios")}>
                    <Apartment />
                </IconButton>
                <IconButton color="inherit" onClick={() => handleNav("/configuracoes")}>
                    <Settings />
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                    <Logout />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};