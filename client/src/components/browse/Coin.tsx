import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoadingPage from "../LoadingPage"
import Chart from "./Chart"
import CoinTitle from "./CoinTitle"
import TimeRange from "./TimeRange"
import Statistics from "./Statistics"
import Description from "./Description"
import OtherStats from "./OtherStats"
import axios from 'redaxios'
import { ICoinDetails, ICoinHistory } from "../../types"
import '../../styles/coin.css'
import { formatValue } from "../../utils/calculations"
import Links from "./Links"


const Coin: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [coin, setCoin] = useState<ICoinDetails>()
    const [range, setRange] = useState<string>('24h')
    const {uuid} = useParams()

    useEffect(() => {
        window.scrollTo(0,0)
        const getData = async () => {
            try {
                const coin = await axios.get(`/api/v1/coins/${uuid}`)
                setCoin(coin.data.data.data.coin)
                console.log(coin)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    const handleRange = (range: string) => setRange(range)

    return (
        loading ? <LoadingPage /> : 
        <>
            <div className='coin-container'>
                <CoinTitle 
                    name={coin!.name} 
                    icon={coin!.iconUrl}
                    price={`$${formatValue(coin!.price)} CAD`}
                />
                <TimeRange range={range} onRangeChange={handleRange}/>
                <Chart uuid={uuid!} range={range}/>
                <Description name={coin!.name} desc={coin!.description}/>
                <OtherStats 
                    markets={formatValue(coin!.numberOfMarkets, false)}
                    exchanges={formatValue(coin!.numberOfExchanges, false)}
                    confirmedSupply={coin!.supply.confirmed}
                    totalSupply={`${formatValue(coin!.supply.total, false)} ${coin!.symbol}`}
                    availableSupply={`${formatValue(coin!.supply.circulating, false)} ${coin!.symbol}`}
                />
            </div>
            <div className='coin-details'>
                <Statistics 
                    name={coin!.name}
                    rank={coin!.rank}
                    price={`$${formatValue(coin!.price)}`}
                    ath={`$${formatValue(coin!.allTimeHigh.price)}`}
                    marketCap={`$${formatValue(coin!.marketCap)}`}
                    volume={`$${formatValue(coin!["24hVolume"])}`}
                    change={`${coin!.change}%`}
                />
                <Links links={coin!.links}/>
            </div>
        </>
    )
}

export default Coin
