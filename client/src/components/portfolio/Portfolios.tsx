import useFetch from "../../hooks/useFetch"
import { useCoinsContext } from "../../contexts/CoinsProvider";
import { useEffect, useState } from "react"
import { getLastViewedPortfolioId, initNewPortfolioObj, handleAddTnx, handleDeleteAsset} from "../../utils/portfolioUtils";
import { IError, IPortfolio, IPortfolioData, IPortfoliosData, PflData, TnxData} from "../../types";
import PortfolioContainer from "./PortfolioContainer";
import PortfolioListContainer from "./PortfolioListContainer";
import { setLocalStorageItem } from "../../utils/localStorage";
import usePortfolio from "../../hooks/usePortfolios";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";

type TPortfolios = IPortfolio[]

const Portfolios: React.FC = () => {
    const {data, loading, error} = useFetch<IPortfoliosData>('/api/v1/portfolios')
    const {coinMap} = useCoinsContext()!
    const {useAddTransaction, useRemoveAsset, useCreatePortfolio} = usePortfolio()

    const [portfolios, setPortfolios] = useState<TPortfolios>()
    const [portfolioList, setPortfolioList] = useState<IPortfolioData[]>()
    const [curPortfolio, setCurPortfolio] = useState<IPortfolio>()
    const [curPortfolioId, setCurPortfolioId] = useState<number>()

    useEffect(() => {
        if (!loading && !error && data) {
            const cur_pfl_id = getLastViewedPortfolioId(data.portfolios)
            const newPortfolio = initNewPortfolioObj(data, cur_pfl_id, coinMap)
            setCurPortfolio(newPortfolio)
            setPortfolios([newPortfolio])
            setPortfolioList(data.portfolios)
            setCurPortfolioId(cur_pfl_id)
        } 
    }, [data, loading])

    const updatePortfolioState = (new_pfl_obj: IPortfolio) => {
        const new_pfls = portfolios!.filter(p => p.id !== curPortfolioId).concat(new_pfl_obj)
        setPortfolios(new_pfls)
        setCurPortfolio(new_pfl_obj)
    }

    const handlePortfolioChange = (id: number) => {
        let pfl = portfolios!.find((p) => p.id === id)
        if (!pfl) {
            console.log(id)
           pfl = initNewPortfolioObj(data!, id, coinMap)
           console.log(pfl)
           setPortfolios(prevState => prevState!.concat(pfl!))
        }
        setLocalStorageItem('portfolioId', String(id))
        setCurPortfolio(pfl)
        setCurPortfolioId(id)
    }

    const createPortfolio = async (data: PflData, 
        cb: (e: IError | undefined) => void) => {
        try {
            const res = await useCreatePortfolio(data)
            setPortfolioList(prev => prev!.concat(res))
            handlePortfolioChange(res.portfolio_id)
            cb(undefined)
        } catch (error) {
            console.log(error)
            cb(error as IError)
        }
    }

    const addTransaction = async (data: TnxData, coin_id: string,
        cb: (e: IError | undefined) => void) => {
        try {
            const res = await useAddTransaction(data, coin_id, curPortfolioId!)
                const new_pfl_obj = handleAddTnx(curPortfolio!, res, coinMap)
                console.log(new_pfl_obj)
                updatePortfolioState(new_pfl_obj)
                cb(undefined)

        } catch (error) {
            console.log(error)
            cb(error as IError)
        }
    }

    const removeAsset = async (coin_id: string, 
        cb: (e: IError | undefined) => void) => {
        try {
            await useRemoveAsset(coin_id, curPortfolioId!)
            const new_pfl_obj = handleDeleteAsset(curPortfolio!, coin_id)
            updatePortfolioState(new_pfl_obj)
            cb(undefined)
        } catch (error) {
            console.log(error)
            cb(error as IError)
        }
    }



    return (
        loading ? <LoadingPage /> : 
        error ? <ErrorPage error={error} code={500}/> :
        <>
            {curPortfolio && portfolios && portfolioList && curPortfolioId &&
            <>
                <PortfolioContainer 
                    portfolio={curPortfolio} 
                    onAddTransaction={addTransaction}
                    onRemoveAsset={removeAsset}
                />
                <PortfolioListContainer 
                    portfolios={portfolioList}
                    curPortfolio={curPortfolioId}
                    onPflChange={handlePortfolioChange}
                    onCreatePortfolio={createPortfolio}
                />
            </>
            }
        </>
    )
}

export default Portfolios