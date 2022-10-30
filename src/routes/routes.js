import Login from '../screens/login'
import Signup from '../screens/signup'
import Home from '../screens/home'
import { useRoutes } from 'react-router-dom'
import Dashboard from '../screens/dashboard'
import Profile from '../screens/profile'

export default function Router () {
    return  useRoutes([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/home",
            element: <Home />
        },
        {
            path: "/home/dashboard",
            element: <Dashboard />
        },
        {
            path: "/home/profile",
            element: <Profile />
        },
    ])
}

