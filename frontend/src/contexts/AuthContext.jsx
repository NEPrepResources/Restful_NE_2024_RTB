import React, { createContext, useState, useContext, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        console.log('Attempting login with:', email);
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
      
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Login failed');
        }
      
        const data = await res.json();
        console.log('Login response data:', data);
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Ensure this is the last state update
        setUser(data.user);
        console.log('User state set to:', data.user);
      };

    const signup = async (name, email, password, confirmPassword) => {
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const text = await res.text();
        if (!res.ok) {
            try {
                const json = JSON.parse(text);
                throw new Error(json.message || 'Signup failed');
            } catch (e) {
                throw new Error(text || 'Signup failed');
            }
        }

        const data = JSON.parse(text);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

useEffect(() => {
    console.log('AuthProvider mounting - checking localStorage');
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('Found token:', !!token);
    console.log('Found user:', storedUser);
  
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Setting user from localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);
    

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
