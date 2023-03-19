import { ButtonDemo } from "../../styles/MaterialUi.styled"
import Loading from "./Loading";

interface DemoButtonProps {
    text: string;
    loading: boolean;
    func: () => void;
}

const DemoButton: React.FC<DemoButtonProps> = ({loading, text, func}) => {
    return (
        <ButtonDemo variant='outlined' fullWidth type='button' onClick={func}>
          {!loading && text} 
          {loading && 
              <Loading text='PLEASE WAIT'/>
          }
      </ButtonDemo>
    )
}

export default DemoButton;
