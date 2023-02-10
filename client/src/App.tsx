import {Route, Routes} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Dashboard from './components/Dashboard'
import { useNavigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import { IError } from './types'
import Analytics from './components/analytics/Analytics'
import Portfolio from './components/portfolio/Portfolio'
import Browse from './components/browse/Browse'


const App: React.FC = () => {
    const [user, setUser] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const {verify} = useAuth()

    // Checks to see if user is authenticated
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await verify()
                handleUser(response.data.user)
            } catch (error) {
                setError((error as IError).data.error)
            } finally {
                setLoading(false)
            }
        }
        verifyUser()
    }, [])

    // Sets user state after login/signup and redirects to dashboard
    const handleUser = (newUser: string) => {
        setUser(newUser)
        navigate('/dashboard/portfolio')
    }
    return (
        loading ? <div>Loading...</div> 
        : error ? <div>Error</div> 
        :
            <Routes>
                <Route path='' element={<Login onUser={handleUser}/>} />
                <Route path='sign-up' element={<Signup onUser={handleUser}/>} />
                <Route element={<ProtectedRoute user={user}/>}>
                    <Route path='dashboard' element={<Dashboard />}>
                        <Route path='portfolio' element={<Portfolio />}/>
                        <Route path='analytics' element={<Analytics />}/>
                        <Route path='browse' element={<Browse />}/>
                    </Route>
                </Route>
            </Routes>
    )
}

export default App
