import { ButtonDelete} from '../../styles/MaterialUi.styled'
import Loading from './Loading'

interface DeleteButtonProps {
  text: string;
  loading: boolean;
  deleteFunc: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
    const {text, loading, deleteFunc} = props
  return (
    <ButtonDelete variant='outlined' fullWidth type='button' onClick={deleteFunc}>
        {!loading && text}
        {loading && 
        <Loading text='PLEASE WAIT'/>
        }
    </ButtonDelete>
  )
}

export default DeleteButton
