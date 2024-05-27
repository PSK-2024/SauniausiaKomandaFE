import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../api/authService';
import useLocalStorageToken from '../hooks/useLocalStorageToken';

const PrivateRoute = () => {
  const token = useLocalStorageToken('apiToken');
  return isTokenValid(token) ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
