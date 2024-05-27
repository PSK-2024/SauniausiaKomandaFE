import api from './api';
import { jwtDecode } from 'jwt-decode';

export interface LoginRequest {
  email: string;
  password: string;
}

const login = (request: LoginRequest) =>
  api
    .post('api/Identity/login', request)
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem('apiToken', response.data.token);
        return { success: true };
      }
      return { success: false };
    })
    .catch(error => {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred',
      };
    });

const logout = () => {
  localStorage.removeItem('apiToken');
  window.location.href = '/login';
};

const getToken = () => {
  return localStorage.getItem('apiToken');
};

const isLoggedIn = () => {
  return !!getToken();
};

export const getUserData = async () => {
  const response = await api.get('api/Identity/user');
  return response.data;
};

export const isTokenValid = (token: string | null) => {
  if (!token) {
    return false;
  }

  try {
    const { exp } = jwtDecode(token);
    const isValid = !(exp && Date.now() >= exp * 1000);
    console.log('isValid', isValid);
    if (!isValid) {
      logout();
    }
    return isValid;
  } catch (e) {
    logout();
    return false;
  }
};

export default { login, logout, isLoggedIn, getUserData, isTokenValid };
