import {AiFillDelete, AiOutlinePlus} from 'react-icons/ai'
import { IPortfolioData } from '../../types';

interface PortfolioListProps {
    portfolios: IPortfolioData[]
    curPortfolio: number;
    onPflChange: (id: number) => void;
    onModalOpen: () => void;
}

const PortfolioList: React.FC<PortfolioListProps> = ({portfolios, onPflChange, curPortfolio, onModalOpen}) => {
    return (
        <div className='portfolios-list-container'>
        <div className='portfolio-list'>
            <h2>Your Portfolios</h2>
            {portfolios.map((p: IPortfolioData, idx: number) => {
                return (
                    <button 
                        className={curPortfolio === p.portfolio_id ?
                        'item active' : 'item'} key={idx}
                        onClick={() => onPflChange(p.portfolio_id)}
                    >
                        <div className='item-content'>
                            <p>{p.portfolio_name}</p>
                            {!p.main && 
                            <span><AiFillDelete /></span>}
                        </div>
                    </button>
                )
            })}

            <button className='add-item' onClick={onModalOpen}>
                <div>
                    <span><AiOutlinePlus /></span>
                    <h3>Create Portfolio</h3>
                </div>
            </button>
        </div>
    </div>
    )
}

export default PortfolioList
