import CoinSelectForm from './CoinSelectForm';
import '../../styles/forms.css'
import Modal from '@mui/material/Modal';
import TnxForm from './TnxForm';
import { ICoin, TnxData } from '../../types';

interface AddTnxModalProps {
    open: boolean;
    loading: boolean;
    search: string;
    selectedCoin: ICoin | undefined;
    onSelect: (value: string | undefined) => void;
    onSearch: (value: string) => void;
    onClose: () => void;
    onSubmitTnx: (data: TnxData) => void;
}

const AddTnxModal: React.FC<AddTnxModalProps> = ({
    open,
    loading,
    search,
    selectedCoin,
    onClose,
    onSubmitTnx,
    onSelect,
    onSearch
}) => {

    const handleClose = () => {
        onSearch("")
        onSelect(undefined)
        onClose()
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)
    const handleBack = () => onSelect(undefined)

    return ( 
        <>
        {open &&
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className='form-container'>
                {!selectedCoin ?
                <CoinSelectForm 
                    handleClose={handleClose} 
                    searchTerm={search} 
                    handleSearch={handleSearch} 
                    handleSelected={onSelect}
                />
                :
                    <TnxForm 
                        selected={selectedCoin} 
                        loading={loading} 
                        onSubmitTnx={onSubmitTnx} 
                        handleClose={handleClose}
                        handleBack={handleBack}
                        />
                }
            </div>
        </Modal>}
        </>
    )
}

export default AddTnxModal;
