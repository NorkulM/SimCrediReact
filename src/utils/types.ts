export interface IFormData {
    name: string;
    cpf: string;
    uf: string;
    telephone: string;
    birthday: string;
    enabledFGTS?: string;
    table?: string;
    nomeMae: string;
    city: string;
    zipCode: string;
    address: string;
    neighbourhood: string;
    number: string;
    complement: string;
    accountType: string;
    bank: string;
    agency: string;
    accountNumber: string;
    identificationNumber: string;
    agreeWithTerms: string;
    success?: string;
}

export interface IOption {
    value: string;
    title: string;
}

export interface IQuestion {
    id: keyof IFormData;
    title: string;
    type: "text" | "number" | "yesOrNo" | "select";
    helperText?: string;
    placeholder?: string;
    nextStep?: () => void;
    previousStep?: () => void;
    error?: string;
    MaskInput?: any;
    options?: IOption[];
    previousButtonMessage?: string;
    nextButtonMessage?: string;
    blockNextButton?: boolean;
}

export interface IQuestionsWithDirection extends IQuestion {
    direction: "up" | "down";
}

export interface IBalance {
    value: number;
    date: string;
}
