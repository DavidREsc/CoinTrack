import { useCoinsContext } from "../../contexts/CoinsProvider";
import { IAssetTxn } from "../../types";
import {AiFillEdit} from 'react-icons/ai';
import {RiDeleteBack2Line} from 'react-icons/ri'

interface TransactionsTableProps {
    transactions: IAssetTxn[]
    coin_id: string;
    onDeleteTxn: () => void;
    onEditTxn: () => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({transactions, coin_id, onEditTxn, onDeleteTxn}) => {
    const {coinMap} = useCoinsContext();
    return (
        <div className='txn-table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t: IAssetTxn, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{t.transaction_type.toUpperCase()}</td>
                                <td>{new Date(t.transaction_date).toLocaleDateString()}</td>
                                <td>{`$${t.coin_price}`}</td>
                                <td>
                                    <span className='txn-total-col'>
                                        <p>{`$${t.dollar_amount}`}</p>
                                        <p>{`${t.coin_amount} ${coinMap[coin_id].symbol}`}</p>
                                    </span>
                                </td>
                                <td className='actions-col'>
                                    <button onClick={onEditTxn}><AiFillEdit /></button>
                                    <button onClick={onDeleteTxn}><RiDeleteBack2Line /></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionsTable;
