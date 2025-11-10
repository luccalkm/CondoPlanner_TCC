import { Apartment, ManageAccounts } from "@mui/icons-material";
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
                bottom: { xs: "max(16px, env(safe-area-inset-bottom))", sm: 25 },
                left: 0,
                right: 0,
                mx: "auto",
                width: "min(420px, calc(100% - 32px))",
                borderRadius: 4,
                overflow: "hidden",
                zIndex: 1200,
                bgcolor: theme.palette.primary.main,
                boxSizing: "border-box",
            }}
        >
            <BottomNavigation
                value={navValue}
                onChange={(_, newValue) => {
                    setNavValue(newValue);
                    if (newValue === 0) handleNav("/condominios");
                    if (newValue === 1) handleNav("/configuracoes");
                }}
                showLabels
                sx={{
                    bgcolor: "transparent",
                    "& .MuiBottomNavigationAction-root": {
                        color: "rgba(255,255,255,0.6)",
                        minWidth: 0,
                        flex: 1,
                    },
                    "& .Mui-selected, & .Mui-selected .MuiSvgIcon-root": {
                        color: "#fff !important",
                    },
                    px: 1,
                }}
            >
                {/* Remove onClick para evitar navegação duplicada */}
                <BottomNavigationAction icon={<Apartment />} />
                <BottomNavigationAction icon={<ManageAccounts />} />
            </BottomNavigation>
        </Paper>
    );
};
