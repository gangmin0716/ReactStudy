import type {ReactNode} from 'react';
import {UserContext, type User} from './UserContext';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({children}: UserProviderProps) => {
  const user: User = {
    name: '김민수',
    role: '학생',
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}