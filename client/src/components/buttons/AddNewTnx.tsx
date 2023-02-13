import useModal from "../../hooks/useModal";
import BrowseForm from "../forms/BrowseForm";

const AddNewTnx: React.FC = () => {
    const {open, handleOpen, handleClose} = useModal()
    return (
        <>
            <button onClick={handleOpen} className='add-tnx'>Add New</button>
            <BrowseForm open={open} handleClose={handleClose}/>
        </>
    )
}

export default AddNewTnx;
