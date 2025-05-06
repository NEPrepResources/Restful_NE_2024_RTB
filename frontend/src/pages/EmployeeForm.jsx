import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const EmployeeForm = ({ employee = {}, actionType = 'add' }) => {
    const { user } = useAuth();
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (employee && employee.id) {
            setFormData(employee);
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = actionType === 'add' 
                ? 'http://localhost:5000/employee'
                : `http://localhost:5000/employee/${employee.id}`;
            
            const method = actionType === 'add' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Operation failed');
            }

            navigate('/home');
        } catch (err) {
            console.error('Form submission error:', err);
            setError(err.message || 'Failed to save employee');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: 'firstname', label: 'First Name', type: 'text' },
        { name: 'lastname', label: 'Last Name', type: 'text' },
        { name: 'national_identity', label: 'National ID', type: 'text' },
        { name: 'telephone', label: 'Telephone', type: 'tel' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'position', label: 'Position', type: 'text' },
        { name: 'laptop_manufacturer', label: 'Laptop Manufacturer', type: 'text' },
        { name: 'laptop_model', label: 'Laptop Model', type: 'text' },
        { name: 'serial_number', label: 'Serial Number', type: 'text' }
    ];

    return (
        <div className="container mx-auto px-4 py-8 ">
            <h2 className="text-2xl font-bold mb-6">
                {actionType === 'add' ? 'Add New Employee' : 'Edit Employee'}
            </h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    {fields.map(field => (
                        <div key={field.name} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/home')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : actionType === 'add' ? 'Add Employee' : 'Update Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;