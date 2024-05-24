import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-[1rem] p-[2rem]">
      <h2 className="uppercase tracking-[0.5rem] text-[0.8rem]">
        register
      </h2>
      <h1 className="capitalize text-[2rem] font-semibold">
        create your account
      </h1>
      <form className="flex flex-col gap-[1rem] w-full lg:w-1/2">
        <Input
          type="text"
          name="displayName"
          value={displayName}
          setValue={setDisplayName}
          placeholder="Enter Name"
        />
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
        <span>Already have an account? </span>
        <span
          onClick={() => {
            redirect("/login");
          }}
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          Login Now
        </span>
      </p>
    </div>
  );
}
