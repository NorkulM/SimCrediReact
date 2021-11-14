import { IFormData } from "./types";

const optionalInputs: (keyof IFormData)[] = ["enabledFGTS", "table", "agreeWithTerms"]

export const validateField = (id: keyof IFormData, value: string): { error?: string } => {
    if (!optionalInputs.includes(id) && value.trim() === "") {
        return {
            error: "Este campo é obrigatório.",
        };
    }

    switch (id) {
        case "birthday":
            if (value.length && value.length < 10) {
                return {
                    error: "Data inválida.",
                }
            }
            const [day, month, year] = value.split("/").map(dayMonthYear => Number(dayMonthYear));
            const parsedDate = new Date(year, month - 1, day);

            const parsedYear = parsedDate.getFullYear();
            const parsedMonth = parsedDate.getMonth() + 1;
            const parsedDay = parsedDate.getDate();

            if (`${day}-${month}-${year}` !== `${parsedDay}-${parsedMonth}-${parsedYear}`) {
                return {
                    error: "Data não existe."
                }
            }

            const today = new Date();

            const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

            if (parsedDate.getTime() > eighteenYearsAgo.getTime()) {
                return {
                    error: "Você precisa ter 18 anos.",
                };
            }

            return {};
        case "telephone":
            if (value.length && value.length < 14) {
                return {
                    error: "Telefone inválido."
                }
            }
            return {};
        default:
            return {}
    }
}

export const scrollToEnableFGTSInfo = () => {
    (window as any)?.receiveCustomMsg?.("scrollToTop");
};

export const clearUndefinedFromObject = (object: any) => {
    const clone = {...object};
    Object.keys(clone).forEach(key => clone[key] === undefined && delete clone[key]);
    return clone;
};
