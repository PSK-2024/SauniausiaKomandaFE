import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../api/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    setIsEmailValid(emailPattern.test(e.target.value));
  };

  const handleEmailBlur = () => {
    setIsEmailTouched(true);
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    setIsEmailValid(emailPattern.test(email));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isEmailValid) {
      alert('Please enter a valid email address.');
      return;
    }
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        navigate('/');
      } else {
        setError('Invalid email or password.');
        console.error(error);
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
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
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            type='email'
            error={!isEmailValid && isEmailTouched}
            helperText={
              !isEmailValid && isEmailTouched
                ? 'Please enter a valid email address'
                : ''
            }
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
          {/* <Button
            sx={{ margin: '8px 0px' }}
            fullWidth
            variant='outlined'
            color='secondary'
            onClick={handleSignUp}
          >
            Sign Up
          </Button> */}
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
