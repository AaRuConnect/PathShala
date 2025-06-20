import { Auth } from "@/AuthProvider/AuthProvider";
import { Button } from "@/components/ui/button";
import userLocalStorae from "@/Features/Auth/LogInLocalStorageHook/userLocalStorage";

import { useContext } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const auth = useContext(Auth);
  console.log(auth);

  // this is navber code ready to navber and sheeft this------>

  const handelLogOut = () => {
    if (!auth?.user) return;
    const { email, password } = auth.user!;
    userLocalStorae(email, password, auth.setUser);
  };
  // <--------end
  return (
    <div>
      <p className="text-3xl text-center mt-5">
        This is Home Page, {auth?.name} {auth?.lastname}.
      </p>
      <div className="mt-10 flex justify-center items-center gap-8 place-items-center">
        <Link to={"/singup"}>
          <Button>Sing Up</Button>
        </Link>
        {auth?.user ? (
          <Button onClick={handelLogOut}>Log Out</Button>
        ) : (
          <Link to={"/login"}>
            <Button>Log In</Button>
          </Link>
        )}
      </div>
      <div className="flex justify-center items-center mt-5">
        <Button>
          <Link to={"/profile"}>profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
