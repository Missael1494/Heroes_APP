import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext'

export const PublicRoute = ({children}) => {
    
    const { user } = useContext(AuthContext);
    

    return user.logged 
        ? <Navigate to='/marvel'/>
        :  children
    
}
