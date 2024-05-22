import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";


const AdvertWidget = () => {

    const { palette } = useTheme();
    const dark = palette?.neutral?.dark;
    const main = palette?.neutral?.main;
    const medium = palette?.neutral?.medium;

    return (
        <>
            <WidgetWrapper>
                <FlexBetween>
                    <Typography color={dark} variant="h5" fontWeight="500">
                        Spansored
                    </Typography>
                    <Typography color={medium} >
                        Create Ad
                    </Typography>
                </FlexBetween>
                <img
                    width="100%"
                    height="auto"
                    alt="advert"
                    src={`http://localhost:3001/assets/info4.jpeg`}
                    style={{
                        borderRadius: '0.75rem',
                        m: "0.75rem 0"
                    }}
                />
                <FlexBetween>
                    <Typography color={main}>
                        Mikocosmetics
                    </Typography>
                    <Typography color={medium}>
                        mikocosmetics.com
                    </Typography>
                </FlexBetween>
                <Typography color={medium} m="0.5rem 0">
                    Your pathway to stunning amd immaculate beauty and made sure your skin is exfolaiting skin and shinning like light.
                </Typography>
            </WidgetWrapper>
        </>
    )
}

export default AdvertWidget