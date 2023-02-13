import {GrMenu} from 'react-icons/gr'
import {BsFillSunFill} from 'react-icons/bs'
import {IoMdMoon} from 'react-icons/io'
import '../styles/menu.css'

interface MenuProps {
    onShowSidebar: () => void
}

const Menu: React.FC<MenuProps> = (props) => {
    const {onShowSidebar} = props
    return (
        <div className='menu-container'>
            <div className='menu'>
                <button className='menu-btn' onClick={onShowSidebar}>
                    <span>
                        <GrMenu />
                    </span>
                </button>
                <div className='theme-toggler-container'>
                    <button className='theme-toggler active'><BsFillSunFill /></button>
                    <button className='theme-toggler'><IoMdMoon /></button>
                </div>
                <div className='info'>
                    <p>User: <b>david.rapalae@gmail.com</b></p>
                </div>
            </div>
        </div>
    )
}

export default Menu;
