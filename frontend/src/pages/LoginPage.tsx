import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-[1rem] p-[2rem] poppins-medium">
      <h2 className="uppercase tracking-[0.5rem] text-[0.8rem]">
        welcome back
      </h2>
      <h1 className="capitalize text-[2rem] font-semibold text-center">
        sign in to your account
      </h1>
      <form className="flex flex-col gap-[1rem] w-full lg:w-1/2">
        <Input
          type="email"
          name="email"
          value={email}
          setValue={setEmail}
          placeholder="Enter Email"
        />
        <Input
          type="password"
          name="password"
          value={password}
          setValue={setPassword}
          placeholder="••••••••"
        />
        <Button buttonText="login" />
      </form>
      <p className="text-[1.1rem]">
        <span>Don&lsquo;t have an account? </span>
        <span
          onClick={() => {
            redirect("/register");
          }}
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          Register Now
        </span>
      </p>
    </div>
  );
}
