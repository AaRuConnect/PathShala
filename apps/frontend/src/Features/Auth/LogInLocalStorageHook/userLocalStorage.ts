import type { UserType } from "@/AuthProvider/AuthProvider";

const userLocalStorae = (
  email: string,
  password: string,
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  const getUser = localStorage.getItem("user");
  if (!getUser) {
    const data = { email, password };
    const userData = JSON.stringify(data);
    localStorage.setItem("user", userData);
    setUser(data);
  } else {
    localStorage.removeItem("user");
    setUser(null);
  }
};

export default userLocalStorae;
