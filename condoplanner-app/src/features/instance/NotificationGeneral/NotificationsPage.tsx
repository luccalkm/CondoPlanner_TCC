import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import PackagePage from "../Package/PackagePage";

export const NotificationPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box p={3} sx={{ width: isMobile ? 'auto' : '70%', margin: '0 auto' }}>
            <PackagePage />
            <Divider sx={{ my: 2 }} />
        </Box>
    );
};
