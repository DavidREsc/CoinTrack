import { IPortfolio } from "../../types"
import PortfolioMetrics from "./PortfolioMetrics"
import PortfolioAssets from "./PortfolioAssets"
import BrowseForm from "../forms/BrowseForm"

interface PflContainerProps {
    portfolio: IPortfolio
}

const PortfolioContainer: React.FC<PflContainerProps> = (props) => {
    const {portfolio} = props
    return (
        <main>
            <h1>Portfolio</h1>
            <PortfolioMetrics stats={portfolio.stats}/>
            <PortfolioAssets transactions={portfolio.mergedTransactions}/>
        </main>
    )
}

export default PortfolioContainer