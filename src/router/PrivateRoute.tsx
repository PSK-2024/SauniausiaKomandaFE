import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('apiToken');

  const isTokenValid = () => {
    return !!token;
  };

  return isTokenValid() ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
