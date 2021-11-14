import { IQuestion, scrollToEnableFGTSInfo } from "../../utils";
import AccountNumberMaskedInput from "../AccountNumberMaskedInput";
import CEPMaskedInput from "../CEPMaskedInput";
import CPFMaskedInput from "../CPFMaskedInput";
import DateMaskedInput from "../DateMaskedInput";
import TelephoneMaskedInput from "../TelephoneMaskedInput";
import BANK_LIST from "./bank-list";
import UF_LIST from "./uf-list";

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
        title: "Qual é o seu nome completo?",
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

export default QUESTIONS;