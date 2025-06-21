import { createBrowserRouter } from "react-router-dom";
import SignUp from "../Features/Auth/SingUp/SignUp.tsx";
import Home from "@/common/Home/Home.tsx";
import LogIn from "@/Features/Auth/Login/LogIn.tsx";
import User_profile from "@/Features/Profile/User_profile/User_profile.tsx";
import Edit_profile from "@/Features/Profile/Edit_profile/Edit_profile.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/singup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <LogIn></LogIn>,
  },
  {
    path: "/profile",
    element: <User_profile></User_profile>,
  },
  {
    path: "/edit_profile",
    element: <Edit_profile></Edit_profile>,
  },
]);

export default Router;
