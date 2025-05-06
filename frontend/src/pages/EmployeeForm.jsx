import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
// import { recordAction } from '../utils/contract';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const EmployeeForm = ({ actionType }) => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        national_identity: '',
        telephone: '',
        email: '',
        department: '',
        position: '',
        laptop_manufacturer: '',
        laptop_model: '',
        serial_number: ''
    });

    useEffect(() => {
        if (actionType === 'update' && id) {
            const token = localStorage.getItem('token');
            axios.get(`${API_BASE_URL}/employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => setFormData(res.data))
            .catch(err => alert('Error loading the employee'));
        }
    }, [actionType, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(`Token available: ${token}`)

        try {
            if (actionType === 'add') {
                console.log(formData)
                await axios.post(`${API_BASE_URL}/employee`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                await axios.put(`${API_BASE_URL}/employee/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            // await recordAction(formData.id || 0, actionType);
            alert(`Employee ${actionType === 'update' ? 'updated' : 'added'} successfully!`);
            navigate('/home');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error saving employee!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-2 flex flex-col items-center justify-center p-10'>
            {[
                ['firstname', 'First name'],
                ['lastname', 'Last name'],
                ['national_identity', 'National ID'],
                ['telephone', 'Telephone'],
                ['email', 'Email'],
                ['department', 'Department'],
                ['position', 'Position'],
                ['laptop_manufacturer', 'Laptop manufacturer'],
                ['laptop_model', 'Laptop model'],
                ['serial_number', 'Serial number']
            ].map(([key, placeholder]) => (
                <input
                    key={key}
                    type={key === 'email' ? 'email' : key === 'telephone' ? 'tel' : 'text'}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className='input w-[50%] px-4 py-2 border rounded'
                    required
                />
            ))}            
            <button type='submit' className='btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                {actionType === 'add' ? 'Add employee' : 'Update employee'}
            </button>
        </form>
    );
};

export default EmployeeForm;