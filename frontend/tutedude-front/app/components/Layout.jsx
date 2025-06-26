"use client";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Toaster } from "./ui/toaster";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
