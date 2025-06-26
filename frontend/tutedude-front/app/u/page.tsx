"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
const options = [
  {
    label: "Chat",
    description: "Go to the chat assistant for immediate support.",
    path: "/u/chat",
  },
  {
    label: "Lab Reports",
    description: "View and manage your lab reports securely.",
    path: "/u/dashboard",
  },
];

const Landing = () => {
  const router = useRouter();
  // const hasReloaded = useRef(false);

  // useEffect(() => {
  //   if (!hasReloaded.current) {
  //     hasReloaded.current = true;
  //     window.location.reload();
  //   }
  // }, []);

  return (
    <div
      className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat dark:bg-black"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581090700227-1e8e01d7906d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center dark:hidden"
        style={{ backgroundImage: "url('/whitebg.png')" }}
      ></div>
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center dark:z-0"
        style={{ backgroundImage: "url('/darkbg.png')" }}
      ></div>
      {/* <div className="absolute inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-md"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full mx-auto px-4 py-12 sm:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          Welcome!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
          Please choose where you want to go:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {options.map((option) => (
            <a
              href={option.path}
              key={option.label}
              className="w-full p-6 sm:p-8 rounded-xl shadow-md backdrop-blur-md transition-all hover:scale-105 hover:shadow-xl
             flex flex-col items-center gap-2
             bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 
             dark:from-indigo-500 dark:via-purple-600 dark:to-pink-600
             text-gray-900 dark:text-white
             border border-transparent hover:border-white/40
             animate-gradient-x cursor-pointer"
            >
              <span className="text-2xl font-bold tracking-wide">
                {option.label}
              </span>
              <span className="text-base opacity-90 text-center">
                {option.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
