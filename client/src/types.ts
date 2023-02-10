export interface IError {
    data: {
        success: boolean;
        error: string;
    }
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
    'tier': number;
    'price': string;
    'uuid': string;
    'listedAt': number;
}