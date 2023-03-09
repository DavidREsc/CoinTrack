import '../../styles/portfoliosList.css'
import '../../styles/forms.css'
import { IError, IPortfolioData, PflData } from "../../types";
import { useState } from 'react';
import PortfolioList from './PortfolioList';
import useModal from '../../hooks/useModal';
import CreatePortfolioModal from '../forms/CreatePortfolioModal';

interface PflListProps {
    portfolios: IPortfolioData[]
    curPortfolio: number;
    onPflChange: (id: number) => void;
    onCreatePortfolio: (data: PflData, cb: (e: IError | undefined) => void) => void
}

const PortfolioListContainer: React.FC<PflListProps> = (props) => {
    const {portfolios, curPortfolio, onPflChange, onCreatePortfolio} = props
    const {open: createPflOpen, handleOpen: handleCreatePflOpen, handleClose: handleCreatePflClose} = useModal()
    const [loading, setLoading] = useState<boolean>(false)

    const handleCreatePortfolio = (data: PflData) => {
        setLoading(true)
        onCreatePortfolio(data, (e: IError | undefined) => {
            if (!e) {
                handleCreatePflClose()
            }
            setLoading(false) 
        })
    }
    return (
        <>
            <PortfolioList 
                portfolios={portfolios}
                curPortfolio={curPortfolio}
                onPflChange={onPflChange}
                onModalOpen={handleCreatePflOpen}
            />
            <CreatePortfolioModal
                open={createPflOpen}
                onModalClose={handleCreatePflClose} 
                onCreatePortfolio={handleCreatePortfolio}
                loading={loading}
            />
        </>
    )
}

export default PortfolioListContainer;
