import { Apartment, Settings } from "@mui/icons-material";
import { Paper, BottomNavigation, BottomNavigationAction, useTheme } from "@mui/material";
import { useState } from "react";

type FooterProps = {
    handleNav: (path: string) => void;
};

export const Footer = ({ handleNav }: FooterProps) => {
    const [navValue, setNavValue] = useState(0);
    const theme = useTheme();

    return (
        <Paper
            elevation={1}
            sx={{
                position: "fixed",
                bottom: 25,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                maxWidth: 420,
                borderRadius: 4,
                overflow: "hidden",
                zIndex: 1200,
                bgcolor: theme.palette.primary.main,
            }}
        >
            <BottomNavigation
                value={navValue}
                onChange={(_, newValue) => {
                    setNavValue(newValue);
                    if (newValue === 1) handleNav("/condominios");
                    if (newValue === 2) handleNav("/configuracoes");
                }}
                showLabels
                sx={{
                    bgcolor: "transparent",
                    "& .MuiBottomNavigationAction-root": {
                        color: "rgba(255,255,255,0.6)",
                    },
                    "& .Mui-selected, & .Mui-selected .MuiSvgIcon-root": {
                        color: "#fff !important",
                    },
                }}
            >
                <BottomNavigationAction onClick={() => handleNav("/condominios")} label="Condomínios" icon={<Apartment />} />
                <BottomNavigationAction onClick={() => handleNav("/configuracoes")} label="Config" icon={<Settings />} />
            </BottomNavigation>
        </Paper>
    );
};
