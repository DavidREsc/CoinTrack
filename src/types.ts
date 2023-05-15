export interface ICoinsData {
    stats: string[]
    coins: string[]
    length: number
}

export interface ICoinsResponse {
    success: boolean;
    data: ICoinsData | [];
}

export interface ClientToServerEvents {
    disconnect: () => void;
}

export interface ServerToClientEvents {
    coins: (coins: ICoinsResponse) => void;
}

export interface ITransactionWithIdData {
    transaction_type: string;
    transaction_date: Date;
    coin_price: string;
    coin_amount: string;
    dollar_amount?: string;
}

export interface ITransactionsMetrics {
    total_quantity: string;
    average_buy_price: string;
    average_sell_price: string;
}
