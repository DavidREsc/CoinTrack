import { createContext, useContext, ReactNode, useEffect, useState} from "react";
import { ICoins, ICoinMap } from "../types";
import useFetch from "../hooks/useFetch";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";

interface ICoinsContext {
    coinMap: ICoinMap;
    coins: ICoins
} 

const CoinsContext = createContext<ICoinsContext>({} as ICoinsContext)
export const useCoinsContext = () => useContext(CoinsContext)

export const CoinsProvider = ({children}: {children: ReactNode}) => {
    const {data, loading, error} = useFetch<ICoins>('/api/v1/coins')
    const [coinMap, setCoinMap] = useState<ICoinMap>({})
    useEffect(() => {
        let map: ICoinMap = {}
        if (!loading && !error && data) {
            data.coins.forEach(d => {
                map[d.uuid] = d
            })
            setCoinMap(map)
        }
    }, [data, loading])

    const value = {
        coinMap,
        coins: data!
    }

    return (
        <CoinsContext.Provider value={value}>
            {
                loading ? <LoadingPage />
                : error ? <ErrorPage code={500} error={error} /> 
                : children
            }
        </CoinsContext.Provider>
    )
}