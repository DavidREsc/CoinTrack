import LoginForm from "./LoginForm"
import LeftPanel from "./LeftPanel"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useAuth from "../../hooks/useLogin"
import '../../styles/auth.css'
import { IError, ILoginData } from "../../types"
//useNavigation for loading

const Login: React.FC = () => {

  const [error, setError] = useState<string>("")

  const navigate = useNavigate()
  const redirectToSignUp = () => navigate("/sign-up")
  const {login} = useAuth()
  const handleSubmit = async (loginData: ILoginData) => {
    try {
      const response = await login(loginData)
      console.log(response)
    } catch (error) {
      console.log(error)
        setError((error as IError).data.error)
    }
  }
  return (
    <div className='auth-container'>
			<LeftPanel onBtnClick={redirectToSignUp}/>
      <LoginForm onSubmit={handleSubmit} onError={error}/>
    </div>
  )
}

export default Login