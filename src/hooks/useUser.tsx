import { createContext, useContext } from 'react';
import useSWR from 'swr';

interface User {
  gender: '남자';
  ageRange: '20대 초반';
}

export const useUserProvider = () => {
  const { data: user } = useSWR<User>('/user');

  return { user };
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
