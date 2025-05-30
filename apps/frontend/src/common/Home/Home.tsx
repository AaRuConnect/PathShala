import { Auth } from "@/AuthProvider/AuthProvider";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const auth = useContext(Auth);

  return (
    <div>
      <p className="text-3xl text-center mt-5">
        This is Home Page, {auth?.name} {auth?.lastname}.
      </p>
      <div className="mt-10 flex justify-center items-center gap-8 place-items-center">
        <Link to={"/singup"}>
          <Button>Sing Up</Button>
        </Link>
        <Link to={"/login"}>
          <Button>Log In</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
