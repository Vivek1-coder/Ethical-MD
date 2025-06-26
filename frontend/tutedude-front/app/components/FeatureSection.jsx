"use client";
import React from "react";
import { motion } from "framer-motion";
import { Brain, FileText, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Diagnosis",
    description:
      "Advanced machine learning algorithms provide accurate preliminary diagnoses with confidence scores.",
  },
  {
    icon: FileText,
    title: "Lab Report Interpreter",
    description:
      "Upload and analyze lab reports with intelligent insights and trend analysis.",
  },
  {
    icon: Shield,
    title: "Explainable AI",
    description:
      "Complete transparency in AI decision-making with detailed explanations and reasoning.",
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    description:
      "Interactive charts and graphs to track health metrics and treatment progress.",
  },
];

export const FeatureSection = () => {
  return (
    <section className="py-20 bg-blue-200 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#293241] dark:text-white mb-4">
            Cutting-Edge Features
          </h2>
          <p className="text-xl text-[#293241]/80 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the future of healthcare with our comprehensive
            AI-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-[#f0f3f4] dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#006d77] rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#293241] dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-[#293241]/80 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
