import {MdClose} from 'react-icons/md'
import { useState } from 'react';
import '../../styles/forms.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface BrowseFormProps {
    open: boolean;
    handleClose: () => void
}

const BrowseForm: React.FC<BrowseFormProps> = (props) => {
    const {open, handleClose} = props
    return ( 
        <>
        {open &&
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className='form'>
                <div>
                    Form
                </div>
            </div>
        </Modal>}
        </>
    )
}

export default BrowseForm;
