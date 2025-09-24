import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner />
        </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
