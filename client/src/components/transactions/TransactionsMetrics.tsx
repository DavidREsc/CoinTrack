import { useCoinsContext } from "../../contexts/CoinsProvider";
import { ITxnMetrics } from "../../types";

interface TransactionsMetricsProps {
    metrics: ITxnMetrics
    coin_id: string;
    balance: string;
}

const TransactionsMetrics: React.FC<TransactionsMetricsProps> = ({metrics, coin_id, balance}) => {
    const {coinMap} = useCoinsContext();
    return (
        <div className='txn-metrics-container'>
            <div>
                <div className='middle'>
                    <h3>Balance:</h3>
                    <p>{`$${balance}`}</p>
                </div>
            </div>
            <div className='middle'>
                <h3>Quantity: </h3>
                <p>{`${metrics.total_quantity} ${coinMap[coin_id].symbol}`}</p>
            </div>
            <div className='middle'>
                <h3>Avg. Buy Price:</h3>
                <p>{`$${metrics.average_buy_price}`}</p>
            </div>
            <div className='middle'>
                <h3>Avg. Sell Price:</h3>
                <p>{`$${metrics.average_sell_price}`}</p>
            </div>
        </div>
    )
}

export default TransactionsMetrics;
