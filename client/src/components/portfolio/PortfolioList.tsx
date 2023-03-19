import {AiFillDelete, AiOutlinePlus} from 'react-icons/ai'
import { IPortfolioData } from '../../types';

interface PortfolioListProps {
    portfolios: IPortfolioData[]
    curPortfolio: number;
    onPflChange: (id: number) => void;
    onCreateModalOpen: () => void;
    onDeleteModalOpen: () => void;
    onSelect: (id: number) => void;
}

const PortfolioList: React.FC<PortfolioListProps> = ({
    portfolios,
    onPflChange,
    curPortfolio,
    onCreateModalOpen,
    onDeleteModalOpen,
    onSelect
}) => {
    const handleDeleteClick = (e: unknown, id: number) => {
        (e as Event).stopPropagation()
        onSelect(id)
        onDeleteModalOpen()
    }
    return (
        <div className='portfolios-list-container'>
        <ul className='portfolio-list'>
            <h2>Your Portfolios</h2>
            {portfolios.map((p: IPortfolioData, idx: number) => {
                return (
                    <li className='portfolio-item' key={idx}>
                        <button 
                            className={curPortfolio === p.portfolio_id ?
                            'item active' : 'item'} 
                            onClick={() => onPflChange(p.portfolio_id)}
                        >
                            <div className='item-content'>
                                <p>{p.portfolio_name}</p>
                                
                            </div>
                        </button>
                        <button className='delete-pfl-btn' onClick={(e) => handleDeleteClick(e, p.portfolio_id)}><AiFillDelete /></button>
                    </li>
                )
            })}

            <button className='add-item' onClick={onCreateModalOpen}>
                <div>
                    <span><AiOutlinePlus /></span>
                    <h3>Create Portfolio</h3>
                </div>
            </button>
        </ul>
    </div>
    )
}

export default PortfolioList
