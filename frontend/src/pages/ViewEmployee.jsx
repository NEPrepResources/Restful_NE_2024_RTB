import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ViewEmployee =()=>{
    const { id } =useParams()
    const [employee, setEmployee]=useState(null)

    const fetchEmployee = async()=>{
        try{
            const token=localStorage.getItem('token');
            const res= await fetch(`http://localhost:5000/employee/${id}`,{
                headers: {Authorization: `Bearer ${token}`}
            });

            if(!res.ok) throw new Error('Failed to fetch employee');

            const data= await res.json()
            setEmployee(data)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchEmployee();
    }, [])

    if(!employee) return <p className="p-4">Loading employee...</p>;

    return(
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="mb-4">
                <Link to='/home' className="text-blue-600 hover:underline">&larr;Back to home</Link>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Employee details</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><strong>Name: </strong>{employee.firstname} {employee.lastname}</div>
                    <div><strong>Email: </strong>{employee.email}</div>
                    <div><strong>Phone: </strong>{employee.telephone}</div>
                    <div><strong>NID: </strong>{employee.national_identity}</div>
                    <div><strong>Department: </strong>{employee.department}</div>
                    <div><strong>Position: </strong>{employee.position}</div>
                    <div><strong>Laptop model: </strong>{employee.laptop_model}</div>
                    <div><strong>Serial number: </strong>{employee.serial_number}</div>
                </div>
            </div>
        </div>
    )
}

export default ViewEmployee