import { isAxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import apiClient from "../apiClient/apiClient";
import Button from "../components/Button";
import Input from "../components/Input";
import { loginSchema } from "../schemas/schema";
import { Store } from "../store/store";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = useNavigate();
  const store = Store();

  useEffect(() => {
    async function getUser() {
      try {
        await apiClient.get("/user").then((res) => {
          if (res.data) {
            store.setUser(res.data);
            redirect("/profile");
          } else {
            store.setUser(null);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, [redirect, store, store.user]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    store.setIsLoading(true);

    // Verify Credentials
    try {
      const verifiedUser = loginSchema.parse({
        email,
        password,
      });

      await apiClient
        .post("/user/login", verifiedUser)
        .then(async (res) => {
          if (res.status === 200) {
            await apiClient.get("/user").then((res) => {
              store.setUser(res.data);
            });
          }
          toast.success(res.data.message);
          redirect("/profile");
        })
        .catch((err) => {
          if (isAxiosError(err)) {
            toast.error(err.response?.data.message);
          } else {
            console.log(err);
          }
        })
        .finally(() => {
          store.setIsLoading(false);
        });
    } catch (error) {
      store.setIsLoading(false);
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-[1rem] p-[2rem] ">
      <h2 className="uppercase tracking-[0.3rem] text-[0.9rem]">
        welcome back
      </h2>
      <h1 className="capitalize text-[2rem] font-semibold text-center">
        sign in to your account
      </h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-[1rem] w-full lg:w-1/2"
      >
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
        <span>Don‘t have an account? </span>
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
