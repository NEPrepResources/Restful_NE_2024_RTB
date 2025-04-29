import React, { useState, useEffect} from "react";
import Link , { useNavigate } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext";

const Home =()=>{
    const { user, logout }=useAuth();
    const [ employees, setEmployees ] = useState([])
    const navigate = useNavigate()
    const fetchEmployess = async () =>{
        try{
            const token = localStorage.getItem('token')
            const res = await fetch(`${import.meta.env.REACT_API_BASE_URL}/employees`,{
                headers:{ Authorization: `Bearer ${token}`}
            })

            if(!res.ok) throw Error('Failed to fetch employees');

            const data = await res.json()
            setEmployees(data)
        }catch(err){
            console.error(err)
        }
    }

    const handleLogout=()=>{
        logout(),
        navigate('/login')
    }

    const handleDelete = async(id) =>{
        if(!window.confirm('Are you sure you want to delete this employee?'))return;
        try{
            const token = localStorage.getItem('token')
            await fetch(`${import.meta.env.REACT_API_BASE_URL}/employee/${id}`,{
                method:'POST',
                headers: {Authorization: `Bearer ${token}`}
            })
            setEmployees(prev=>prev.filter(emp=>emp.id!==id))
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        fetchEmployess();
    }, [])

    return(
        <div className="min-h-screen p-6 bg-gray-100">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Welcome, {user?.names}</h1>
                <div className="flex gap-3">
                    <Link to='/add' className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                        +Add Employee
                    </Link>
                    <button onClick={handleLogout} className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            </header>
            <div className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-4">Employees</h2>
                {employees.length===0?(
                    <p>No employee found.</p>
                ):(
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Phone</th>
                                <th className="p-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp=>(
                                <tr key={emp.id} className="hover:bg-gray-100">
                                    <td className="p-2 border">{emp.firstName} {emp.firstName}</td>
                                    <td className="p-2 border">{emp.email}</td>
                                    <td className="p-2 border">{emp.telephone}</td>
                                    <td className="p-2 border flex gap-2 justify-center">
                                        <Link to={`/view/${emp.id}`} className="text-blue-600 hover:underline">View</Link>
                                        <Link to={`/edit/${emp.id}`} className="text-yellow-600 hover:underline">Edit</Link>
                                        <button
                                        onClick={()=>handleDelete(emp.id)}
                                        className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Home