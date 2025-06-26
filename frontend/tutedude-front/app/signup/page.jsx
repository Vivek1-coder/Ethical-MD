"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { signup } from "../_lib/login-service";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";

// interface SignupForm {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Signup data:", data);
    try {
      setLoader(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // ✅ ensures cookies like 'token' are stored
      });
      setLoader(false);
      const json = await res.json();

      if (res.ok) {
        // 1️⃣ Feedback
        // alert(json.message);
        toast("User created!");
        // reset();
        // 2️⃣ Redirect
        router.push("/login");
      } else {
        toast(json.error);
      }
    } catch (e) {
      console.error(e);
      toast("Network error");
      // alert("Network error");
    }
    // Handle signup logic here
  };

  return (
    <div className="relative min-h-full w-full overflow-hidden flex items-center justify-center px-4">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center dark:hidden"
        style={{
          backgroundImage:
            "url('https://en.idei.club/uploads/posts/2023-06/1687785677_en-idei-club-p-aesthetic-medicine-background-dizain-krasi-73.jpg')",
          filter: "blur(8px)",
        }}
      />

      <div
        className="absolute inset-0 z-0 bg-cover bg-center hidden dark:block"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/006/712/985/original/abstract-health-medical-science-healthcare-icon-digital-technology-science-concept-modern-innovation-treatment-medicine-on-hi-tech-future-blue-background-for-wallpaper-template-web-design-vector.jpg')",
          filter: "blur(10px)",
        }}
      />

      {/* Dark overlay to dim the background */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Main Content (Login Card) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md"
      >
        {/* <div className="min-h-screen bg-gradient-to-br from-[#f0f3f4] to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      > */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#293241] dark:text-white">
              Create Account
            </CardTitle>
            <CardDescription className="font-semibold text-[#293241] dark:text-gray-300">
              Join EthicalMD and start your healthcare journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {isLoading && <Loader></Loader>}
              {!isLoading && (
                <Button
                  type="submit"
                  className="w-full bg-[#006d77] hover:bg-[#006d77]/90  cursor-pointer hover:scale-105 dark:text-gray-200"
                >
                  Create Account
                </Button>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 font-semibold">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#006d77] dark:text-[#7ed7df] hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
