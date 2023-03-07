import Statistics from "./Statistics"
import { useCoinsContext } from "../../contexts/CoinsProvider"
import { formatValue } from "../../utils/calculations"
import CoinTable from "../browse/CoinTable"
import '../../styles/analytics.css'
import { useNavigate } from "react-router-dom"

const Analytics: React.FC = () => {
    const {coins} = useCoinsContext()
    const navigate = useNavigate()
    const handleCoinSelect = (uuid: string) => {
        navigate(`/dashboard/browse/${uuid}`)
    }
    return (
        <div className='browse-container'>
            <h1 className='analytics-headers'>Global Statistics</h1>
            <Statistics 
                totalCoins={formatValue(coins.stats.totalCoins,false)}
                total24hVolume={`$${formatValue(coins.stats.total24hVolume)}`}
                totalExchanges={formatValue(coins.stats.totalExchanges,false)}
                totalMarketCap={`$${formatValue(coins.stats.totalMarketCap)}`}
                totalMarkets={formatValue(coins.stats.totalMarkets,false)}
            />
            <h1 className='analytics-headers'>Top 25 Cryptocurrencies</h1>
            <CoinTable 
                coins={coins.coins}
                page={0}
                interval={25}
                onCoinSelect={handleCoinSelect}
            />
        </div>
    )
}

export default Analytics