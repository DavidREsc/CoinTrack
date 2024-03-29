import { Outlet, useOutletContext} from "react-router-dom"
import Sidebar from "./Sidebar"
import '../styles/dashboard.css'
import { CoinsProvider } from "../contexts/CoinsProvider"
import Menu from "./Menu"
import { useState, useEffect } from "react"
import initSocket from "../hooks/initSocket"
import { Socket } from "socket.io-client"

interface DashBoardProps {
    onLogout: () => void;
}
type SocketContextType = {socket: Socket}

const Dashboard: React.FC<DashBoardProps> = ({onLogout}) => {
    const [active, setActive] = useState<boolean>(false)
    const handleSidebar = () => {
        setActive(prevState => !prevState)
    }

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

export function useSocket() {
    return useOutletContext<SocketContextType>()
}