import Modal from '@mui/material/Modal';
import DeleteButton from '../buttons/DeleteButton';
import { CancelButton } from '../../styles/MaterialUi.styled';

interface RemoveModal {
    open: boolean;
    onClose: () => void;
    title: string;
    text: string;
    loading: boolean;
    deleteFunc: () => void;
    onSelect: (value: string | undefined) => void;
}

const RemoveModal: React.FC<RemoveModal> = ({open, onClose, text, title, loading, deleteFunc, onSelect}) => {
    const handleClose = () => {
        onSelect(undefined)
        onClose()
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
          <div className='form-container'>
				<h2 className='delete-asset-form-title'>{title}</h2>
				<p className='form-text'>{text}</p>
				<div className='delete-asset-form-btns'>
					<DeleteButton text='Remove' deleteFunc={deleteFunc} loading={loading}/>
					<CancelButton onClick={handleClose}>Cancel</CancelButton>
				</div>
			</div>
        </Modal>
    )
}

export default RemoveModal;
