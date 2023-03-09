import { Modal } from "@mui/material"
import '../../styles/forms.css'
import { PflData } from "../../types"
import CreatePortfolioForm from "./CreatePortfolioForm"
import {MdClose} from 'react-icons/md'

interface CreatePortfolioModalProps {
    open: boolean;
    onModalClose: () => void
    onCreatePortfolio: (data: PflData) => void;
    loading: boolean;
}

const CreatePortfolioModal: React.FC<CreatePortfolioModalProps> = ({open, onModalClose, loading, onCreatePortfolio}) => {

    return (
        <>
            <Modal
                open={open}
                onClose={onModalClose}
            >
                <>
                <div className='form-top'>
                    <h2>Create New Portfolio</h2>
                    <button onClick={onModalClose} type='button'><MdClose /></button>
                </div>
                <CreatePortfolioForm 
                    loading={loading}
                    onCreatePortfolio={onCreatePortfolio}
                />
                </>
            </Modal>
        </>
    )
}

export default CreatePortfolioModal;
