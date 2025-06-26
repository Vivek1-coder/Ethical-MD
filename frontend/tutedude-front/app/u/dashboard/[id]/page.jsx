"use client";
import { usePathname } from "next/navigation";
import { LabReport } from "../../../components/LabReport";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
export default function LabReportDisplay({ params }) {
  const pathname = usePathname();
  // console.log(id);
  console.log("jjojojojojj");
  const [metric, setMetric] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [explaination, setExplaination] = useState("");
  const [summary, setSummary] = useState("");
  const [insights, setInsights] = useState([]);
  const [isLoading, setLoader] = useState(false);
  useEffect(() => {
    async function f() {
      console.log("lolololo");
      const id = (await params).id;
      console.log(id);
      setLoader(true);
      const res = await axios.post(
        `/api/load-report/specific`,
        { id },
        { withCredentials: true }
      );
      setLoader(false);
      console.log(res);
      if (res.status == 200) {
        toast("Analysis Loaded!");
      } else {
        toast("Not able to fetch Analysis");
      }
      setMetric(res.data.summary.metrics);
      setRemarks(res.data.summary.remarks);
      setExplaination(res.data.summary.explaination);
      setInsights(res.data.summary.actionable_insights);
      setSummary(res.data.summary.summary);
    }
    f();
  }, []);
  /**  metrics,
  remarks,
  summary,
  explanation,
  actionable_insights, */
  return (
    <div>
      {isLoading && <Loader></Loader>}
      {!isLoading && (
        <LabReport
          metrics={metric}
          remarks={remarks}
          explaination={explaination}
          actionable_insights={insights}
          summary={summary}
        ></LabReport>
      )}
    </div>
  );
}
