import { useState } from "react"
import FormQuestion from "../FormQuestion";
import StepsTransition from "../StepsTransition";
import TelephoneMaskedInput from "../TelephoneMaskedInput";
import CPFMaskedInput from "../CPFMaskedInput";
import UF_LIST from "./uf-list";
import BANK_LIST from "./bank-list";
import DateMaskedInput from "../DateMaskedInput";
import { validateField } from "../../utils";
import { IBalance, IFormData, IQuestion, IQuestionsWithDirection } from "../../utils/types";
import { getBalance, makeProposal } from "../../services";
import BalanceTable from "../BalanceTable/BalanceTable";
import CEPMaskedInput from "../CEPMaskedInput";
import { Typography } from "@mui/material";
import AccountNumberMaskedInput from "../AccountNumberMaskedInput";

// const INITIAL_FORM_DATA: IFormData = {
//     accountNumber: "3542475705",
//     accountType: "Conta Corrente",
//     address: "Rua Antônio Azevedo Martins",
//     agency: "0100",
//     agreeWithTerms: "",
//     bank: "041",
//     birthday: "14/05/1989",
//     city: "Sapucaia do Sul",
//     complement: "Casa",
//     cpf: "01622094018",
//     identificationNumber: "26722960",
//     name: "Dionathan Dos Santos Soares",
//     neighbourhood: "Walderez",
//     nomeMae: "Teresinha Dos Santos",
//     number: "80",
//     telephone: "(51) 99597-9343",
//     uf: "RS",
//     zipCode: "93226-507",
// }

const INITIAL_FORM_DATA: IFormData = {
    accountNumber: "",
    accountType: "",
    address: "",
    agency: "",
    agreeWithTerms: "",
    bank: "",
    birthday: "",
    city: "",
    complement: "",
    cpf: "",
    identificationNumber: "",
    name: "",
    neighbourhood: "",
    nomeMae: "",
    number: "",
    telephone: "",
    uf: "",
    zipCode: "",
}


const scrollToEnableFGTSInfo = () => {
    (window as any)?.receiveCustomMsg?.("scrollToTop");
}

const QUESTIONS: IQuestion[] = [
    {
        id: "enabledFGTS",
        title: "Você solicitou o saque aniversário e autorizou o banco Safra no app do FGTS?",
        type: "yesOrNo",
        previousStep: scrollToEnableFGTSInfo,
        previousButtonMessage: "Ainda Não",
        nextButtonMessage: "Sim"
    },
    {
        id: "name",
        title: "Qual é o seu nome?",
        type: "text",
        placeholder: "Escreva aqui..."
    },
    {
        id: "telephone",
        title: "Qual é o seu telefone?",
        type: "text",
        placeholder: "(11) 99999-9999",
        MaskInput: TelephoneMaskedInput,
    },
    {
        id: "uf",
        title: "Em qual estado você mora?",
        type: "select",
        options: UF_LIST,
    },
    {
        id: "birthday",
        title: "Qual é a sua data de nascimento?",
        type: "text",
        MaskInput: DateMaskedInput,
        placeholder: "01/01/1980",
    },
    {
        id: "cpf",
        title: "E agora, para consultar o seu saldo, digite o seu CPF",
        type: "text",
        MaskInput: CPFMaskedInput,
        nextButtonMessage: "Consultar Saldo",
    },
    {
        id: "table",
        title: "SALDO DISPONÍVEL",
        type: "text",
    },
    {
        id: "nomeMae",
        type: "text",
        title: "Vamos prosseguir para o resgate do seu FGTS! Qual é o nome da sua mãe?"
    },
    {
        id: "zipCode",
        type: "text",
        title: "E agora, por favor, digite o seu CEP.",
        MaskInput: CEPMaskedInput,
    },
    {
        id: "city",
        type: "text",
        title: "Qual é o nome da sua cidade?",
        placeholder: "São Paulo"
    },
    {
        id: "address",
        type: "text",
        title: "Por favor, agora digite o seu endereço."
    },
    {
        id: "neighbourhood",
        type: "text",
        title: "Qual é o seu bairro?"
    },
    {
        id: "number",
        type: "text",
        title: "Qual é o número de sua residência?"
    },
    {
        id: "accountType",
        type: "select",
        title: "Vamos prosseguir para os dados bancários! Qual é o tipo da sua conta?",
        options: [{
            title: "Conta Corrente",
            value: "Conta Corrente",
        }, {
            title: "Conta Poupança",
            value: "Poupança"
        }],
    },
    {
        id: "bank",
        type: "select",
        title: "Qual é o seu banco?",
        options: BANK_LIST,
    },
    {
        id: "agency",
        type: "text",
        title: "Qual é o número da sua agência?"
    },
    {
        id: "accountNumber",
        type: "text",
        title: "Qual é o número da sua conta com o dígito?",
        MaskInput: AccountNumberMaskedInput,
    },
    {
        id: "identificationNumber",
        type: "text",
        title: "Qual é o seu RG?"
    },
    {
        id: "agreeWithTerms",
        type: "yesOrNo",
        title: "Você concorda com os termos de serviço?",
        nextButtonMessage: "Sim e Enviar",
    },
    {
        id: "success",
        type: "text",
        title: "",
    }
];

const clearUndefinedFromObject = (object: any) => {
    const clone = {...object};
    Object.keys(clone).forEach(key => clone[key] === undefined && delete clone[key]);
    return clone;
}

const START_STEP: keyof IFormData = "enabledFGTS";

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
    const [questions, setQuestions] = useState<IQuestionsWithDirection[]>(QUESTIONS.map((question, index) => ({
        ...question,
        direction: !index ? "down" : "up",
    })));

    const [currentStep, setCurrentStep] = useState(() => {
        const index = questions.findIndex(question => question.id === START_STEP);
        return index > -1 ? index : 0;
    });

    const [balance, setBalance] = useState<IBalance[]>([]);

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
                        />
                    )}
                </StepsTransition>
            ))}
        </div>
    )
}

export default Form