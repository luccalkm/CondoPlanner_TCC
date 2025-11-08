import { Home, Apartment, Settings } from "@mui/icons-material";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";

type FooterProps = {
    handleNav: (path: string) => void;
};

export const Footer = ({ handleNav }: FooterProps) => {
    const [navValue, setNavValue] = useState(0);

    return (
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={6}>
            <BottomNavigation
                value={navValue}
                onChange={(_, newValue) => {
                    setNavValue(newValue);
                    if (newValue === 0) handleNav("/home");
                    if (newValue === 1) handleNav("/condominios");
                    if (newValue === 2) handleNav("/configuracoes");
                }}
                showLabels
            >
                <BottomNavigationAction label="Home" icon={<Home />} />
                <BottomNavigationAction label="Condomínios" icon={<Apartment />} />
                <BottomNavigationAction label="Config" icon={<Settings />} />
            </BottomNavigation>
        </Paper>
    );
};