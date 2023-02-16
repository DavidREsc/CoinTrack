import CoinScroll from './CoinScroll';
import { TextFieldSearch } from '../../styles/MaterialUi.styled';
import InputAdornment from '@mui/material/InputAdornment';
import {AiOutlineSearch} from 'react-icons/ai'
import {MdClose} from 'react-icons/md'

interface CoinSelectFormProps {
    searchTerm: string;
    handleClose: () => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelected: (uuid: string) => void
}

const CoinSelectForm: React.FC<CoinSelectFormProps> = ({
    searchTerm, handleClose, handleSearch, handleSelected
}) => {
    return (
        <>
            <div className='form-top'>
                <h2>Select Coin</h2>
                <button onClick={handleClose}><MdClose /></button>
            </div>
            <div className='input-search'>
                <TextFieldSearch
                    placeholder='Search...'
                    fullWidth
                    type='text'
                    inputRef={input => input && input.focus()}
                
                    autoComplete='off'
                    size='small'
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <CoinScroll searchTerm={searchTerm} onSelectCoin={handleSelected}/>
        </>
    )
}

export default CoinSelectForm;
