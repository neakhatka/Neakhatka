"use client";
import * as Yup from "yup";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import Image from "next/legacy/image";
import "../../globals.css";
import { Icon } from "@/components";
import { EmployerSignupSchema } from "@/validation/employerSignUp";
import axios from "axios";
import { useRouter } from "next/navigation";

const EmployerSignUp = () => {
  const [signupError, setSignupError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "employer";
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      if (!username) setUsernameError("Company name is required");
      if (!email) setEmailError("Email is required");
      if (!password) setPasswordError("Password is required");
      return;
    }

    setLoading(true);
    setSignupError("");

    try {
      await EmployerSignupSchema.validate(
        { username, email, password, role },
        { abortEarly: false }
      );

      await axios.post("http://localhost:4000/v1/auth/signup", {
        username,
        email,
        password,
        role,
      });

      console.log("data : ", username, email, password, role);

      router.push(`/signup-success?email=${encodeURIComponent(email)}`);
    } catch (error: any | unknown) {
      console.log("error**", error);
      setLoading(false);

      if (error instanceof Yup.ValidationError) {
        console.log("error form", error);
        error.inner.forEach((e) => {
          switch (e.path) {
            case "username":
              setUsernameError(e.message);
              break;
            case "email":
              setEmailError(e.message);
              break;
            case "password":
              setPasswordError(e.message);
              break;
            default:
              break;
          }
        });
      } else {
        console.error("Signup error:", error); // Debugging
        setSignupError("Error signing up. Please try again.");
      }
    }
  };

  const handleUsernameFocus = () => setUsernameError("");
  const handleEmailFocus = () => setEmailError("");
  const handlePasswordFocus = () => setPasswordError("");

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="left hidden lg:block w-full h-full p-10 bg-[#18181B] flex-col justify-between rounded-r-2xl">
        <div className="flex justify-center items-center h-screen">
          <Image
            src="/auth/signup.svg"
            alt="login"
            width={450}
            height={450}
            className="mb-20"
          />
        </div>
      </div>
      <div className="right w-full p-10">
        <div className="text-end">
          <Link
            href="/login"
            color="primary"
            className="text-sm text-blue-500 underline"
          >
            Login
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center h-full">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={50}
              height={50}
              className="-mt-20 mb-10"
            />
          </Link>
          <div className="text-center">
            <h1 className="font-bold mb-1 text-lg">Create an account</h1>
            <p className="text-gray-500 text-sm text-center w-[380px]">
              Enter your email below to sign up with Matching Internship
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-5" method="POST">
            <div className="relative">
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="company name"
                className={`w-[350px] ${usernameError ? "border-red-500" : ""}`}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                onFocus={handleUsernameFocus}
              />
              {usernameError && (
                <div className="text-red-500 text-xs mt-1">{usernameError}</div>
              )}
            </div>
            <div className="relative mt-4">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className={`w-[350px] ${emailError ? "border-red-500" : ""}`}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onFocus={handleEmailFocus}
              />
              {emailError && (
                <div className="text-red-500 text-xs mt-1">{emailError}</div>
              )}
            </div>
            <div className="relative mt-4">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password123"
                className={`w-[350px] ${passwordError ? "border-red-500" : ""}`}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onFocus={handlePasswordFocus}
              />
              {passwordError && (
                <div className="text-red-500 text-xs mt-1">{passwordError}</div>
              )}
            </div>
            <Button
              type="submit"
              className="mt-4 w-[350px] bg-[#343A40] hover:bg-[#4a535c]"
              disabled={loading}
            >
              {loading ? <div className="spinner"></div> : "Sign Up"}
            </Button>
            {signupError && (
              <div className="text-red-500 text-xs mt-1">{signupError}</div>
            )}
          </form>
          <div className="mt-5">
            <span className="flex text-gray-300">or continue with</span>
          </div>
          <div className="flex flex-col w-[350px]">
            <Button
              className="mt-4 mb-2 flex justify-center items-center"
              variant="outline"
            >
              <Icon label="Google" className="-ml-10 mr-5" />
              Continue with Google
            </Button>

            <Button
              className="flex justify-center items-center"
              variant="outline"
            >
              <FaFacebook className="-ml-6 mr-5 w-[22px] h-[22px] text-blue-600" />
              Continue with facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignUp;
