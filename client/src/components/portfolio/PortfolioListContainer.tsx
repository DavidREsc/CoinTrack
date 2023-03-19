import '../../styles/portfoliosList.css'
import '../../styles/forms.css'
import { IError, IPortfolioData, PflData } from "../../types";
import { useState } from 'react';
import PortfolioList from './PortfolioList';
import useModal from '../../hooks/useModal';
import CreatePortfolioModal from '../forms/CreatePortfolioModal';
import RemoveModal from '../forms/RemoveModal';

interface PflListProps {
    portfolios: IPortfolioData[]
    curPortfolio: number;
    onPflChange: (id: number) => void;
    onCreatePortfolio: (data: PflData, cb: (e: IError | undefined) => void) => void
    onDeletePortfolio: (id: number, cb: (e: IError | undefined) => void) => void
}

const PortfolioListContainer: React.FC<PflListProps> = (props) => {
    const {portfolios, curPortfolio, onPflChange, onCreatePortfolio, onDeletePortfolio} = props
    const {open: createPflOpen, handleOpen: handleCreatePflOpen, handleClose: handleCreatePflClose} = useModal()
    const {open: deletePflOpen, handleOpen: handleDeletePflOpen, handleClose: handleDeletePflClose} = useModal()
    const [loading, setLoading] = useState<boolean>(false)
    const [selected, setSelected] = useState<number>()

    const handleCreatePortfolio = (data: PflData) => {
        setLoading(true)
        onCreatePortfolio(data, (e: IError | undefined) => {
            if (!e) {
                handleCreatePflClose()
            }
            setLoading(false) 
        })
    }
    const handleDeletePortfolio = () => {
        setLoading(true)
        onDeletePortfolio(selected!, (e: IError | undefined) => {
            if (!e) handleDeletePflClose()
            setLoading(false)
        })
    }
    const handleSelect = (id: number) => setSelected(id)

    return (
        <>
            <PortfolioList 
                portfolios={portfolios}
                curPortfolio={curPortfolio}
                onPflChange={onPflChange}
                onCreateModalOpen={handleCreatePflOpen}
                onDeleteModalOpen={handleDeletePflOpen}
                onSelect={handleSelect}
            />
            <CreatePortfolioModal
                open={createPflOpen}
                onModalClose={handleCreatePflClose} 
                onCreatePortfolio={handleCreatePortfolio}
                loading={loading}
            />
            <RemoveModal 
                open={deletePflOpen}
                onClose={handleDeletePflClose}
                title={'Delete Portfolio?'}
                text={'All assets and transactions associated with this portfolio will also be deleted'}
                loading={loading}
                deleteFunc={handleDeletePortfolio}
                onSelect={undefined}
            />
        </>
    )
}

export default PortfolioListContainer;
