import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup =()=>{
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [ formData, setFormData ] = useState({
        names:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')

    const handleChange = (e)=>{
        setFormData(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('')
        setLoading(true)

        try{
            await signup(formData.names, formData.email, formData.password, formData.confirmPassword);
            navigate('/login')
        }catch(err){
            console.error(err)
            setError('Signup failed. Try with other credentials')
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    name="names"
                    placeholder="Names"
                    value={formData.names}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                     />
                     <input
                     type="email"
                     name="email"
                     placeholder="Email"
                     value={formData.email}
                     onChange={handleChange}
                     className="w-full border px-4 py-2 rounded"
                     required
                     />
                     <input 
                     type="password"
                     name="password"
                     placeholder="Password"
                     value={formData.password}
                     onChange={handleChange}
                     className="w-full border px-4 py-2 rounded"
                     required
                     />
                     <input 
                     type="password"
                     name="confirmPassword"
                     placeholder="Confirm password"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     className="w-full border px-4 py-2 rounded"
                     required
                     />
                     <button 
                     type="submit"
                     className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                     disabled={loading}
                     >
                        {loading ?'Signing up...':'Signup'}
                     </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account? {' '}
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    )
} 

export default Signup 