import { Outlet, useNavigate} from "react-router-dom"
import Sidebar from "./Sidebar"
import '../styles/dashboard.css'
import { CoinsProvider } from "../contexts/CoinsProvider"
import Menu from "./Menu"
import { useState } from "react"

const Dashboard: React.FC = () => {
    const [active, setActive] = useState<boolean>(false)
    const handleSidebar = () => {
        setActive(prevState => !prevState)
    }

    return (
        <>
        <Menu onShowSidebar={handleSidebar}/>
        <div className='dashboard-container'>
            <Sidebar active={active} onHideSidebar={handleSidebar}/>
            <CoinsProvider>
                <Outlet />
            </CoinsProvider>
        </div>
        </>
    )
}

export default Dashboard