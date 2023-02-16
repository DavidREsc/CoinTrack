import { SubmitButton } from '../../styles/MaterialUi.styled'
import Loading from './Loading'

interface SubmitBtnProps {
    text: string;
    loading: boolean;
}

const SubmitBtn: React.FC<SubmitBtnProps> = (props) => {
    const {text, loading} = props

    return (
      <SubmitButton variant='outlined' fullWidth type='submit'>
          {!loading && text} 
          {loading && 
              <Loading text='PLEASE WAIT'/>
          }
      </SubmitButton>
    )
}

export default SubmitBtn
