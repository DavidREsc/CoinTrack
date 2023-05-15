import { UTCTimestamp } from "lightweight-charts";

export interface IError {
    data: {
        success: boolean;
        error: string;
    },
    status: number;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface ISignupData {
    email: string;
    password: string;
    confirm_password: string;
}

export interface ICoins {
    stats: IStats;
    coins: ICoin[]
}

export interface IPortfolioStats {
    total_profit: string;
    total_holdings: string;
    total_profit_margin: string;
    total_amount_sold: string;
    capital_gains: string;
}

export interface IPortfolio {
    id: number;
    buy_tnx: ITransaction[];
    sell_tnx: ITransaction[];
    stats: IPortfolioStats;
    mergedTransactions: ITransaction[]
}

export interface IStats {
    'totalMarkets': number;
    'total': number;
    'totalMarketCap': string;
    'total24hVolume': string;
    'totalExchanges': number;
    'totalCoins': number;
}

export interface ICoin {
    'marketCap': string;
    'btcPrice': string;
    'change': string;
    '24hVolume': string;
    'coinrankingUrl': string;
    'name': string;
    'sparkline': string[];
    'lowVolume': boolean;
    'rank': number;
    'iconUrl': string;
    'color': string;
    'symbol': string;
    'tier': number;
    'price': string;
    'uuid': string;
    'listedAt': number;
}

export interface ICoinMap {
    [prop: string]: ICoin; 
}

export interface IPortfolioData {
    portfolio_name: string;
    portfolio_id: number;
    main: boolean;
}

export interface ITransaction {
    coin_amount: string;
    coin_id: string;
    coin_price: string;
    portfolio_id: number;
    transaction_date: Date;
    transaction_id: number;
    transaction_type: string;
    amount_sold?: string;
    holdings?: string;
    profit?: string;
    profitMargin?: string;
    initial_holdings?: string;
    price?: string;
    name?: string;
    change?: string;
    iconUrl?: string;
    symbol?: string;
    coin_amount_c: string;
}

export interface IPortfoliosData {
    buyTransactions: ITransaction[];
    sellTransactions: ITransaction[];
    portfolios: IPortfolioData[]
}

export interface IPortfoliosRes {
    success: boolean;
    data: IPortfoliosData
}

export interface TnxData {
	transaction_type: string;
	transaction_date: Date;
    coin_amount: string;
    coin_price: string;
}

export interface ICoinHistory {
    timestamp: UTCTimestamp;
    price: string;
}

export interface ICoinDetails {
    '24hVolume': string;
    'allTimeHigh': {'price': string, 'timestamp': UTCTimestamp};
    'change': string;
    'description': string;
    'iconUrl': string;
    'links': [{'name': string, 'type': string, 'url': string}];
    'marketCap': string;
    'name': string;
    'numberOfExchanges': string;
    'numberOfMarkets': string;
    'price': string;
    'rank': number;
    'uuid': string;
    'websiteUrl': string;
    'symbol': string;
    'supply': {
        'circulating': string;
        'confirmed': boolean;
        'max': string;
        'supplyAt': number;
        'total': string;
    }
}

export interface PflData {
    portfolio_name: string;
}

export interface ICoinsData {
    stats: IStats
    coins: ICoin[]
    length: number
}

export interface ICoinsResponse {
    success: boolean;
    data: ICoinsData;
}

export interface ServerToClientEvents {
    disconnect: () => void;
}

export interface ClientToServerEvents {
    coins: (coins: ICoinsResponse) => void;
}

export interface IAssetTxn {
    transaction_type: string;
    transaction_date: Date;
    coin_price: string;
    coin_amount: string;
    dollar_amount: string;
}

export interface ITxnMetrics {
    total_quantity: string;
    average_buy_price: string;
    average_sell_price: string;
}

export interface IAssetTxnResponse {
    metrics: ITxnMetrics;
    transactions: IAssetTxn[]
}