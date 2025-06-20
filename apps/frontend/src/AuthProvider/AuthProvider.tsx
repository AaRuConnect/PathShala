import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type UserType = {
  email: string;
  password: string;
};

interface AuthContextType {
  name: string;
  lastname: string;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  // add more data
}

export const Auth = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const getUserData = localStorage.getItem("user");

  const name = "Robiul Hasan";
  const lastname = "Shakil";

  const data: AuthContextType = {
    name,
    lastname,
    user,
    setUser,
    // Add more fields
  };

  useEffect(() => {
    if (!getUserData) {
      setUser(null);
      return;
    }
    const stroedUserData: UserType = JSON.parse(getUserData);
    setUser(stroedUserData);
    // console.log(getUserData);
  }, [getUserData]);

  return <Auth.Provider value={data}>{children}</Auth.Provider>;
};

export default AuthProvider;
