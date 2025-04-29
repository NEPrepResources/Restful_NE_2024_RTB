import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () =>{
    const { login } = useAuth()
    const navigate = useNavigate()
    const [ formData, setFormData ]= useState({email:'', password:''})
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(' ')

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError('')
        setLoading(true)

        try{
            await login(formData.email, formData.password)
            navigate('/home')
        }catch(err){
            console.error(err)
            setError('Invalid credentials. Please try again!')
        }finally{
            setLoading(false)
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                    />
                    <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                    />
                    <button
                    type="submit"
                    className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50'
                    disabled={loading}
                    >
                        {loading ? 'logging in ...' : 'Login'}
                    </button>
                </form> 
                <p className="mt-4 text-sm text-center">
                    Don't have an account? {' '}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login