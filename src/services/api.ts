import axios from "axios";
import ts from "typescript";
import { IBalance, IFirstPaymentInfo } from "../utils/types";

const api = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://api.simcreditodigital.com.br",
});

type IGetBalanceResponse = {
    id: string;
} | {
    error: true;
    errorMessage: string;
}

type IGetBalanceResult = {
    error: false;
    id: string;
} | {
    error: true;
    errorMessage: string;
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
            data,
            status,
        } = response;

        if ("error" in data) {
            return {
                ...data,
            }
        } else {
            return {
                id: data.id,
                error: false,
            }
        }
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            return {
                error: true,
                errorMessage: error.response?.data?.errorMessage || "Erro ao buscar saldo FGTS. Tente novamente mais tarde.",
            };
        }
        return {
            error: true,
            errorMessage: "Erro desconhecido."
        };
    }
}

interface IFGTSResult {
    firstDueDate: string;
    // outras info tem q botar aq q eu n sou obrigado
}

type IFGTSResultResult = {
    error: false;
    completed: true;
    data: IFGTSResult;
} | {
    error: false;
    completed: false;
} | {
    error: true;
    completed: true;
    errorMessage: string;
}

type IFGTSResultResponse = {
    success: false;
    error: string;
} | {
    success: true;
    data: IFGTSResult;
} | {}

export const getFGTSResult = async (id: string): Promise<IFGTSResultResult> => {
    try {
        const { data } = await api.get<IFGTSResultResponse>(`/getFgtsResult?id=${id}`);

        if (!("error" in data)) {
            return {
                error: false,
                completed: false,
            }
        }

        if ("data" in data) {
            return {
                error: false,
                data: data, //data.data
                completed: true,
            }
        }

        return {
            error: true,
            completed: true,
            errorMessage: data.error,

        }
    } finally {
        //So pra sair o erro
    }
    // } catch (error) {
    //     // return {
    //     //     // error
    //     // }
    // }
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