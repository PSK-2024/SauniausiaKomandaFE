import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { fetchUserData } from '../state/thunk/userThunk';
import { isTokenValid } from '../api/authService';
import useLocalStorageToken from './useLocalStorageToken';

const useFetchUserData = () => {
  const dispatch = useAppDispatch();
  const token = useLocalStorageToken('apiToken');

  useEffect(() => {
    if (isTokenValid(token)) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);
};

export default useFetchUserData;
