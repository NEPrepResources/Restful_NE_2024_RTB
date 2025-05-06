import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ViewEmployee = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchEmployee = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/employee/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch employee');
            }

            const data = await response.json();
            setEmployee(data);
        } catch (err) {
            console.error('Error fetching employee:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/employee/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }

            navigate('/home');
        } catch (err) {
            console.error('Error deleting employee:', err);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    if (loading) return <div className="text-center py-8">Loading employee details...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    if (!employee) return <div className="text-center py-8">Employee not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <Link 
                    to="/home" 
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Employees
                </Link>
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate(`/update/${id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        Edit Employee
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Delete Employee
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">
                        {employee.firstname} {employee.lastname}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Personal Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-medium">{employee.firstname} {employee.lastname}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">National ID</p>
                                    <p className="font-medium">{employee.national_identity}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{employee.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Telephone</p>
                                    <p className="font-medium">{employee.telephone}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Job Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Department</p>
                                    <p className="font-medium">{employee.department}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Position</p>
                                    <p className="font-medium">{employee.position}</p>
                                </div>
                            </div>

                            <h2 className="text-lg font-semibold mt-8 mb-4 border-b pb-2">Equipment Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Laptop Manufacturer</p>
                                    <p className="font-medium">{employee.laptop_manufacturer}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Laptop Model</p>
                                    <p className="font-medium">{employee.laptop_model}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Serial Number</p>
                                    <p className="font-medium">{employee.serial_number}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee;