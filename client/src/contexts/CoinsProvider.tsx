import { createContext, useContext, ReactNode, useEffect, useState} from "react";
import { ICoins, ICoinMap, ICoin, ICoinsResponse } from "../types";
import LoadingPage from "../components/LoadingPage";
import initSocket from "../hooks/initSocket";
import ErrorPage from "../components/ErrorPage";

interface ICoinsContext {
    coinMap: ICoinMap;
    coins: ICoins
} 

const CoinsContext = createContext<ICoinsContext>({} as ICoinsContext)
export const useCoinsContext = () => useContext(CoinsContext)

export const CoinsProvider = ({children}: {children: ReactNode}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("");
    const [coinMap, setCoinMap] = useState<ICoinMap>({})
    const [data, setData] = useState<ICoins>()
    const {socket} = initSocket()
    useEffect(() => {
        socket.on('coins', (data: ICoinsResponse) => {
            if (data.success) {
                let map: ICoinMap = {}
                data.data.coins.forEach((d: ICoin) => {
                    map[d.uuid] = d
                })
                setCoinMap(map)
                setData(data.data)

            } else {
                setError("Latest coin data could not be retrieved")
            }
            setLoading(false)
        })
        return () => {
            socket.off('coins')
        }
    }, [loading, socket])

    const value = {
        coinMap,
        coins: data!
    }

    return (
        <CoinsContext.Provider value={value}>
            {
                loading ? <LoadingPage /> : error ? <ErrorPage error={error} code={500}/>
                : children
            }
        </CoinsContext.Provider>
    )
}