import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
    user?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    const {user} = props
    if (!user) {
        return <Navigate to={'/'} replace />
    }
    return <Outlet />
}

export default ProtectedRoute