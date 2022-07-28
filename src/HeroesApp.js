import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/authContext'
import { authReducer } from './auth/authReducer'
import { AppRouter } from './routers/AppRouter'


const init = () => {
    return JSON.parse(localStorage.getItem('user')) || {logged: false};
}

export const HeroesApp = () => {

    const [user, dispatch ] =useReducer (authReducer, {}, init) //el authReducer va a tener el user y el dispatch

    useEffect(() => {
        if(!user) return;

        localStorage.setItem('user', JSON.stringify(user)); //loacl storage solo podemos grabar strings
        
    }, [user])

    return (
        <AuthContext.Provider value={{
            user,
            dispatch
        }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}
