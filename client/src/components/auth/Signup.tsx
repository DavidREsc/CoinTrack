import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import RightPanel from "./RightPanel"
import SignupForm from "./SignupForm"
import useAuth from "../../hooks/useAuth"
import { IError, ISignupData } from "../../types"
import SignupImg from '../../assets/signup.svg'
import LoadingPage from "../LoadingPage"


interface SignupProps {
    onUser: (user: string) => void
}

const Signup: React.FC<SignupProps> = (props) => {
    const [error, setError] = useState<string>("")
    const {onUser} = props
    const navigate = useNavigate()
    const {signup} = useAuth()
    const [imgLoading, setImgLoading] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    const redirectToLogin = () => navigate('/')

    useEffect(() => {
		const loadImage = () => {
			const img = new Image()
			img.src = SignupImg
			img.onload = handleImgLoad
		}
		loadImage()
	}, [])

  const handleImgLoad = useCallback(() => {
    setImgLoading(false)
  },[])


    const handleSubmit = async (signupData: ISignupData) => {
        try {
            setLoading(true)
            const response = await signup(signupData)
            onUser(response.data.user)
        } catch (error) {
            setError((error as IError).data.error)
        } finally {
            setLoading(false)
        }
    }
    return (
        imgLoading ? <LoadingPage /> : 
        <div className='auth-container right'>
            <SignupForm onSubmit={handleSubmit} onError={error} loading={loading}/>
            <RightPanel onBtnClick={redirectToLogin}/>
        </div>
    )
}

export default Signup