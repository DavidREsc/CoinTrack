
interface CoinTitleProps {
    name: string;
    icon: string;
    price: string;
}

const CoinTitle: React.FC<CoinTitleProps> = ({name, icon, price}) => {
    return (
        <div className='coin-title'>
            <span>
                <img src={icon}/>
                <h1>{name}</h1>
            </span>
            <h1>{price}</h1>
        </div>
    )
}

export default CoinTitle;
