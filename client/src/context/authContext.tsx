import React, { useMemo } from 'react';

interface IUser {
  accessToken: string;
  userId: string;
  isAdmin: boolean;
}

interface IAuthContext {
  currentUser: IUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<IUser>();

  // const value = {
  //   currentUser,
  //   setCurrentUser,
  // };

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
