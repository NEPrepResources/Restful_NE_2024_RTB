import React, { createContext, useState, useContext } from 'react'
const API_BASE_URL= 'http://localhost:5000'
const AuthContext=createContext()

export const useAuth=()=> useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },  // Fixed typo
                body: JSON.stringify({ email, password })
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Login failed')
            }

            const data = await res.json()
            
            if (!data.token) {
                throw new Error('No authentication token received')
            }

            localStorage.setItem('token', data.token)
            setUser(data.user || { email })  // Fallback if user data not returned
            return data
        } catch (err) {
            console.error('Login error:', err)
            throw err
        }
    }

    const signup = async (names, email, password, confirmPassword) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: names,  // Changed to match backend expectation
                    email, 
                    password, 
                    confirmPassword 
                })
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Signup failed!')
            }

            const data = await res.json()
            localStorage.setItem('token', data.token)
            setUser(data.user || { email })
            return data
        } catch (err) {
            console.error('Signup error:', err)
            throw err
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}