import { createContext } from "react";

export const Auth = createContext();

const AuthProvider = ({ children }) => {
  let name = "Robiul Hasan";
  const data = {
    name,
    // add more values later if needed
  };
  return <Auth.Provider value={data}>{children}</Auth.Provider>;
};

export default AuthProvider;
