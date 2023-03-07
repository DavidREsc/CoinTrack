import {VscTriangleUp, VscTriangleDown} from 'react-icons/vsc'
import { ICoin } from '../../types'
import { formatValue, lessThan, getAbs } from "../../utils/calculations"
import Pagination from './Pagination'

interface CoinTableProps {
    coins: ICoin[]
    page: number;
    interval: number;
    onCoinSelect: (uuid: string) => void
}

const CoinTable: React.FC<CoinTableProps> = ({coins, page, interval, onCoinSelect}) => {
    return (
        <>
        <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th className='h-name'>Name</th>
                        <th>Symbol</th>
                        <th>24h</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.slice(page * interval, (page * interval) + interval).map((c, idx) => {
                        return (
                        <tr key={idx}>
                            <td>{c.rank}</td>
                            <td className='c-name'>
                                <button onClick={() => onCoinSelect(c.uuid)}>
                                    <img src={c.iconUrl}/>
                                    <p className='coin-name'>{c.name}</p>
                                </button>
                            </td> 
                            <td>{c.symbol}</td>
                            <td>
                                <span className='span-percent' style={{color: lessThan(c.change!,0) ? '#E34234' : '#32CD32'}}>
                                    {lessThan(c.change!,0) ? <VscTriangleDown /> : <VscTriangleUp />}
                                    <p style={{color: lessThan(c.change!,0) ? '#E34234' : '#32CD32'}}>{`${formatValue(getAbs(c.change!))}%`}</p>
                                </span>
                            </td>
                            <td>{`$${formatValue(c.price)}`}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default CoinTable;
