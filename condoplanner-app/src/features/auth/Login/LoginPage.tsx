import {
    Typography,
    TextField,
    Button,
    Link,
    InputAdornment,
    Box,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useAlertStore } from "../../../stores/alert.store";
import type { LoginRequest } from "../../../apiClient";

export default function LoginPage() {
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();
    const showAlert = useAlertStore((state) => state.showAlert);

    const [request, setRequest] = useState({ email: "", senha: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginRequest: LoginRequest = { ...request };
        const response = await handleLogin(loginRequest);

        if (response.success) {
            showAlert("Login realizado com sucesso!", "success");
            navigate("/condominios");
        } else {
            showAlert(response.message || "Erro ao realizar login.", "error");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                value={request.email}
                onChange={(e) => setRequest({ ...request, email: e.target.value })}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Email color="action" />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                label="Senha"
                fullWidth
                margin="normal"
                type="password"
                value={request.senha}
                onChange={(e) => setRequest({ ...request, senha: e.target.value })}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock color="action" />
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                    mt: 2,
                    py: 1.2,
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: "none",
                }}
            >
                {loading ? "Entrando..." : "Entrar"}
            </Button>

            <Typography
                variant="body2"
                textAlign="center"
                mt={3}
                color="text.secondary"
            >
                Não tem uma conta?{" "}
                <Link href="/register" underline="hover" fontWeight={600}>
                    Registrar
                </Link>
            </Typography>
        </Box>
    );
}
