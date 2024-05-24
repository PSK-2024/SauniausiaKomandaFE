import api from './api';

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
};

const getToken = () => {
  return localStorage.getItem('apiToken');
};

const isLoggedIn = () => {
  return !!getToken();
};

export const getUserData = async () => {
  const response = await api.get('api/Identity/user');
  console.log(response.data);
  return response.data;
};

export default { login, logout, isLoggedIn, getUserData };
