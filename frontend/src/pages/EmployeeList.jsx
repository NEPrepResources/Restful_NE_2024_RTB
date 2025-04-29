import React, { useState, useEffect } from "react";
import axios from 'axios'

const EmployeeLsist = () =>{
    const [employees, setEmployees ] = useState([]);

    useEffect(()=>{
        const fetchEmployees = async () =>{
            const response = await axios.get('/api/employees');
            setEmployees(response.data);    
        };
        fetchEmployees()
    }, []);

    return(
        <div>
            <h2 className="text-2xl">Employee List</h2>
            <ul>
                {employees.map((emp)=>(
                    <li key={emp.id}>
                        {emp.firstname} {emp.lastname} - {emp.position}
                        <button className="btn">View</button>
                        <button className="btn">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EmployeeLsist;