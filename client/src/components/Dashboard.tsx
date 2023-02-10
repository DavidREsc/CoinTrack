import { Outlet, useNavigate} from "react-router-dom"
import Sidebar from "./Sidebar"
import '../styles/dashboard.css'
import { CoinsProvider } from "../contexts/CoinsProvider"

const Dashboard: React.FC = () => {

    return (
        <div className='dashboard-container'>
            <Sidebar />
            <CoinsProvider>
                <Outlet />
            </CoinsProvider>
        </div>
    )
}

export default Dashboard