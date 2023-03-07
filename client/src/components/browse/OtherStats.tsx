interface OtherStatsProps {
    markets: string;
    exchanges: string;
    confirmedSupply: boolean;
    totalSupply: string;
    availableSupply: string;
}

const OtherStats: React.FC<OtherStatsProps> = ({
    markets,
    exchanges,
    confirmedSupply,
    totalSupply,
    availableSupply
}) => {
    return (
        <div className='otherstats-container'>
            <h2>Statistics</h2>
            <ul>
                <li>
                    <p>Number of Markets</p>
                    <p>{markets}</p>
                </li>
                <li>
                    <p>Number of Exchanges</p>
                    <p>{exchanges}</p>
                </li>
                <li>
                    <p>Confirmed Supply</p>
                    <p>{confirmedSupply ? 'Yes' : 'No'}</p>
                </li>
                <li>
                    <p>Total Supply</p>
                    <p>{totalSupply}</p>
                </li>
                <li>
                    <p>Circulating Supply</p>
                    <p>{availableSupply}</p>
                </li>
            </ul>
        </div>
    )
}

export default OtherStats;
