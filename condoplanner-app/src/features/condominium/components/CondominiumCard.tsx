import React from "react";
import {
    Card,
    CardContent,
    IconButton,
    Tooltip,
    Typography,
    alpha,
    Box,
    useTheme,
    Grid,
    CardActions,
} from "@mui/material";
import { Edit, OpenInNew } from "@mui/icons-material";
import type { CondominioDto } from "../../../apiClient";

interface Props {
    cond: CondominioDto;
    onOpen: (id: number) => void;
    onEdit: (id: number) => void;
}

const CondominiumCard: React.FC<Props> = ({ cond, onOpen, onEdit }) => {
    const theme = useTheme();

    return (
        <Card
            variant="outlined"
            sx={{
                p: 1.5,
                borderRadius: 3,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "0.2s",
                "&:active": { transform: "scale(0.98)" },
                "&:hover": { boxShadow: "0 2px 6px rgba(0,0,0,0.15)" },
                minHeight: 130,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexGrow: 1,
                    pb: "8px !important",
                }}
            >
                <Box sx={{ flex: 1, pr: 1 }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{
                            lineHeight: 1.2,
                            mb: 0.5,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {cond.nome}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            maxWidth: "95%",
                            lineHeight: 1.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {cond.endereco?.logradouro}, {cond.endereco?.cidade},{" "}
                        {cond.endereco?.estado} - {cond.endereco?.cep}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Grid container spacing={2}>
                    <Tooltip title="Visualizar condomínio" arrow>
                        <IconButton
                            size="small"
                            sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                "&:hover": {
                                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                                },
                            }}
                            onClick={() => onOpen(cond.id!)}
                        >
                            <OpenInNew fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar condomínio" arrow>
                        <IconButton
                            size="small"
                            sx={{
                                bgcolor: alpha(theme.palette.success.main, 0.1),
                                "&:hover": {
                                    bgcolor: alpha(theme.palette.success.main, 0.2),
                                },
                            }}
                            onClick={() => onEdit(cond.id!)}
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default CondominiumCard;
