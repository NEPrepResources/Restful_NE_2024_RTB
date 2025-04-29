import React, { createContext, useState, useContext } from 'react'
// const API_BASE_URL = import.meta.env.REACT_API_BASE_URL || 'http://localhost:5000'
const API_BASE_URL= 'http://localhost:5000'
const AuthContext=createContext()

export const useAuth=()=> useContext(AuthContext)



export const AuthProvider =({ children }) =>{
    const [ user, setUser ] = useState(null)

    const login = async( email, password)=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/login`,{
            method:'POST',
            headers:{'Content-Type':'applicatio/json'},
            body: JSON.stringify({email, password})
        });
        if(!res.ok) throw new Error('Login failed')

        const data = await res.json();
        localStorage.setItem('token', data.token);
        setUser(data.user)
    }

    const signup = async( names, email, password, confirmPassword )=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`,{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({names, email, password, confirmPassword})
        })

        if(!res.ok) throw new Error('Signup failed!')

        const data=await res.json()
        localStorage.setItem('token', data.token)
        setUser(data, user)
    }

    const logout=()=>{
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}