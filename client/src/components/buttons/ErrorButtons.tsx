import { useNavigate, useLocation } from "react-router-dom"

const ErrorButtons: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleNavigation = () => {
        if (location.pathname === '/dashboard/portfolio') {
            return navigate(0)
        }
        navigate('/dashboard/portfolio')
    }
    return (
        <div className='error-buttons'>
            <button onClick={handleNavigation}>RETURN HOME</button>
            <button>REPORT PROBLEM</button>
        </div>
    )
}

export default ErrorButtons;
