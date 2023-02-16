import '../../styles/forms.css'
import { useCoinsContext } from '../../contexts/CoinsProvider'

interface CoinScrollProps {
    onSelectCoin: (uuid: string) => void
    searchTerm: string;
}

const CoinScroll: React.FC<CoinScrollProps> = (props) => {
    const {onSelectCoin, searchTerm} = props
    const {coins} = useCoinsContext()
    return (
        <div className='list-container'>
            <ul className='list'>
                {coins.coins.filter((c,idx) => {
                    if (!searchTerm) return idx < 100
                    return c.name.toLowerCase().includes(searchTerm.toLowerCase())
                        || c.symbol.includes(searchTerm.toUpperCase())
                }).map((coin, idx) => {
                    return (
                        <li key={idx}>
                            <button onClick={() => onSelectCoin(coin.uuid)}>
                                <img src={coin.iconUrl} />
                                <p>{coin.name} <b>{coin.symbol.toUpperCase()}</b></p>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CoinScroll