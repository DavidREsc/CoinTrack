import {Route, Routes} from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'


const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sign-up' element={<Signup />} />
        </Routes>
    )
}

export default App
