import { useCoinsContext } from "../../contexts/CoinsProvider";

interface TransactionsHeaderProps {
    coin_id: string;
}

const TransactionsHeader: React.FC<TransactionsHeaderProps> = ({coin_id}) => {
    const {coinMap} = useCoinsContext();
    return (
        <div className='txn-header'>
            <h1>{`${coinMap[coin_id].name} Transactions`}</h1>
            <span><img src={coinMap[coin_id].iconUrl}/></span>
        </div>
    )
}

export default TransactionsHeader;
