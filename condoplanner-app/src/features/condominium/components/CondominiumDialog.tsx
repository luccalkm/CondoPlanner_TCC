import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import CreateOrEditCondominium from "./CreateOrEditCondominium";

interface Props {
    open: boolean;
    onClose: () => void;
    fullScreen?: boolean;
    condominiumId?: number | null;
}

const CondominiumDialog: React.FC<Props> = ({ open, onClose, fullScreen, condominiumId }) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth>
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pr: 2,
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    Adicionar Condomínio
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent
                sx={{
                    p: { xs: 2, sm: 3 },
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <CreateOrEditCondominium 
                    onClose={onClose}
                    condominiumId={condominiumId} 
                />
            </DialogContent>
        </Dialog>
    );
};

export default CondominiumDialog;
