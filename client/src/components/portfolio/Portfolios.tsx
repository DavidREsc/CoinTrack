import useFetch from "../../hooks/useFetch"
import { useCoinsContext } from "../../contexts/CoinsProvider";
import { useEffect, useState } from "react"
import { getLastViewedPortfolioId, initNewPortfolioObj, updatePortfolioObj } from "../../utils/portfolioUtils";
import { IError, IPortfolio, IPortfolioData, IPortfoliosData, TnxData} from "../../types";
import PortfolioContainer from "./PortfolioContainer";
import PortfoliosList from "./PortfoliosList";
import { setLocalStorageItem } from "../../utils/localStorage";
import usePortfolio from "../../hooks/usePortfolios";

type TPortfolios = IPortfolio[]

const Portfolios: React.FC = () => {
    const {data, loading, error} = useFetch<IPortfoliosData>('/api/v1/portfolios')
    const {coinMap} = useCoinsContext()!
    const {useAddTransaction} = usePortfolio()

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

    const handlePflChange = (id: number) => {
        let pfl = portfolios!.find((p) => p.id === id)
        if (!pfl) {
           pfl = initNewPortfolioObj(data!, id, coinMap)
           setPortfolios(prevState => prevState!.concat(pfl!))
        }
        setLocalStorageItem('portfolioId', String(id))
        setCurPortfolio(pfl)
        setCurPortfolioId(id)
    }

    const addTransaction = async (data: TnxData, coin_id: string, portfolio_id: number,
        cb: (e: IError | undefined) => void) => {
        try {
            const res = await useAddTransaction(data, coin_id, portfolio_id)
            const new_pfl_obj = updatePortfolioObj(curPortfolio!, res, coinMap)
            const new_pfls = portfolios!.filter(p => p.id !== portfolio_id).concat(new_pfl_obj)
            setPortfolios(new_pfls)
            setCurPortfolio(new_pfl_obj)
            cb(undefined)
        } catch (error) {
            console.log(error)
            cb(error as IError)
        }
    }

    return (
        loading ? <div>Loading</div> : 
        error ? <div>Error</div> :
        <>
            {curPortfolio && portfolios && portfolioList && curPortfolioId &&
            <>
                <PortfolioContainer portfolio={curPortfolio} onAddTransaction={addTransaction}/>
                <PortfoliosList 
                    portfolios={portfolioList}
                    curPortfolio={curPortfolioId}
                    onPflChange={handlePflChange}
                />
            </>
            }
        </>
    )
}

export default Portfolios