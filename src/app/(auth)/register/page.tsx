/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  confirmPasswordState,
  emailState,
  loadingState,
  nameState,
  passwordState,
} from "@/lib/recoils/atom";
import { fetchData } from "@/utilities/fetchData";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useRecoilState } from "recoil";

const RegisterPage = () => {
  const router = useRouter();

  // Crendetial
  const [name, setName] = useRecoilState(nameState);
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [confirmPassword, setConfirmPassword] =
    useRecoilState(confirmPasswordState);

  // Loading
  const [loading, setLoading] = useRecoilState(loadingState);

  const handleInputChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Password Is Not Matcher!");
    }

    try {
      const { statusCode, result } = await fetchData({
        method: "POST",
        url: "register",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (statusCode == 201 && result) {
        router.push("/login");
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
        <form onSubmit={handleRegister} method="POST" className="flex flex-col">
          <h1 className="text-2xl text-primary font-bold">Welcome Back</h1>
          <p className="text-sm text-slate-400 font-semibold">
            Enter your email and password to sign in!
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Label className="font-light" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              type="name"
              name="name"
              placeholder="JohnDoe"
              value={name}
              onChange={handleInputChange(setName)}
              required
            />
          </div>
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
            />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Label className="font-light" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
            />
          </div>
          <Button disabled={loading} className="mt-10">
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
