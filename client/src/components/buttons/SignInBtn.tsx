import { SignInButton } from "../../styles/MaterialUi.styled";
import Loading from "./Loading";

interface SignInBtnProps {
    loading: boolean;
    text: string;
}

const SignInBtn: React.FC<SignInBtnProps> = ({loading, text}) => {
    return (
      <SignInButton variant='outlined' fullWidth type='submit'>
          {!loading && text} 
          {loading && 
              <Loading text='PLEASE WAIT'/>
          }
      </SignInButton>
    )
}

export default SignInBtn;
