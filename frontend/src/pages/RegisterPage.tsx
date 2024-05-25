import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { registerSchema } from "../schemas/schema";
import { ZodError } from "zod";
import axios, { isAxiosError } from "axios";
import { Store } from "../store/store";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();
  const store = Store();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    store.setIsLoading(true);

    // Verify Credentials
    try {
      const verifiedUser = registerSchema.parse({
        displayName,
        email,
        password,
      });

      await axios
        .post("/api/v1/user/register", verifiedUser)
        .then((res) => {
          console.log(res);
          redirect("/login");
        })
        .catch((err) => {
          if (isAxiosError(err)) {
            {
              console.log(err.message);
            }
            console.log(err);
          }
        })
        .finally(() => {
          store.setIsLoading(false);
        });
    } catch (error) {
      store.setIsLoading(false);

      if (error instanceof ZodError) {
        console.log(error.errors[0].message);
      }
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-[1rem] p-[2rem]">
      <h2 className="uppercase tracking-[0.3rem] text-[0.9rem]">register</h2>
      <h1 className="capitalize text-[2rem] font-semibold text-center">
        create your account
      </h1>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-[1rem] w-full lg:w-1/2"
      >
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
        <Button buttonText="register" />
      </form>
      <p className="text-[1.1rem]">
        <span>Already have an account? </span>
        <button
          disabled={store.isLoading}
          onClick={() => {
            redirect("/login");
          }}
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          Login Now
        </button>
      </p>
    </div>
  );
}
