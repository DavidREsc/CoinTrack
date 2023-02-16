import { IError, TnxData, ITransaction } from "../types";
import axios from 'redaxios'

interface AddTnxRes {
    data: {
        success: true;
        data: ITransaction;
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
    return {useAddTransaction}
}

export default usePortfolio;
