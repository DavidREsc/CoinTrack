import { IError, TnxData, ITransaction, IPortfolioData, PflData } from "../types";
import axios from 'redaxios'

interface AddTnxRes {
    data: {
        success: boolean;
        data: ITransaction;
    }
}
interface RemoveAssetRes {
    data: {
        success: boolean,
        data: {}
    }
}
interface CreatePflRes {
    data: {
        success: boolean,
        data: IPortfolioData
    }
}
interface DeletePflRes {
    data: {
        success: boolean,
        data: {}
    }
}

const usePortfolio = () => {
    const useAddTransaction = (data: TnxData, coin_id: string, portfolio_id: number) => {
        const {transaction_type, transaction_date, coin_amount, coin_price} = data
        return new Promise<ITransaction>((resolve, reject) => {
            axios.post('/api/v1/transactions', {
                method: 'POST',
                headers: {'Content-Type': 'applications/json'},
                portfolio_id,
                transaction_type,
                transaction_date,
                coin_id,
                coin_amount,
                coin_price
            })
            .then((response: AddTnxRes) => resolve(response.data.data))
            .catch((e: IError) => reject(e))
        })
    }
    const useRemoveAsset = (coin_id: string, portfolio_id: number) => {
        return new Promise<{}>((resolve, reject) => {
            axios.delete('/api/v1/transactions', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                data: {
                    coin_id,
                    portfolio_id
                }
            })
            .then((response: RemoveAssetRes) => resolve(response.data.data))
            .catch((error: IError) => reject(error))
        })
    }
    const useCreatePortfolio = (data: PflData) => {
        const {portfolio_name} = data
        return new Promise<IPortfolioData>((resolve, reject) => {
            axios.post('/api/v1/portfolios', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                portfolio_name
            })
            .then((response: CreatePflRes) => resolve(response.data.data))
            .catch((error: IError) => reject(error))
        })
    }
    const useDeletePortfolio = (id: number) => {
        return new Promise<{}>((resolve, reject) => {
            axios.delete(`/api/v1/portfolios/${id}`, {
                method: 'DELETE',
            })
            .then((response: DeletePflRes) => resolve(response.data.data))
            .catch((error: IError) => reject(error))
        })
    }
    return {useAddTransaction, useRemoveAsset, useCreatePortfolio, useDeletePortfolio}
}

export default usePortfolio;
