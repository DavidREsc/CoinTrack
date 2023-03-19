import LoginForm from "./LoginForm"
import LeftPanel from "./LeftPanel"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import '../../styles/auth.css'
import { IError, ILoginData } from "../../types"
import SignInBtn from "../buttons/SignInBtn"
import LoginImg from '../../assets/login.svg'
import LoadingPage from "../LoadingPage"
//useNavigation for loading

interface LoginProps {
  onUser: (user: string) => void
}

const Login: React.FC<LoginProps> = (props) => {

  const [error, setError] = useState<string>("")
  const {onUser} = props
  const [loading, setLoading] = useState<boolean>(false)
  const [demoLoading, setDemoLoading] = useState<boolean>(false)
  const [imgLoading, setImgLoading] = useState<boolean>(true)

  const navigate = useNavigate()
  const redirectToSignUp = () => navigate("/sign-up")
  const {login, demoLogin} = useAuth()
  
  useEffect(() => {
		const loadImage = () => {
			const img = new Image()
			img.src = LoginImg
			img.onload = handleImgLoad
		}
		loadImage()
	}, [])

  const handleImgLoad = useCallback(() => {
    setImgLoading(false)
  },[])

  const handleSubmit = async (loginData: ILoginData) => {
    try {
      setLoading(true)
      const response = await login(loginData)
      onUser(response.data.user)
    } catch (error) {
      setError((error as IError).data.error)
    } finally {
      setLoading(false)
    }
  }
  const handleDemoLogin = async () => {
    try {
      setDemoLoading(true)
      const response = await demoLogin()
      onUser(response.data.user)
    } catch (error) {
      setError((error as IError).data.error)
    } finally {
      setDemoLoading(false)
    }
  }
  
  return (
    imgLoading ? <LoadingPage /> : 
    <div className='auth-container'>
			<LeftPanel onBtnClick={redirectToSignUp} />
      <LoginForm onSubmit={handleSubmit} onDemoLogin={handleDemoLogin} onError={error} loading={loading} demoLoading={demoLoading}/>
    </div>
  )
}

export default Login