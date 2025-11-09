import React from "react";
import { Chip, alpha, useTheme } from "@mui/material";
import {
    Home,
    SupervisorAccount,
    AdminPanelSettings,
    DoorFront,
    HelpOutline,
} from "@mui/icons-material";
import type { ETipoUsuario as ETipoUsuarioType } from "../../../apiClient";

type AcceptedValue = ETipoUsuarioType | string | undefined;

interface UserTypeMeta {
    label: string;
    color: string;
    icon: React.ReactNode;
}

const map: Record<string, UserTypeMeta> = {
    MORADOR: {
        label: "Morador",
        color: "#1976d2",
        icon: <Home fontSize="small" />,
    },
    SINDICO: {
        label: "Síndico",
        color: "#6a1b9a",
        icon: <SupervisorAccount fontSize="small" />,
    },
    PORTEIRO: {
        label: "Porteiro",
        color: "#00897b",
        icon: <DoorFront fontSize="small" />,
    },
    ADMINISTRADOR: {
        label: "Administrador",
        color: "#d84315",
        icon: <AdminPanelSettings fontSize="small" />,
    },
};

function resolveMeta(value: AcceptedValue): UserTypeMeta {
    if (!value) {
        return {
            label: "Não definido",
            color: "#607d8b",
            icon: <HelpOutline fontSize="small" />,
        };
    }
    const upper = String(value).toUpperCase();
    return (
        map[upper] || {
            label: upper
                .split("_")
                .map((p) => p[0] + p.slice(1).toLowerCase())
                .join(" "),
            color: "#455a64",
            icon: <HelpOutline fontSize="small" />,
        }
    );
}

interface Props {
    value: AcceptedValue;
    size?: "small" | "medium";
    clickable?: boolean;
    outlined?: boolean;
}

export const UserTypeChip: React.FC<Props> = ({
    value,
    size = "small",
    clickable = false,
    outlined = false,
}) => {
    const theme = useTheme();
    const meta = resolveMeta(value);

    const baseColor = meta.color;
    const bg = outlined
        ? alpha(baseColor, 0.08)
        : alpha(baseColor, 0.12);

    const hoverBg = outlined
        ? alpha(baseColor, 0.16)
        : alpha(baseColor, 0.20);

    const textColor =
        theme.palette.mode === "dark"
            ? alpha("#fff", 0.85)
            : theme.palette.grey[900];

    return (
        <Chip
            size={size}
            clickable={clickable}
            label={meta.label}
            sx={{
                fontWeight: 600,
                letterSpacing: 0.4,
                color: textColor,
                background: bg,
                border: `1px solid ${alpha(baseColor, 0.35)}`,
                backdropFilter: "blur(6px) saturate(160%)",
                WebkitBackdropFilter: "blur(6px) saturate(160%)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                transition: "background .25s ease, box-shadow .25s ease, transform .25s ease",
                ".MuiChip-icon": {
                    color: alpha(baseColor, theme.palette.mode === "dark" ? 0.6 : 0.9),
                    ml: 0.5,
                },
                "&:hover": {
                    background: hoverBg,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                    transform: "translateY(-2px)",
                },
                "&:active": {
                    transform: "translateY(0)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                },
                "& .MuiTouchRipple-root": {
                    color: alpha(baseColor, 0.3),
                },
            }}
        />
    );
};

export default UserTypeChip;
