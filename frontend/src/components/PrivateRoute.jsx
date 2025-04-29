import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
  
    console.log('PrivateRoute check - user:', user, 'loading:', loading);
  
    if (loading) {
      console.log('PrivateRoute - waiting for auth initialization');
      return <div>Loading authentication...</div>;
    }
  
    if (!user) {
      console.log('PrivateRoute - no user, redirecting to login');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    console.log('PrivateRoute - allowing access');
    return children;
  };

  export default PrivateRoute