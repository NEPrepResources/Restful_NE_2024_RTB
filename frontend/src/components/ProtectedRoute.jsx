// ProtectedRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import EmployeeForm from '../pages/EmployeeForm';
import ViewEmployee from '../pages/ViewEmployee';
import PrivateRoute from './PrivateRoute';

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/add" element={<PrivateRoute><EmployeeForm actionType="add" /></PrivateRoute>} />
      <Route path="/update/:id" element={<PrivateRoute><EmployeeForm actionType="update" /></PrivateRoute>} />
      <Route path="/view/:id" element={<PrivateRoute><ViewEmployee /></PrivateRoute>} />
    </Routes>
  );
};

export default ProtectedRoutes;
