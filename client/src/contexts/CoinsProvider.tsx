import { createContext, useContext, ReactNode} from "react";
import { ICoins } from "../types";
import useFetch from "../hooks/useFetch";

type CoinsContextType = ICoins | null

const CoinsContext = createContext<CoinsContextType>(null)
export const useCoinsContext = () => useContext(CoinsContext)

export const CoinsProvider = ({children}: {children: ReactNode}) => {
    const {data, loading, error} = useFetch('/api/v1/coins')

    return (
        <CoinsContext.Provider value={data as ICoins}>
            {
                loading ? <div>Loading</div>
                : error ? <div>{error}</div> 
                : children
            }
        </CoinsContext.Provider>
    )
}