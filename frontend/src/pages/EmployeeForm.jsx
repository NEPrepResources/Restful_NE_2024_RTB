import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const EmployeeForm = ({ employee = {}, actionType = 'add', onSubmit }) => {
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
        if (employee) setFormData(employee);
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            alert(`Employee ${actionType === 'update' ? 'updated' : 'added'} successfully!`);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
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
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                {actionType === 'update' ? 'Update Employee' : 'Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {actionType === 'update' ? 'Update Employee' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;