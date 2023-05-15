import {VscTriangleUp, VscTriangleDown} from 'react-icons/vsc'
import '../../styles/portfolioAssets.css'
import {CgMoreVerticalO} from 'react-icons/cg'
import {RiDeleteBack2Line} from 'react-icons/ri'
import { ITransaction } from '../../types'
import { formatValue, lessThan, getAbs } from '../../utils/calculations'
import { useNavigate } from 'react-router-dom'

interface PflAssetsProps {
    transactions: ITransaction[];
    openSelect: () => void;
    openRemove: (value: string) => void;
    onViewTransactions: (coin_id: string) => void;
}

const PortfolioAssets: React.FC<PflAssetsProps> = (props) => {
    const {transactions, openSelect, openRemove, onViewTransactions} = props
    const navigate = useNavigate();
    return (
        <div className='portfolio-assets'>
            <div className='assets-top'>
                <h2>Your Assets</h2>
                <button onClick={openSelect} className='add-tnx'>Add New</button>
            </div>
            <table>
                <thead>
                    <tr>
                       <th><p>Name</p></th>
                       <th>Price</th> 
                       <th>24h</th> 
                       <th>Holdings</th> 
                       <th>Profit/Loss</th> 
                       <th>Actions</th>  
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((t: ITransaction, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <span className='span-name'>
                                            <img className='coin-icon' src={t.iconUrl}/>
                                            <p>{t.name}</p>
                                        </span>
                                    </td>
                                    <td><p>{`$${formatValue(t.price!)}`}</p></td>
                                    <td>
                                        <span className='span-percent' style={{color: lessThan(t.change!,0) ? '#E34234' : '#32CD32'}}>
                                            {lessThan(t.change!,0) ? <VscTriangleDown /> : <VscTriangleUp />}
                                            <p>{`${formatValue(getAbs(t.change!))}%`}</p>
                                        </span>
                                    </td>
                                    <td className='td-holdings'>
                                        <span className='span-holdings'>
                                            <p>{`$${formatValue(t.holdings!)}`}</p>
                                            <p className="holdings-quantity">{`${t.coin_amount_c} ${t.symbol}`}</p>
                                        </span>
                                    </td>
                                    <td>
                                        <span className='span-holdings' style={{color: lessThan(t.profitMargin!,0) ? '#E34234' : '#32CD32'}}>
                                            <p>{`${lessThan(t.profitMargin!,0) ? '- ' : '+ '}$${formatValue(getAbs(t.profit!))}`}</p>
                                            <span className='span-percent' >
                                                {lessThan(t.profitMargin!,0) ? <VscTriangleDown /> : <VscTriangleUp />}
                                                <p>{`${formatValue(getAbs(t.profitMargin!))}%`}</p>
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span className='span-actions'>
                                            <button className='more' onClick={() => onViewTransactions(t.coin_id)}><CgMoreVerticalO /></button>
                                            <button onClick={() => openRemove(t.coin_id)} className='remove'><RiDeleteBack2Line /></button>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                   
                </tbody>
            </table>
        </div>
    )
}

export default PortfolioAssets;
