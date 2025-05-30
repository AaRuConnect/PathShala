import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

import { Link } from "react-router-dom";

const LogIn = () => {
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ emailOrId, password });
  };

  //   tagol pass
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto p-6 space-y-6 bg-white shadow-md rounded-2xl"
      >
        <div className="flex justify-between">
          <div className="mt-3">
            <Link to={"/"}>
              <FaArrowLeft></FaArrowLeft>
            </Link>
          </div>
          <div className="w-[150px] -mt-3">
            <img
              src="https://img.icons8.com/?size=160&id=92101&format=png"
              alt="login key"
              className="w-full"
            />
          </div>
        </div>
        <div>
          <div className="h-[50px] w-[50px] mx-auto">
            <img
              src="https://img.icons8.com/?size=96&id=vo1XcGH8QAag&format=png"
              alt=""
              className="h-full w-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-center">Login</h2>
        </div>

        <div className="space-y-2 mt-8 mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            placeholder="Enter your user ID or Email"
            value={emailOrId}
            onChange={(e) => setEmailOrId(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-[32px] text-gray-500 hover:text-black"
          >
            {showPassword ? (
              <FaRegEyeSlash size={18} />
            ) : (
              <FaRegEye size={18} />
            )}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#114368] hover:bg-[#1d3344] mt-6"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LogIn;
