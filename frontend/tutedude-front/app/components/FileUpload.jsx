"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { X, Upload, FileText, CheckCircle } from "lucide-react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// interface FileUploadProps {
//   onClose: () => void;
// }
import { ToastContainer, toast } from "react-toastify";

export const FileUpload = ({ onClose }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const onDrop = useCallback(async (file) => {
    console.log("Files dropped:", file);
    setIsUploading(true);

    // Simulate upload progress
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const res = axios.post("/api/file-analyze", {

    // });
    if (!file) return;

    // 1. Create FormData and append your file (and any other fields)
    const formData = new FormData();
    formData.append("pdf", file[0], file[0].name);
    console.log("created formData");
    // If you need extra data:
    // formData.append('userId', user.id);

    try {
      // 2. Post the FormData
      console.log("sending req.");
      const response = await axios.post("/api/file-analyze", formData, {
        withCredentials: true,
      });
      const res = response.data.response;
      console.log(res);
      const { _id: id, metric, remarks } = res;
      console.log("hello boii", res);
      if (id) {
        toast("File Uploaded and Analsis Completed!");
        router.replace(`${pathname}/${id}`);
      }

      console.log("helloooo ", res);
      console.log("Upload success:", response.data);
    } catch (err) {
      toast("Analysis  failed");
      console.error("Upload error:", err.response?.data || err.message);
    }

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false,
    disabled: isUploading,
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#293241] dark:text-white">
                Upload Report
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {!uploadComplete ? (
                <div className="space-y-4">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-[#006d77] bg-[#006d77]/5"
                        : "border-gray-300 dark:border-gray-600 hover:border-[#006d77]"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    {isDragActive ? (
                      <p className="text-[#006d77] font-medium">
                        Drop your file here...
                      </p>
                    ) : (
                      <div>
                        <p className="text-[#293241] dark:text-white font-medium mb-2">
                          Drop your file here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports PDF, CSV, XLS, XLSX files
                        </p>
                      </div>
                    )}
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#293241] dark:text-white">
                          Uploading...
                        </span>
                        <span className="text-[#293241] dark:text-white">
                          {uploadProgress}%
                        </span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold text-[#293241] dark:text-white mb-2">
                    Upload Complete!
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Your report has been successfully uploaded and is being
                    processed.
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-[#006d77] hover:bg-[#006d77]/90"
                  >
                    Close
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
