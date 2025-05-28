import { createBrowserRouter } from "react-router-dom";
import SignUp from "../Features/Auth/SignUp.tsx";

const Router = createBrowserRouter([
  {
    path: "/singup",
    element: <SignUp></SignUp>,
  },
]);

export default Router;
