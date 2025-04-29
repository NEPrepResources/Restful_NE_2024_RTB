import React, { useState, useEffect, act } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { recordAction } from '../utils/contract'

const EmployeeForm = ({ employee={}, actionType='add', onSubmit }) =>{
    const { user } = useAuth()
    const [ formData, setFormData ] = useState({
        firstname:'',
        lastname:'',
        national_identity:'',
        telephone:'',
        email:'',
        department:'',
        position:'',
        laptop_manufacturer:'',
        laptop_model:'',
        serial_number:''
    })

    useEffect(()=>{
        if(employee) setFormData(employee);
    },[employee])

    const handleChange = (e)=>{
        const { name, value } =e.target
        setFormData((prev) =>({...prev, [name]: value}))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()

        if (onSubmit) await onSubmit(formData); 

        await recordAction(formData.id || 0, actionType);
        alert(`Employee ${actionType === 'update' ? 'updated' : 'added' } and recorded on blockchain successfully!`)
    };

    return(
        <form onSubmit={handleSubmit} className='space-y-4'>
            {[
                ['firstName', 'First name'],
                ['lastName', 'Last name'],
                ['national_identity', 'National ID'],
                ['telephone', 'Telephone'],
                ['email', 'Email'],
                ['department', 'Department'],
                ['position', 'Position'],
                ['laptop_manufacturer', 'Laptop manufacturer'],
                ['laptop_model', 'Laptop model'],
                ['serial_number', 'Serial number']
            ].map(([key, placeholder])=>(
                <input
                key={key}
                type={key === 'email' ? 'email' : key === 'telephone' ? 'tel' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={placeholder}
                className='input w-full px-4 py-2 border rounded'
                required
                />
            ))}            
            <button type='submit' className='btn btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                {actionType === 'update' ? 'Update employee' : 'Add employee'}
            </button>
        </form>
    )
}

export default EmployeeForm