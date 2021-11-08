import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@mui/material";
import FormBackground2 from "../../assets/FormBackground2";
import theme from "../../theme/theme";
import Form from "../Form";

const useStyles = makeStyles(() => ({
    formBackground: {
        position: "absolute",
        bottom: 0,
        minWidth: "1875px",
        width: "100vw",
        height: "calc(100vw * 820 / 1441)",
        minHeight: "calc(1875px * 820 / 1441)",
    }
}));

const App = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
            }}>
                <FormBackground2 className={classes.formBackground} />
                <Form />
            </div>
        </ThemeProvider>
    );
}

export default App;