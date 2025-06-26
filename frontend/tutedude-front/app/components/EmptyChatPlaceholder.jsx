import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    iconName: "UploadCloud",
    title: "Upload Lab Report",
    description: "Drag & drop or browse to upload your medical report.",
    action: () => console.log("Upload action triggered"),
    color: "text-indigo-500",
  },
  {
    id: 2,
    iconName: "MessagesSquare",
    title: "Start New Conversation",
    description: "Ask our AI assistant any health-related question.",
    action: () => console.log("Chat action triggered"),
    color: "text-green-500",
  },
  {
    id: 3,
    iconName: "Activity",
    title: "View Past Metrics",
    description: "Browse and compare your previously analyzed metrics.",
    action: () => console.log("Metrics action triggered"),
    color: "text-pink-500",
  },
];

export function EmptyChatPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-semibold">Welcome to MedicalMD</h2>
        <p className="text-gray-600 mt-2">
          No messages yet. Get started by choosing an option below!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {features.map((f) => {
          const IconComponent = Icons[f.iconName];
          return (
            <motion.div
              key={f.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                onClick={f.action}
                className="cursor-pointer hover:shadow-lg"
              >
                <CardHeader className="flex flex-col items-center">
                  {IconComponent && (
                    <IconComponent className={`w-8 h-8 ${f.color}`} />
                  )}
                  <CardTitle className="mt-4">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{f.description}</CardDescription>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      f.action();
                    }}
                  >
                    {f.title.split(" ")[0]}
                  </Button> */}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
