import { createContext, useContext, ReactNode, useEffect, useState} from "react";
import { ICoins, ICoinMap } from "../types";
import useFetch from "../hooks/useFetch";

type CoinsContextType = ICoinMap

const CoinsContext = createContext<CoinsContextType>({})
export const useCoinsContext = () => useContext(CoinsContext)

export const CoinsProvider = ({children}: {children: ReactNode}) => {
    const {data, loading, error} = useFetch<ICoins>('/api/v1/coins')
    const [coinMap, setCoinMap] = useState<ICoinMap>({})
    useEffect(() => {
        let map: ICoinMap = {}
        if (!loading && data) {
            data.coins.forEach(d => {
                map[d.uuid] = d
            })
            setCoinMap(map)
        }
    }, [data, loading])

    return (
        <CoinsContext.Provider value={coinMap}>
            {
                loading ? <div>Loading</div>
                : error ? <div>{error}</div> 
                : children
            }
        </CoinsContext.Provider>
    )
}