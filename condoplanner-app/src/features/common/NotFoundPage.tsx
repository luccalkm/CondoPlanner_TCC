import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

export const NotFoundPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                padding: 2,
            }}
        >
            <Box sx={{ width: "300px", marginBottom: 3 }}>
                <Lottie animationData={{}} loop={true} />
            </Box>
            <Typography variant="h3" color="textPrimary" gutterBottom>
                404 - Página Não Encontrada
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 3 }}>
                A página que você está procurando não existe ou foi movida.
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                    textTransform: "none",
                    padding: "10px 20px",
                }}
            >
                Voltar para a Página Inicial
            </Button>
        </Box>
    );
};