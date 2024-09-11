/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailState, loadingState, passwordState } from "@/lib/recoils/atom";
import { fetchData } from "@/utilities/fetchData";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { setCookie } from "cookies-next";
import { useRecoilState } from "recoil";

const LoginPage = () => {
  const router = useRouter();

  // Crendetial
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);

  // Loading
  const [loading, setLoading] = useRecoilState(loadingState);

  const handleInputChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    try {
      const { statusCode, result } = await fetchData({
        method: "POST",
        url: "login",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (statusCode === 200 && result) {
        const role = result.data.role;
        setCookie("role", role);

        console.log(role);

        if (role === "ADMIN") {
          router.push("/admin/dashboard");
        } else if (role === "USER") {
          router.push("/user/dashboard");
        } else {
          console.log("Invalid role");
        }
      } else {
        console.log("Login failed with status code:", statusCode);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex items-center justify-center">
        <form onSubmit={handleLogin} method="POST" className="flex flex-col">
          <h1 className="text-2xl text-primary font-bold">Welcome Back</h1>
          <p className="text-sm text-slate-400 font-semibold">
            Enter your email and password to sign in!
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Label className="font-light" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="JohnDoe@gmail.com"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
            />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Label className="font-light" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
            />
          </div>
          <Button disabled={loading} className="mt-10">
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
