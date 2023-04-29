import { useCoinsContext } from "../../contexts/CoinsProvider";
import { useEffect, useState } from "react"
import { getLastViewedPortfolioId, initNewPortfolioObj, handleAddTnx, handleDeleteAsset} from "../../utils/portfolioUtils";
import { IError, IPortfolio, IPortfolioData, IPortfoliosData, PflData, TnxData, IPortfoliosRes} from "../../types";
import PortfolioContainer from "./PortfolioContainer";
import PortfolioListContainer from "./PortfolioListContainer";
import { setLocalStorageItem } from "../../utils/localStorage";
import usePortfolio from "../../hooks/usePortfolios";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import axios from 'redaxios'

type TPortfolios = IPortfolio[]

const Portfolios: React.FC = () => {
    const {coinMap} = useCoinsContext()!
    const {useAddTransaction, useRemoveAsset, useCreatePortfolio, useDeletePortfolio} = usePortfolio()

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [data, setData] = useState<IPortfoliosData>()
    const [portfolios, setPortfolios] = useState<TPortfolios>()
    const [portfolioList, setPortfolioList] = useState<IPortfolioData[]>()
    const [curPortfolio, setCurPortfolio] = useState<IPortfolio>()
    const [curPortfolioId, setCurPortfolioId] = useState<number>()

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const res = await axios.get<IPortfoliosRes>('/api/v1/portfolios')
                const cur_pfl_id = getLastViewedPortfolioId(res.data.data.portfolios)
                const newPortfolio = initNewPortfolioObj(res.data.data, cur_pfl_id, coinMap)
                setData(res.data.data)
                setCurPortfolio(newPortfolio)
                setPortfolios([newPortfolio])
                setPortfolioList(res.data.data.portfolios)
                setCurPortfolioId(cur_pfl_id)
            } catch (error) {
                console.log(error)
                setError((error as IError).data.error)
            } finally {
                setLoading(false)
            }
        }
        getTransactions()
    }, [coinMap])

    const updatePortfolioState = (new_pfl_obj: IPortfolio) => {
        const new_pfls = portfolios!.filter(p => p.id !== curPortfolioId).concat(new_pfl_obj)
        setPortfolios(new_pfls)
        setCurPortfolio(new_pfl_obj)
    }

    const handlePortfolioChange = (id: number) => {
        let pfl = portfolios!.find((p) => p.id === id)
        if (!pfl) {
           pfl = initNewPortfolioObj(data!, id, coinMap)
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

    const deletePortfolio = async (id: number, 
        cb: (e: IError | undefined) => void) => {
        try {
            const res = await useDeletePortfolio(id)
            setPortfolios(prev => prev!.filter(p => p.id !== id))
            setPortfolioList(prev => prev!.filter(p => p.portfolio_id !== id))
            if (id === curPortfolioId) {
                setCurPortfolio(portfolios![0])
                setCurPortfolioId(portfolios![0].id)
            }
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
                    onDeletePortfolio={deletePortfolio}
                />
            </>
            }
        </>
    )
}

export default Portfolios