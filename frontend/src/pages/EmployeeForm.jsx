import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { recordAction } from '../utils/contract'

const EmployeeForm = ({ employee, actionType }) =>{
    const { user } = useAuth()
    const [ formData, setFormData ] = useState(employee || {})

    const handleSubmit = async(e) =>{
        e.preventDefault()

        await recordAction(formData.id || 0, actionType);
        alert('Employee is recorded on blockchain!')
    };

    return(
        <form onSubmit={handleSubmit} className='space-y-4'>
            <input
            type='text'
            name='firstname'
            value={formData.firstname}
            onChange={(e)=>setFormData({...formData, firstname: e.target.value})}
            placeholder='Your firstname'
            className='input'
            />
            <input
            type='text'
            name='lastname'
            value={formData.lastname}
            onChange={(e)=>setFormData({...formData, lastname: e.target.value})}
            placeholder='Your lastname'
            className='input'
            />
            <input
            type='text'
            name='national_identity'
            value={formData.national_identity}
            onChange={(e)=>setFormData({...formData, national_identity: e.target.value})}
            placeholder='Your NID'
            className='input'
            />
            <input
            type='tel'
            name='telephone'
            value={formData.telephone}
            onChange={(e)=>setFormData({...formData, telephone: e.target.value})}
            placeholder='Your telephone'
            className='input'
            />
            <input
            type='email'
            name='email'
            value={formData.email}
            onChange={(e)=>setFormData({...formData, email: e.target.value})}
            placeholder='Your email'
            className='input'
            />
            <input
            type='text'
            name='department'
            value={formData.department}
            onChange={(e)=>setFormData({...formData, department: e.target.value})}
            placeholder='Your department'
            className='input'
            />
            <input
            type='text'
            name='position'
            value={formData.position}
            onChange={(e)=>setFormData({...formData, position: e.target.value})}
            placeholder='Your position'
            className='input'
            />
            <input
            type='text'
            name='laptop_manufacturer'
            value={formData.laptop_manufacturer}
            onChange={(e)=>setFormData({...formData, laptop_manufacturer: e.target.value})}
            placeholder='Your laptop manufacturer'
            className='input'
            />
            <input
            type='text'
            name='laptop_model'
            value={formData.laptop_model}
            onChange={(e)=>setFormData({...formData, laptop_model: e.target.value})}
            placeholder='Your laptop model'
            className='input'
            />
            <input
            type='text'
            name='serial_number'
            value={formData.serial_number}
            onChange={(e)=>setFormData({...formData, serial_number: e.target.value})}
            placeholder='Your serial number'
            className='input'
            />
            <button type='submit' className='btn'>Add employee</button>
        </form>
    )
}

export default EmployeeForm