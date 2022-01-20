import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Paper, Table, TableBody, TableCell, tableCellClasses, tableClasses, TableContainer, TableFooter, TableHead, TableRow, tableRowClasses, Typography } from "@mui/material";
import React, { useRef, useEffect } from "react";
import theme from "../../theme/theme";
import { IBalance, IFirstPaymentInfo } from "../../utils/types";

const useStyles = makeStyles(() => ({
    outerContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
    },
    innerContainer: {
        width: "95%",
        maxWidth: "650px!important",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateY(-50%) translateX(-50%)",
        borderRadius: "5px",
        border: "1px solid " + theme.palette.info.light,
        backgroundColor: "#e3e4e3",
        padding: ({ isMobile }: { isMobile: boolean }) => isMobile ? "15px 0px" : "15px 30px",
    },
    title: {
        color: theme.palette.info.main,
    },
    button: {
        "&.MuiButton-root": {
            padding: "5px 20px",
            textTransform: "capitalize",
            border: "1px solid " + theme.palette.info.light,
            fontSize: "18px",
            background: "linear-gradient(95.03deg, #3FDEB8 0%, #45D2DB 100%)",
            margin: ({ isMobile }: { isMobile: boolean }) => isMobile ? "0px 15px" : "0",
        }
    },
    tableHead: {
        [`&.${tableCellClasses.head}`]: {

        }
    },
    table: {
        [`&.${tableClasses.root}`]: {
            padding: "0 15px",
            borderSpacing: "0 8px",
            borderCollapse: "separate",
            fontFamily: theme.typography.fontFamily
        }
    },
    headerTableRow: {
        [`& .${tableCellClasses.root}`]: {
            border: "none",
            padding: "0 16px",
            color: "#717171",
        },
    },
    bodyTableRow: {
        [`&.${tableRowClasses.root}`]: {
            border: "none",
            outline: "white solid",
            outlineWidth: "1px",
            borderRadius: "5px",
        },
        [`& .${tableCellClasses.root}`]: {
            border: 0,
            color: "#8e8e8e",
            fontSize: "15px",
            fontWeight: "500"
        }
    },
    footerTableRow: {
        [`& .${tableCellClasses.root}`]: {
            border: 0,
            padding: "8px 16px",
            color: "#2A8641",
            fontSize: "15px",
            fontWeight: "500",
        },
    }
}));

const pad = (text: string | number) => String(text).padStart(2, "0");

const formatDate = (date: string | Date) => {
    const dateObject = new Date(date);
    return `${pad(dateObject.getDate())}/${pad(dateObject.getMonth() + 1)}/${dateObject.getFullYear()}`;
}

const formatValue = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

interface Props {
    title: string;
    previousStep: () => void;
    nextStep: () => void;
    balance: IBalance[];
    firstPaymentInfo?: IFirstPaymentInfo;
}

const BalanceTable = React.forwardRef<HTMLDivElement, Props>(({
    title,
    previousStep,
    nextStep,
    balance,
    firstPaymentInfo,
}, ref) => {
    const isMobile = useMediaQuery("(max-width:520px)");
    const classes = useStyles({
        isMobile,
    });
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setTimeout(() => {
            buttonRef && buttonRef?.current && buttonRef.current.focus();
        }, 1000);
    }, []);

    return (
        <div ref={ref} className={classes.outerContainer}>
            <Grid container className={classes.innerContainer} flexDirection="column" justifyContent="space-between">
                <Typography
                    className={classes.title}
                    component="h3"
                    variant="h5"
                    textAlign={isMobile ? "center" : undefined}
                >{title}</Typography>
                <TableContainer sx={{ boxShadow: "none", margin: "10px 0", background: "#DFE0E0", borderRadius: "10px" }} component={Paper}>
                    <Table className={classes.table} aria-label="tabela de saldo fgts">
                        <TableHead>
                            <TableRow className={classes.headerTableRow}>
                                <TableCell>Dados da Operação</TableCell>
                                <TableCell>Valor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {balance.map((row, index) => (
                                <TableRow key={index} className={classes.bodyTableRow}>
                                    <TableCell>{formatDate(row.date)}</TableCell>
                                    <TableCell>{formatValue(row.value)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className={classes.footerTableRow}>
                                <TableCell>Total</TableCell>
                                <TableCell>{formatValue(balance.reduce((acc, row) => acc + row.value, 0))}</TableCell>
                            </TableRow>
                            {firstPaymentInfo && (
                                <>
                                    <TableRow className={classes.footerTableRow}>
                                        <TableCell>Valor Liberado</TableCell>
                                        <TableCell>{formatValue(firstPaymentInfo.mainValue)}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.footerTableRow}>
                                        <TableCell>IOF</TableCell>
                                        <TableCell>{formatValue(firstPaymentInfo.iof)}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.footerTableRow}>
                                        <TableCell>Primeiro Vencimento</TableCell>
                                        <TableCell>{formatDate(firstPaymentInfo.dueDate)}</TableCell>
                                    </TableRow>
                                </>
                            )}
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Grid container direction="row" justifyContent="space-between">
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
                        ref={buttonRef}
                    >
                        Próximo
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
})

export default BalanceTable