
interface StatisticsProps {
    name: string;
    rank: number;
    price: string;
    ath: string;
    marketCap: string;
    volume: string
    change: string;
}

const Statistics: React.FC<StatisticsProps> = ({
    name,
    rank,
    price,
    ath,
    marketCap,
    volume,
    change
}) => {
    return (
        <div className='stats-container'>
            <h2>Details</h2>
            <ul>
                <li>
                    <p>Name</p>
                    <p>{name}</p>
                </li>
                <li>
                    <p>Rank</p>
                    <p>{rank}</p>
                </li>
                <li>
                    <p>Price</p>
                    <p>{price}</p>
                </li>
                <li>
                    <p>ATH</p>
                    <p>{ath}</p>
                </li>
                <li>
                    <p>24h Volume</p>
                    <p>{volume}</p>
                </li>
                <li>
                    <p>Market Cap</p>
                    <p>{marketCap}</p>
                </li>
                <li>
                    <p>24h Change</p>
                    <p>{change}</p>
                </li>
            </ul>
        </div>
    )
}

export default Statistics
