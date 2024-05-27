import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../api/authService';
//import { fetchUserData } from '../../state/thunk/userThunk';
//import { useAppDispatch } from '../../app/hooks';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  //const dispatch = useAppDispatch();

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  const handleEmailBlur = () => {
    setIsEmailTouched(true);
    setIsEmailValid(validateEmail(email));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!isEmailTouched) {
      setIsEmailTouched(true);
      setIsEmailValid(validateEmail(email));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsEmailTouched(true);
    setIsEmailValid(validateEmail(email));
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        //dispatch(fetchUserData());
        navigate('/');
      } else {
        setError('Credentials are invalid.');
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
        {error && (
          <Box mt={2}>
            <Alert severity='error'>{error}</Alert>
          </Box>
        )}
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
            onFocus={handleEmailBlur}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
