import Logo from '../assets/logo.png'
import {MdClose, MdDashboard, MdAnalytics} from 'react-icons/md'
import {SiMarketo} from 'react-icons/si'
import {IoMdSettings} from 'react-icons/io'
import {ImNewspaper} from 'react-icons/im'
import { NavLink } from 'react-router-dom'
import {BiLogOutCircle} from 'react-icons/bi'
import '../styles/sidebar.css'

interface SidebarProps {
	active: boolean;
	onHideSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
	const {active, onHideSidebar} = props;
  return (
    <aside className={active ? 'active' : ''}>
			<div className='top'>
				<div className='logo'>
					<img src={Logo}/>
				</div>
				<div className='close' id='close-btn' onClick={onHideSidebar}>
					<span className='react-icons'><MdClose/></span>
				</div>
			</div>

				<div className='sidebar'>
					<NavLink to='portfolio' className='nav-links'>
						<span className='react-icons'><MdDashboard /></span>
						<h3>Portfolio</h3>
					</NavLink>
					<NavLink to='analytics' className='nav-links'>
						<span className='react-icons'><MdAnalytics /></span>
						<h3>Analytics</h3>
					</NavLink>
					<NavLink to='browse' className='nav-links'>
						<span className='react-icons'><SiMarketo /></span>
						<h3>Browse</h3>
					</NavLink>
					<button className='side-btn'>
						<span className='react-icons'><ImNewspaper /></span>
						<h3>News</h3>
					</button>
					<button className='side-btn'>
						<span className='react-icons'><IoMdSettings /></span>
						<h3>Settings</h3>
					</button>
					<button className='logout-btn side-btn'>
						<span className='react-icons'><BiLogOutCircle /></span>
						<h3>Logout</h3>
					</button>
				</div>
    </aside>
  )
}

export default Sidebar