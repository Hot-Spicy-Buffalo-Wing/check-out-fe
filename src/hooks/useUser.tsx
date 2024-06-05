import { createContext, useContext } from 'react';

export const useUserProvider = () => {};

export const userContext = createContext<ReturnType<
  typeof useUserProvider
> | null>(undefined);

const useUser = () => {
  const value = useContext(userContext);
  if (value === undefined)
    throw new Error('useUser must be used within a UserProvider');
  return value;
};

export default useUser;
