import useFetch from "../../hooks/useFetch"
import { useCoinsContext } from "../../contexts/CoinsProvider";
import { useEffect, useState } from "react"
import { getLastViewedPortfolioId, initNewPortfolioObj } from "../../utils/portfolioUtils";
import { IPortfolio, IPortfolioData, IPortfoliosData} from "../../types";
import PortfolioContainer from "./PortfolioContainer";
import PortfoliosList from "./PortfoliosList";
import { setLocalStorageItem } from "../../utils/localStorage";

type TPortfolios = IPortfolio[]

const Portfolios: React.FC = () => {
    const {data, loading, error} = useFetch<IPortfoliosData>('/api/v1/portfolios')
    const coinMap = useCoinsContext()

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
            console.log(newPortfolio)
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

    return (
        loading ? <div>Loading</div> : 
        error ? <div>Error</div> :
        <>
            {curPortfolio && portfolios && portfolioList && curPortfolioId &&
            <>
                <PortfolioContainer portfolio={curPortfolio}/>
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