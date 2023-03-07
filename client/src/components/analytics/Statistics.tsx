import {CiBitcoin} from 'react-icons/ci'
import {RiExchangeFundsFill} from 'react-icons/ri'
import {BiBarChart} from 'react-icons/bi'
import {BsPieChart} from 'react-icons/bs'
import {AiOutlineNumber} from 'react-icons/ai'

interface StatisticsProps {
    totalCoins: string;
    total24hVolume: string;
    totalExchanges: string;
    totalMarketCap: string;
    totalMarkets: string;
}

const Statistics: React.FC<StatisticsProps> = ({
    totalCoins,
    total24hVolume,
    totalExchanges,
    totalMarketCap,
    totalMarkets
}) => {
    return (
        <div className='global-stats'>
            <span>
                <span>
                    <CiBitcoin />
                    <h3>Total Cryptocurrencies</h3>
                </span>
                <h2>{totalCoins}</h2>
            </span>
            <span>
                <span>
                    <RiExchangeFundsFill />
                    <h3>Total Exchanges</h3>
                </span>
                <h2>{totalExchanges}</h2>
            </span>
            <span>
                <span>
                    <BiBarChart />
                    <h3>Total Market Cap</h3>
                </span>
                <h2>{totalMarketCap}</h2>
            </span>
            <span>
                <span>
                    <BsPieChart />
                    <h3>Total 24h Volume</h3>
                </span>
                <h2>{total24hVolume}</h2>
            </span>
            <span>
                <span>
                    <AiOutlineNumber />
                    <h3>Total Markets</h3>
                </span>
                <h2>{totalMarkets}</h2>
            </span>

        </div>
    )
}

export default Statistics;
