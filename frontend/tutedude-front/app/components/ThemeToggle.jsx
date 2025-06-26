"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className="relative p-2"
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4 text-[#006d77]" />
        )}
      </motion.div>
    </Button>
  );
};
