import { createTheme } from "@material-ui/core";

const theme = createTheme({
    typography: {
        fontFamily: [
            'montserrat',
            'sans-serif'
        ].join(","),
    },
    palette: {
        primary: {
            // light: "#3fdeb8",
            // main: "#2dc97e",
            light: "#0E9DA7",
            main: "#006E75",
            dark: "#0C6066"
        },
        secondary: {
            main: "#6C63FF",
        },
        info: {
            light: "#45D2DB",
            main: "#1299A0",
        },
        error: {
            main: "#c42318",
        }
    }
});

export default theme;
