import { createContext, useContext } from 'react';
import useSWR from 'swr';
import { login } from '../api/auth';

interface User {
  gender: '남자';
  ageRange: '20대 초반';
}

export const useUserProvider = () => {
  const { data: user, isLoading } = useSWR<User>('/user');
  const handleLogin = async (payload: Parameters<typeof login>[0]) => {
    try {
      const response = await login(payload);

      if (response.accessToken && response.refreshToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      } else {
        throw 'Invalid response from server';
      }
    } catch (err: any) {
      throw 'Login failed: ' + (err.response?.data?.message || err.message);
    }
  };

  return { user, login: handleLogin, loading: isLoading };
};

export const userContext = createContext<
  ReturnType<typeof useUserProvider> | undefined
>(undefined);

const useUser = () => {
  const value = useContext(userContext);
  if (value === undefined)
    throw new Error('useUser must be used within a UserProvider');
  return value;
};

export default useUser;
