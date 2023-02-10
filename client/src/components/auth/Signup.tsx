import { useNavigate } from "react-router-dom"
import { useState } from "react"
import RightPanel from "./RightPanel"
import SignupForm from "./SignupForm"
import useAuth from "../../hooks/useAuth"
import { IError, ISignupData } from "../../types"

interface SignupProps {
    onUser: (user: string) => void
}

const Signup: React.FC<SignupProps> = (props) => {
    const [error, setError] = useState<string>("")
    const {onUser} = props
    const navigate = useNavigate()
    const {signup} = useAuth()

    const redirectToLogin = () => navigate('/')
    const handleSubmit = async (signupData: ISignupData) => {
        try {
            const response = await signup(signupData)
            onUser(response.data.user)
        } catch (error) {
            setError((error as IError).data.error)
        }
    }
    return <div className='auth-container right'>
        <SignupForm onSubmit={handleSubmit} onError={error}/>
        <RightPanel onBtnClick={redirectToLogin}/>
    </div>
}

export default Signup