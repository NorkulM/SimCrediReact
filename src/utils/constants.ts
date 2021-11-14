import { IFormData } from ".";

const MOCKED_INITIAL_DATA: IFormData = {
    accountNumber: "3542475705",
    accountType: "Conta Corrente",
    address: "Rua Antônio Azevedo Martins",
    agency: "0100",
    agreeWithTerms: "",
    bank: "041",
    birthday: "14/05/1989",
    city: "Sapucaia do Sul",
    complement: "Casa",
    cpf: "01622094018",
    identificationNumber: "26722960",
    name: "Dionathan Dos Santos Soares",
    neighbourhood: "Walderez",
    nomeMae: "Teresinha Dos Santos",
    number: "80",
    telephone: "(51) 99597-9343",
    uf: "RS",
    zipCode: "93226-507",
}

const EMPTY_INITIAL_DATA: IFormData = {
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

export const INITIAL_FORM_DATA = process.env.NODE_ENV === "development" ? MOCKED_INITIAL_DATA : EMPTY_INITIAL_DATA;