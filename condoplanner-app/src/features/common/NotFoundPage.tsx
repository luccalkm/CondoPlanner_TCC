import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/notFound.json";

export const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
                textAlign: "center",
                padding: 2,
            }}
        >
            <Paper variant="outlined" sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ width: "450px", marginBottom: 3 }}>
                    <Lottie animationData={notFoundAnimation} loop={true} />
                </Box>
                <Typography variant="h3" color="textPrimary" gutterBottom>
                    Página não encontrada
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 3 }}>
                    A página que você está procurando não existe ou foi movida.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        textTransform: "none",
                        padding: "10px 20px",
                    }}
                    onClick={() => navigate("/")}
                >
                    Voltar para a Página Inicial
                </Button>
            </Paper>
        </Box>
    );
};