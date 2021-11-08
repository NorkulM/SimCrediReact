import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    Autocomplete,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useRef, useState } from "react";
import { IOption, IQuestion } from "../../utils/types";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
    label: {
        // color: "blue",
    },
    container: {
        height: "100%",
    },
    input: {
        "&.MuiInput-root": {
            fontWeight: "600",
            color: "#3d3d3d",
            fontSize: "22px",
        }
    },
    textField: {
        "&.MuiFormControl-root": {
            marginTop: "16px",
        },
        "& .MuiInput-root": {
            fontWeight: "600",
            color: "#3d3d3d",
            fontSize: "22px",
        }
    },
    button: {
        "&.MuiButton-root": {
            padding: "5px 20px",
            textTransform: "capitalize",
            border: "1px solid white",
            fontSize: "18px",
            background: "linear-gradient(95.03deg, #3FDEB8 0%, #45D2DB 100%)",
        }
    }
}));

interface Props extends IQuestion {
    focused: boolean;
    updateFormData: (value: string) => void;
    value: string;
    isLoading?: boolean;
}

const FormQuestion = ({
    title,
    id,
    type,
    helperText,
    previousStep,
    nextStep,
    placeholder,
    focused,
    updateFormData,
    value,
    error,
    MaskInput,
    options,
    previousButtonMessage,
    nextButtonMessage,
    blockNextButton,
    isLoading,
}: Props) => {
    const classes = useStyles();
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectValue, setSelectValue] = useState<IOption | null>(null);

    const onKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            !isLoading && !blockNextButton && nextStep && nextStep();
        }
    }

    const onChangeHandler = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData(value);
    }

    const onSelectHandler = (event: any, value: IOption | null) => {
        updateFormData(value?.value || "");
    }

    useEffect(() => {
        if (type === "select") {
            setSelectValue((options || []).find(option => option.value === value) || null);
        }
    }, [value, type, options]);

    useEffect(() => {
        if (focused) {
            setTimeout(() => {
                inputRef?.current?.focus();
            }, 1000);
        } else if (error) {
            inputRef?.current?.focus();
        }
    }, [focused, error]);

    switch (type) {
        case "yesOrNo":
            return (
                <Grid
                    container
                    className={classes.container}
                    direction="column"
                    justifyContent="space-between"
                >
                    <Typography fontWeight="600" color="white" variant="h5" component="h3">{title}</Typography>
                    <Grid sx={{ marginTop: "20px" }} container direction="row" justifyContent="space-between">
                        <Button
                            className={classes.button}
                            color="info"
                            variant="contained"
                            onClick={previousStep}
                        >
                            {previousButtonMessage || "Voltar"}
                        </Button>
                        <Button
                            className={classes.button}
                            color="info"
                            variant="contained"
                            onClick={nextStep}
                        >
                            {nextButtonMessage || "Avançar"}
                        </Button>
                    </Grid>
                </Grid>
            )
        case "select":
            return (
                <Grid
                    container
                    className={classes.container}
                    direction="column"
                    justifyContent="space-between"
                >
                    <FormControl variant="standard"  fullWidth error={Boolean(error)}>
                        <Typography
                            fontWeight="600"
                            color="white"
                            variant="h5"
                            component="label"
                            htmlFor={`${id}-select`}
                        >
                            {title} *
                        </Typography>
                       <Autocomplete
                            id={`${id}-select`}
                            placeholder={placeholder}
                            aria-describedby={`${id}-helper-text`}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            value={selectValue}
                            onKeyPress={onKeyPress}
                            openOnFocus
                            autoSelect
                            options={options || []}
                            getOptionLabel={(option) => option.title}
                            onChange={onSelectHandler}
                            renderInput={(params) => <TextField inputRef={inputRef} className={classes.textField} {...params} variant="standard" />}
                            noOptionsText="Nenhum estado corresponde à pesquisa."
                        />
                        {(error || helperText) && (
                            <FormHelperText id={`${id}-helper-text`}>{error || helperText}</FormHelperText>
                        )}
                    </FormControl>
                    <Grid sx={{ marginTop: "20px" }} container direction="row" justifyContent="space-between">
                        <Button
                            className={classes.button}
                            color="info"
                            variant="contained"
                            onClick={previousStep}
                        >
                            Voltar
                        </Button>
                        <Button
                            className={classes.button}
                            color="info"
                            variant="contained"
                            onClick={nextStep}
                        >
                            Avançar
                        </Button>
                    </Grid>
                </Grid>
            );
        case "text":
        case "number":
        default:
            return (
                <Grid
                    container
                    className={classes.container}
                    direction="column"
                    justifyContent="space-between"
                >
                    <FormControl fullWidth error={Boolean(error)}>
                        <Typography
                            fontWeight="600"
                            color="white"
                            variant="h5"
                            component="label"
                            htmlFor={`${id}-input`}
                        >
                            {title} *
                        </Typography>
                       <Input
                            inputRef={inputRef}
                            className={classes.input}
                            id={`${id}-input`}
                            placeholder={placeholder}
                            aria-describedby={`${id}-helper-text`}
                            onKeyPress={onKeyPress}
                            value={value}
                            onChange={onChangeHandler}
                            // @ts-ignore
                            inputComponent={MaskInput}
                        />
                        {(error || helperText) && (
                            <FormHelperText sx={{ fontSize: "0.9rem" }} id={`${id}-helper-text`}>{error || helperText}</FormHelperText>
                        )}
                    </FormControl>
                    <Grid sx={{ marginTop: "20px" }} container direction="row" justifyContent="space-between">
                        <Button
                            className={classes.button}
                            color="info"
                            variant="contained"
                            onClick={previousStep}
                            disabled={isLoading}
                        >
                            Voltar
                        </Button>
                        <Box sx={{ position: "relative" }}>
                            <Button
                                className={classes.button}
                                color="info"
                                variant="contained"
                                onClick={nextStep}
                                aria-describedby="next-button-loading"
                                aria-busy={isLoading}
                                disabled={isLoading || blockNextButton}
                            >
                                {nextButtonMessage || "Avançar"}
                            </Button>
                            {isLoading && (
                                <CircularProgress
                                    id="next-button-loading"
                                    size={30}
                                    sx={{
                                        position: "absolute",
                                        top: "calc(50% - 15px)",
                                        left: "calc(50% - 15px)",
                                    }}
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            )
    }
}

export default FormQuestion;
