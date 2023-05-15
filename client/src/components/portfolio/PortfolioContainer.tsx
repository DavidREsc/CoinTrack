import { IError, IPortfolio } from "../../types"
import PortfolioMetrics from "./PortfolioMetrics"
import PortfolioAssets from "./PortfolioAssets"
import AddTnxModal from "../forms/AddTnxModal"
import useModal from "../../hooks/useModal"
import { useState } from "react"
import { ICoin, TnxData } from "../../types"
import { useCoinsContext } from "../../contexts/CoinsProvider"
import RemoveModal from "../forms/RemoveModal"
import { useNavigate } from "react-router-dom"

interface PflContainerProps {
    portfolio: IPortfolio
    onAddTransaction: (data: TnxData, coin_id: string,
        cb: (e: IError | undefined) => void) => void;
    onRemoveAsset: (coin_id: string, cb: (e: IError | undefined) => void) => void
}

const PortfolioContainer: React.FC<PflContainerProps> = (props) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [selectedCoin, setSelectedCoin] = useState<ICoin>()

    const {portfolio, onAddTransaction, onRemoveAsset} = props
    const {open: addNew, handleOpen: openAddNew, handleClose: closeAddNew} = useModal()
    const {open: remove, handleOpen: openRemove, handleClose: closeRemove} = useModal()
    const {coinMap} = useCoinsContext()
    const navigate = useNavigate();

    

    const handleAddTnx = (data: TnxData) => {
        setLoading(true)
        onAddTransaction(data, selectedCoin!.uuid, (e) => {
            if (!e) {
                closeAddNew()
                setSelectedCoin(undefined)
            }
            setLoading(false)
        })  
    }
    const handleDeleteAsset = () => {
        setLoading(true)
        onRemoveAsset(selectedCoin!.uuid, (e) => {
            if (!e) {
                closeRemove()
                setSelectedCoin(undefined)
            }
            setLoading(false)
        })
    }

    // Handles search bar changes in the add tnx modal
    const handleSearch = (value: string) => setSearch(value)

    // Sets the selected asset/coin
    // Will trigger the tnx form to display if the add tnx modal is open
    const handleSelect = (value: string | undefined) => {
        if (value) {
            const coin = coinMap[value]
            setSelectedCoin(coin)
        }
        else setSelectedCoin(undefined)
    }

    // Sets selected asset to be removed and opens the remove modal for confirmation
    const handleRemoveModal = (value: string) => {
        handleSelect(value)
        openRemove()
    }

    const handleViewTransactions = (coin_id: string) => navigate(`${coin_id}/${portfolio.id}`);

    return (
        <main>
            <h1>Portfolio</h1>
            <PortfolioMetrics stats={portfolio.stats}/>
            <PortfolioAssets 
                transactions={portfolio.mergedTransactions} 
                openSelect={openAddNew} 
                openRemove={handleRemoveModal}
                onViewTransactions={handleViewTransactions}/>
            <AddTnxModal 
                open={addNew} 
                onClose={closeAddNew} 
                loading={loading} 
                onSubmitTnx={handleAddTnx}
                search={search}
                onSearch={handleSearch}
                selectedCoin={selectedCoin}
                onSelect={handleSelect}
            />
            <RemoveModal 
                open={remove} 
                onClose={closeRemove} 
                loading={loading}
                title='Remove Asset?'
                text='Any transactions associated with this asset will also be removed.'
                deleteFunc={handleDeleteAsset}
                onSelect={handleSelect}
            />
        </main>
    )
}

export default PortfolioContainer