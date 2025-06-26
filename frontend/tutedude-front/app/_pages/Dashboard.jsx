import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Upload, FileText, Calendar, TrendingUp, Download } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";

// interface Report {
//   id: string;
//   name: string;
//   type: 'lab' | 'imaging' | 'consultation';
//   date: string;
//   status: 'processing' | 'completed' | 'error';
//   confidence?: number;
// }

const mockReports = [
  {
    id: "1",
    name: "Blood Test Results",
    type: "lab",
    date: "2024-01-15",
    status: "completed",
    confidence: 94,
  },
  {
    id: "2",
    name: "Cholesterol Panel",
    type: "lab",
    date: "2024-01-10",
    status: "completed",
    confidence: 89,
  },
  {
    id: "3",
    name: "X-Ray Chest",
    type: "imaging",
    date: "2024-01-08",
    status: "processing",
  },
];

const chartData = [
  { name: "Glucose", value: 95, normal: 100 },
  { name: "Cholesterol", value: 180, normal: 200 },
  { name: "Blood Pressure", value: 120, normal: 120 },
  { name: "Heart Rate", value: 72, normal: 70 },
];

const trendData = [
  { month: "Jan", glucose: 98, cholesterol: 190 },
  { month: "Feb", glucose: 96, cholesterol: 185 },
  { month: "Mar", glucose: 94, cholesterol: 180 },
  { month: "Apr", glucose: 95, cholesterol: 178 },
];

const Dashboard = () => {
  const [showUpload, setShowUpload] = useState(false);

  const { data: reports } = useQuery({
    queryKey: ["reports"],
    queryFn: () => Promise.resolve(mockReports),
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f3f4] dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#293241] dark:text-white">
              Dashboard
            </h1>
            <p className="text-[#293241]/80 dark:text-gray-300 mt-1">
              Track your health metrics and manage reports
            </p>
          </div>
          <Button
            onClick={() => setShowUpload(true)}
            className="bg-[#006d77] hover:bg-[#006d77]/90 mt-4 sm:mt-0"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Report
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Reports",
              value: "12",
              icon: FileText,
              change: "+2 this month",
            },
            {
              title: "Health Score",
              value: "94%",
              icon: TrendingUp,
              change: "+5% from last month",
            },
            {
              title: "Last Check-up",
              value: "5 days ago",
              icon: Calendar,
              change: "Next in 25 days",
            },
            {
              title: "Active Alerts",
              value: "0",
              icon: Download,
              change: "All clear",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#293241] dark:text-white">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-[#006d77]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#293241] dark:text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs text-[#293241]/80 dark:text-gray-400">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-[#293241] dark:text-white">
                  Current Health Metrics
                </CardTitle>
                <CardDescription>
                  Your latest test results vs normal ranges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#006d77" />
                    <Bar dataKey="normal" fill="#f28482" opacity={0.6} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-[#293241] dark:text-white">
                  Health Trends
                </CardTitle>
                <CardDescription>4-month progress tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="glucose"
                      stroke="#006d77"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="cholesterol"
                      stroke="#f28482"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Reports Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-[#293241] dark:text-white">
                Recent Reports
              </CardTitle>
              <CardDescription>
                Manage and view your uploaded health reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports?.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-[#006d77]/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#006d77]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#293241] dark:text-white">
                          {report.name}
                        </h3>
                        <p className="text-sm text-[#293241]/80 dark:text-gray-400">
                          {report.date} • {report.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {report.confidence && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#293241] dark:text-white">
                            {report.confidence}% confidence
                          </p>
                          <Progress
                            value={report.confidence}
                            className="w-20"
                          />
                        </div>
                      )}
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upload Modal */}
      {showUpload && <FileUpload onClose={() => setShowUpload(false)} />}
    </div>
  );
};

export default Dashboard;
