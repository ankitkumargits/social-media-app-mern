import { Box, Typography, useTheme, useMediaQuery,  } from "@mui/material";
import Form from "./Form";



const LoginPage = () => {

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box>
            <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
                <Typography
                        fontWeight="bold"
                        fontSize="32px"
                        color="primary"
                >
                        SociaPedia
                    </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? "50%": "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="2.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography
                    variant="h5"
                    fontWeight="500"
                    sx={{
                        mb: "1.5rem"
                    }}
                    textAlign="center"
                >
                    Welcome to SocioPedia, the Socia Media for SocioPaths 
                </Typography>
                <Form></Form>
            </Box>

        </Box>
    )
}

export default LoginPage;