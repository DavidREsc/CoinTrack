import { IError, IPortfolio } from "../../types"
import PortfolioMetrics from "./PortfolioMetrics"
import PortfolioAssets from "./PortfolioAssets"
import AddTnxModal from "../forms/AddTnxModal"
import useModal from "../../hooks/useModal"
import { useState } from "react"
import { ICoin, TnxData } from "../../types"
import { useCoinsContext } from "../../contexts/CoinsProvider"

interface PflContainerProps {
    portfolio: IPortfolio
    onAddTransaction: (data: TnxData, coin_id: string, portfolio_id: number,
        cb: (e: IError | undefined) => void) => void;
}

const PortfolioContainer: React.FC<PflContainerProps> = (props) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [selectedCoin, setSelectedCoin] = useState<ICoin>()

    const {portfolio, onAddTransaction} = props
    const {open, handleOpen, handleClose} = useModal()
    const {coinMap} = useCoinsContext()

    const handleAddTnx = (data: TnxData) => {
        setLoading(true)
        onAddTransaction(data, selectedCoin!.uuid, portfolio.id, (e) => {
            setLoading(false)
            if (!e) {
                handleClose()
                setSelectedCoin(undefined)
            }
        })  
    }
    const handleSearch = (value: string) => setSearch(value)
    const handleSelect = (value: string | undefined) => {
        if (value) {
            const coin = coinMap[value]
            setSelectedCoin(coin)
        }
        else setSelectedCoin(undefined)
    }

    return (
        <main>
            <h1>Portfolio</h1>
            <PortfolioMetrics stats={portfolio.stats}/>
            <PortfolioAssets transactions={portfolio.mergedTransactions} openSelect={handleOpen} />
            <AddTnxModal 
                open={open} 
                onClose={handleClose} 
                loading={loading} 
                onSubmitTnx={handleAddTnx}
                search={search}
                onSearch={handleSearch}
                selectedCoin={selectedCoin}
                onSelect={handleSelect}
            />
        </main>
    )
}

export default PortfolioContainer