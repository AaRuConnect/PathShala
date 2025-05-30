import { createContext } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  name: string;
  lastname: string;
  // Add more fields
}

export const Auth = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const name = "Robiul Hasan";
  const lastname = "Shakil";

  const data: AuthContextType = {
    name,
    lastname,
  };

  return <Auth.Provider value={data}>{children}</Auth.Provider>;
};

export default AuthProvider;
