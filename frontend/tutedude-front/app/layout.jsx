import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EhicalMD",
  description: "AI for healthcare systems",
};

import React from "react";
// import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

// import { Toaster } from "@components/ui/toaster";

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <div className="flex flex-col h-screen bg-background">
          {/* Navbar never grows or shrinks */}
          <div className="flex-none">
            <Navbar />
          </div>

          {/* Content area takes all remaining space */}
          <div className="flex flex-1 overflow-hidden">
            {/* 
      main should grow to fill available space,
      and if its content scrolls, clamp it with overflow-auto 
    */}
            <main className="flex-1 overflow-auto">{children}</main>
            {/* ToastContainer can sit as an overlay if you want,
        or you can absolutely position it inside this same flex-1 */}
            <ToastContainer
              position="bottom-left"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />{" "}
          </div>
        </div>
        {/* <div className="h-screen bg-background grid grid-cols-1 gap-1 ">
          <div className="h-fit">
            <Navbar />
          </div>
          <div className="flex h-full">
            <main className=" flex-grow">{children}</main>
            <ToastContainer
              position="bottom-left"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />{" "}
          </div>
        </div> */}
      </body>
    </html>
  );
};

export default Layout;
