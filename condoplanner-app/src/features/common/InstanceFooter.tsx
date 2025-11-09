import { Article, MeetingRoom, Settings, SpaceDashboard } from "@mui/icons-material";
import { Paper, BottomNavigation, BottomNavigationAction, useTheme } from "@mui/material";
import { useState } from "react";

type InstanceFooterProps = {
    handleNav: (path: string) => void;
    onLeave: () => void;
    basePath: string;
};

export const InstanceFooter = ({ handleNav, onLeave, basePath }: InstanceFooterProps) => {
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
                width: "min(480px, calc(100% - 32px))",
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
                    if (newValue === 0) handleNav(`${basePath}/areas`);
                    if (newValue === 1) handleNav(`${basePath}/comunicados`);
                    if (newValue === 2) handleNav(`${basePath}/configuracoes`);
                    if (newValue === 3) onLeave();
                }}
                showLabels
                sx={{
                    bgcolor: "transparent",
                    "& .MuiBottomNavigationAction-root": {
                        color: "rgba(255,255,255,0.75)",
                        minWidth: 0,
                        flex: 1,
                    },
                    "& .Mui-selected, & .Mui-selected .MuiSvgIcon-root": {
                        color: "#fff !important",
                    },
                    px: 1,
                }}
            >
                <BottomNavigationAction label="Áreas" icon={<SpaceDashboard />} />
                <BottomNavigationAction label="Comunicados" icon={<Article />} />
                <BottomNavigationAction label="Config" icon={<Settings />} />
                <BottomNavigationAction label="Sair" icon={<MeetingRoom />} />
            </BottomNavigation>
        </Paper>
    );
};
