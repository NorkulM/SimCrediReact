import { useMediaQuery } from "@material-ui/core";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getBalance, makeProposal } from "../../services";
import { clearUndefinedFromObject, hideContrateTitle, INITIAL_FORM_DATA, scrollToEnableFGTSInfo, showContrateTitle, validateField } from "../../utils";
import { IBalance, IFormData, IQuestionsWithDirection, IFirstPaymentInfo } from "../../utils/types";
import BalanceTable from "../BalanceTable/BalanceTable";
import FormQuestion from "../FormQuestion";
import StepsTransition from "../StepsTransition";
import QUESTIONS from "./questions";

const START_STEP: keyof IFormData = process.env.NODE_ENV === "development" ? "agreeWithTerms" : "enabledFGTS";

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
    const [questions, setQuestions] = useState<IQuestionsWithDirection[]>(QUESTIONS.map((question, index) => ({
        ...question,
        direction: !index ? "down" : "up",
    })));
    const isMobile = useMediaQuery("(max-width:520px)");

    const [currentStep, setCurrentStep] = useState(() => {
        const index = questions.findIndex(question => question.id === START_STEP);
        return index > -1 ? index : 0;
    });

    useEffect(() => {
        if (!isMobile) return;

        if (questions[currentStep].id === "table") {
            hideContrateTitle();
        } else {
            showContrateTitle();
        }
    }, [currentStep, questions, isMobile]);

    const [balance, setBalance] = useState<IBalance[]>([]);
    const [firstPaymentInfo, setFirstPaymentInfo] = useState<IFirstPaymentInfo>();

    const updateFormData = (id: keyof IFormData) => (value: string) => {
        setFormData(state => ({
            ...state,
            [id]: value,
        }));
    }

    // React.useEffect(() => {
    //     console.log("new data:", formData);
    // }, [formData]);

    const getBalanceFromAPI = async () => {
        setIsLoading(true);
        const result = await getBalance({
            name: formData.name,
            ddd: formData.telephone.split(" ")[0].replace(/[()]/g, ""),
            telephone: formData.telephone.split(" ")[1].replace("-", ""),
            birthday: formData.birthday,
            uf: formData.uf,
            cpf: formData.cpf,
        });
        if (!result.error) {
            setBalance(result.result);
            setFirstPaymentInfo(result.firstPaymentInfo);
            setIsLoading(false);
            return true;
        }

        switch (result.errorCode) {
            case 1: // saque nao habilitado
                setQuestions(state => state.map(question => ({
                    ...question,
                    error: question.id === "cpf" ? result.errorMessage : undefined,
                    nextButtonMessage: question.id === "cpf" ? "Habilitar Agora" : undefined,
                    nextStep: question.id === "cpf" ? () => {
                        scrollToEnableFGTSInfo();
                        setQuestions(state => state.map(question => ({
                            ...question,
                            nextStep: question.id === "cpf" ? undefined : question.nextStep,
                            nextButtonMessage: question.id === "cpf" ? "Consultar Saldo" : question.nextButtonMessage,
                        })).map(clearUndefinedFromObject));
                    } : undefined,
                })));
                break;
            case 2: // sem saldo
            default:
                setQuestions(state => state.map(question => ({
                    ...question,
                    error: question.id === "cpf" ? result.errorMessage : undefined,
                    blockNextButton: question.id === "cpf",
                })));
        }
        setIsLoading(false);
        return false;
    }

    const nextStep = async () => {
        const { id } = questions[currentStep];
        const { error } = validateField(id, formData[id] || "");
        if (error) {
            setQuestions(state => state.map((question, index) => ({
                ...question,
                error: index === currentStep ? error : undefined,
            })));
            return;
        }

        if (questions[currentStep].id === "cpf") {
            const shouldContinue = await getBalanceFromAPI();
            if (!shouldContinue) {
                return;
            }
        }

        if (questions[currentStep].id === "agreeWithTerms") {
            await makeProposal({
                name: formData.name,
                ddd: formData.telephone.split(" ")[0].replace(/[()]/g, ""),
                telephone: formData.telephone.split(" ")[1].replace("-", ""),
                uf: formData.uf,
                birthday: formData.birthday,
                cpf: formData.cpf,
                motherName: formData.nomeMae,
                address: formData.address,
                neighbourhood: formData.neighbourhood,
                cep: formData.zipCode,
                rg: formData.identificationNumber,
                houseNumber: formData.number,
                accountAgency: formData.agency,
                accountBank: formData.bank,
                accountNumber: formData.accountNumber,
                accountType: formData.accountType,
                city: formData.city,
            });
        }

        setCurrentStep(state => (
            state + 1 < questions.length ? state + 1 : state
        ));
        setTimeout(() => {
            setQuestions(state => state.map((question, index) => ({
                ...question,
                error: undefined,
                direction: index <= currentStep ? "down" : "up",
            })));
        });
    };

    const previousStep = () => {
        setQuestions(state => state.map((question, index) => ({
            ...question,
            direction: index >= currentStep ? "up" : "down",
            error: undefined,
        })));
        setTimeout(() => {
            setCurrentStep(state => (
                state === 0 ? 0 : state - 1
            ));
        });
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}
        >
            {questions.map((question, index) => (
                <StepsTransition
                    key={index}
                    index={index}
                    currentStep={currentStep}
                    direction={question.direction}
                >
                    {question.id !== "table" ? (
                        <div style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                        }}>
                            <div
                                style={{
                                    width: "90%",
                                    maxWidth: "500px",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translateY(-50%) translateX(-50%)",
                                }}
                            >
                                {question.id !== "success" ? (
                                    <FormQuestion
                                        nextStep={nextStep}
                                        previousStep={previousStep}
                                        focused={index === currentStep}
                                        updateFormData={updateFormData(question.id)}
                                        value={formData[question.id] || ""}
                                        isLoading={isLoading}
                                        {...question}
                                    />
                                ) : (
                                    <Typography
                                        fontWeight="600"
                                        color="white"
                                        variant="h5"
                                        component="h3"
                                        textAlign="center"
                                    >
                                        Suas informações serão analisadas, em breve entraremos em contato. Muito Obrigado!
                                    </Typography>
                                )}
                            </div>
                        </div>
                    ) : (
                        <BalanceTable
                            title={question.title}
                            previousStep={previousStep}
                            nextStep={nextStep}
                            balance={balance}
                            firstPaymentInfo={firstPaymentInfo}
                        />
                    )}
                </StepsTransition>
            ))}
        </div>
    )
}

export default Form