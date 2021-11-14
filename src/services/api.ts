import axios from "axios";
import { IBalance, IFirstPaymentInfo } from "../utils/types";

const api = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://api.honscript.com",
});

type IGetBalanceResponse = {
    error: false;
    result: IBalance[];
    balance: IBalance[];
    firstPaymentInfo: IFirstPaymentInfo;
} | {
    error: true;
    errorMessage?: string;
}

type IGetBalanceResult = {
    error: false;
    result: IBalance[];
    balance: IBalance[];
    firstPaymentInfo: IFirstPaymentInfo;
} | {
    error: true,
    errorMessage: string,
    errorCode?: number,
}

interface IGetBalancePayload {
    name: string;
    ddd: string;
    telephone: string;
    birthday: string;
    uf: string;
    cpf: string;
}

export const getBalance = async (payload: IGetBalancePayload): Promise<IGetBalanceResult> => {
    try {
        const response = await api.post<IGetBalanceResponse>(`/getBalance`, payload);

        const {
            data
        } = response

        if (!data.error) {
            return data;
        } else {
            return {
                ...data,
                errorMessage: data.errorMessage || "Erro ao buscar saldo FGTS. Tente novamente mais tarde.",
            };
        }
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return {
                error: true,
                errorMessage: error.response?.data?.errorMessage || "Erro ao buscar saldo FGTS. Tente novamente mais tarde.",
                errorCode: error.response?.data?.errorCode,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error settling up the request:', error.message);
        }
        console.log("Request config:", error.config);
        return {
            error: true,
            errorMessage: "Erro desconhecido."
        };
    }
}

interface MakeProposalPayload {
    name: string;
    cpf: string;
    ddd: string;
    telephone: string;
    uf: string;
    rg: string;
    birthday: string;
    motherName: string;
    cep: string;
    address: string;
    houseNumber: string;
    neighbourhood: string;
    city: string;
    accountType: string;
    accountBank: string;
    accountAgency: string;
    accountNumber: string;
}

export const makeProposal = async ({
    ...payload
}: MakeProposalPayload): Promise<boolean> => {
    try {
        await api.post(`/makeProposal`, payload);

        return true;
    } catch (error: any) {
        return false;
    }
};