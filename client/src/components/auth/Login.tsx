import LoginForm from "./LoginForm"
import LeftPanel from "./LeftPanel"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import '../../styles/auth.css'
import { IError, ILoginData } from "../../types"
//useNavigation for loading

interface LoginProps {
  onUser: (user: string) => void
}

const Login: React.FC<LoginProps> = (props) => {

  const [error, setError] = useState<string>("")
  const {onUser} = props

  const navigate = useNavigate()
  const redirectToSignUp = () => navigate("/sign-up")
  const {login, demoLogin} = useAuth()
  const handleSubmit = async (loginData: ILoginData) => {
    try {
      const response = await login(loginData)
      onUser(response.data.user)
    } catch (error) {
      setError((error as IError).data.error)
    }
  }
  const handleDemoLogin = async () => {
    try {
      const response = await demoLogin()
      onUser(response.data.user)
    } catch (error) {
      setError((error as IError).data.error)
    }
  }
  return (
    <div className='auth-container'>
			<LeftPanel onBtnClick={redirectToSignUp}/>
      <LoginForm onSubmit={handleSubmit} onDemoLogin={handleDemoLogin} onError={error}/>
    </div>
  )
}

export default Login