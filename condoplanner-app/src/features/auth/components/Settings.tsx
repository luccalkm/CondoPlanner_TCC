import { Button, Container, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../../hooks/useAuth";

const Settings = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { logout } = useAuth();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            {isMobile && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={logout}
                >
                    Logout
                </Button>
            )}
        </Container>
    );
};

export default Settings;