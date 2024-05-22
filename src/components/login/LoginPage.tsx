import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import authService from '../../api/authService';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    //await authService.login({ username, password });

    const isLoginSuccessful = username === 'a' && password === 'a';

    if (isLoginSuccessful) {
      navigate('/');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Sign In
          </Button>
          <Button
            sx={{ margin: '8px 0px' }}
            fullWidth
            variant='outlined'
            color='secondary'
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
