"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "@/components/Loader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter();
  const onSubmit = async (data) => {
    // setError(null);

    try {
      setLoader(true);
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // ✅ ensures cookies like 'token' are stored
      });
      setLoader(false);
      const json = await res.json();

      if (!res.ok) {
        // Backend returned a 4xx/5xx
        // setError(json.error || "Signin failed");
        return;
      } else {
        toast("Login Successful");
      }

      // Success: you now have { id, name, email } in json
      // (token was set as HttpOnly cookie by the route)

      // OPTIONAL: update client-side auth state/context here
      // e.g. authContext.setUser({ id: json.id, name: json.name })

      // Redirect to dashboard
      router.push("/u");
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    }
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
        {/* <div className="min-h-screen pt-10 bg-gradient-to-br from-[#f0f3f4] to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      > */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#293241] dark:text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="font-semibold text-gray-600 dark:text-gray-300">
              Sign in to your EthicalMD account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
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
              {isLoading && <Loader></Loader>}
              {!isLoading && (
                <Button
                  type="submit"
                  className="w-full bg-[#006d77] hover:bg-[#006d77]/90 hover:scale-105 cursor-pointer text-gray-200"
                >
                  Sign In
                </Button>
              )}
            </form>

            {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 dark:text-gray-300 font-semibold">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full hover:scale-105  cursor-pointer"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285f4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34a853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#fbbc05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#ea4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full  hover:scale-105 cursor-pointer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    alt="Microsoft Logo"
                    className=" h-4"
                  />
                  Microsoft
                </Button>
              </div>
            </div> */}

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300 font-semibold">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#006d77] dark:text-[#7ed7df] hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
    // </motion.div>
    // </div>
  );
};

export default Login;
