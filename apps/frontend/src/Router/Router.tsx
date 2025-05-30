import { createBrowserRouter } from "react-router-dom";
import SignUp from "../Features/Auth/SingUp/SignUp.tsx";
import Home from "@/common/Home/Home.tsx";
import LogIn from "@/Features/Auth/Login/LogIn.tsx";

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
]);

export default Router;
