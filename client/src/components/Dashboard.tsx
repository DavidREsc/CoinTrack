import { Outlet} from "react-router-dom"
import Sidebar from "./Sidebar"
import '../styles/dashboard.css'
import { CoinsProvider } from "../contexts/CoinsProvider"
import Menu from "./Menu"
import { useState, useEffect } from "react"
import useSocket from "../hooks/useSocket"

interface DashBoardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashBoardProps> = ({onLogout}) => {
    const [active, setActive] = useState<boolean>(false)
    const handleSidebar = () => {
        setActive(prevState => !prevState)
    }
    const {socket} = useSocket()
    return (
        <>
        <Menu onShowSidebar={handleSidebar}/>
        <div className='dashboard-container'>
            <Sidebar active={active} onHideSidebar={handleSidebar} onLogout={onLogout}/>
            <CoinsProvider>
                <Outlet />
            </CoinsProvider>
        </div>
        </>
    )
}

export default Dashboard