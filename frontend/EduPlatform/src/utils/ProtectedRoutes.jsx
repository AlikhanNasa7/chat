import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {isAuthenticated} = useAuth();
    console.log(432143214321, isAuthenticated);
    return isAuthenticated ? <Outlet>{children}</Outlet> : <Navigate to="/login"/>
}

export default ProtectedRoutes