import {MdAccountBalance} from 'react-icons/md'
import {VscTriangleUp, VscTriangleDown} from 'react-icons/vsc'
import {RiCurrencyFill} from 'react-icons/ri'
import {GiReceiveMoney} from 'react-icons/gi'
import '../../styles/portfolioMetrics.css'
import { IPortfolioStats } from '../../types'
import { getAbs, formatValue, lessThan } from '../../utils/calculations'

interface PflMetricsProps {
    stats: IPortfolioStats
}

const PortfolioMetrics: React.FC<PflMetricsProps> = (props) => {
    const {stats} = props
    return (
        <div className='portfolio-metrics'>
                <div className='balance-profit'>
                    <span><MdAccountBalance /></span>
                    <div className='middle'>
                        <div className="left">
                            <h3>Total Value</h3>
                            <h2 title={`$${formatValue(stats.total_holdings)}`} className='total'>{`$${formatValue(stats.total_holdings)}`}</h2>
                        </div>
                        <div 
                            className="total-profit-margin"
                            style={{color: lessThan(stats.total_profit_margin, 0) ? 'red' : '#0BDA51'}}>
                            {
                                lessThan(stats.total_profit_margin, 0) ? 
                                <div><VscTriangleDown style={{color: 'red'}}/></div>
                                :
                                <div><VscTriangleUp style={{color: '#0BDA51'}}/></div>
                            }
                            <h2 title={`${formatValue(getAbs(stats.total_profit_margin,2))}%`}>{`${formatValue(getAbs(stats.total_profit_margin,2))}%`}</h2>
                        </div>
                    </div>
                    {
                        lessThan(stats.total_profit, 0) ?
                        <h2 style={{color: 'red'}}>{`- $${formatValue(getAbs(stats.total_profit))}`}</h2> :
                        <h2 title={`$${formatValue(getAbs(stats.total_profit))}`} style={{color: '#0BDA51'}}>{`+ $${formatValue(getAbs(stats.total_profit))}`}</h2>
                    }

                </div> 

                <div className='total-sold'>
                    <span><RiCurrencyFill /></span>
                    <div className='middle'>
                        <div className="left">
                            <h3>Total Sold</h3>
                            <h2 title={`$${formatValue(stats.total_amount_sold)}`} className='total'>{`$${formatValue(stats.total_amount_sold)}`}</h2>
                        </div>
                    </div>
                </div> 

                <div className='capital-gains'>
                    <span><GiReceiveMoney /></span>
                    <div className='middle'>
                        <div className="left">
                            <h3>Capital Gains</h3>
                            <h2 title={`$${formatValue(stats.capital_gains)}`} className='total'>{`$${formatValue(stats.capital_gains)}`}</h2>
                        </div>
                    </div>
                </div> 
        </div> 
    )
}

export default PortfolioMetrics
