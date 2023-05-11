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
