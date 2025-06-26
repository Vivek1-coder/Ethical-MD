"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

export function LabReport({
  metrics,
  remarks,
  summary,
  explanation,
  actionable_insights,
}) {
  const [showExplanation, setShowExplanation] = useState(false);

  const parsedData = Object.entries(metrics).map(
    ([name, { value, normalRange }]) => {
      let min = NaN,
        max = NaN;
      if (normalRange) {
        const nums = normalRange.match(/[\d.]+/g);
        if (nums) {
          min = parseFloat(nums[0]);
          max = nums.length > 1 ? parseFloat(nums[1]) : min;
        }
      }
      return {
        name,
        value: value !== null ? parseFloat(String(value)) : null,
        min,
        max,
      };
    }
  );

  const isOutOfRange = (d) =>
    d.value !== null &&
    isFinite(d.min) &&
    isFinite(d.max) &&
    (d.value < d.min || d.value > d.max);

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      const [{ value, payload: d }] = payload;
      return (
        <div className="bg-white dark:bg-gray-700 p-2 rounded shadow">
          <strong>{label}</strong>
          <div>Value: {value}</div>
          {isFinite(d.min) && isFinite(d.max) && (
            <div>
              Normal: {d.min}–{d.max}
            </div>
          )}
          {isOutOfRange(d) && <div className="text-red-600">Out of range!</div>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10 p-2 relative">
      {/* Remarks Section */}
      {remarks && (
        <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100">
          <strong>Remarks:</strong> {remarks}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto dark:bg-gray-800 dark:text-gray-100">
          <thead>
            <tr className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">
              <th className="px-4 py-2 text-left">Metric</th>
              <th className="px-4 py-2 text-right">Value</th>
              <th className="px-4 py-2 text-center">Normal Range</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {parsedData.map((d) => (
              <tr
                key={d.name}
                className={
                  isOutOfRange(d)
                    ? "bg-red-50 hover:bg-red-100 dark:bg-red-900 dark:hover:bg-red-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }
              >
                <td className="px-4 py-2 dark:text-gray-100">{d.name}</td>
                <td className="px-4 py-2 text-right dark:text-gray-100">
                  {d.value ?? "—"}
                </td>
                <td className="px-4 py-2 text-center dark:text-gray-100">
                  {isFinite(d.min) && isFinite(d.max)
                    ? `${d.min}–${d.max}`
                    : "—"}
                </td>
                <td className="px-4 py-2 text-center dark:text-gray-100">
                  {d.value === null ? (
                    "—"
                  ) : isOutOfRange(d) ? (
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      ⚠️
                    </span>
                  ) : (
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      ✔️
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Chart Grid with Normal Range Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {parsedData.map((d) => (
          <div
            key={d.name}
            className="h-48 p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <h3 className="mb-2 font-semibold dark:text-gray-100">{d.name}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[d]}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="normalGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#48bb78" />
                    <stop offset="100%" stopColor="#90ee90" />
                  </linearGradient>
                  <linearGradient
                    id="outHighGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#f56565" />
                    <stop offset="100%" stopColor="#fc8181" />
                  </linearGradient>
                  <linearGradient
                    id="outLowGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#4299e1" />
                    <stop offset="100%" stopColor="#63b3ed" />
                  </linearGradient>
                  {/* Diagonal stripes for normal range */}
                  <pattern
                    id={`stripePattern-${d.name}`}
                    patternUnits="userSpaceOnUse"
                    width="8"
                    height="8"
                    patternTransform="rotate(45)"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="8"
                      stroke="#48bb78"
                      strokeWidth="2"
                    />
                  </pattern>
                </defs>
                <XAxis
                  type="number"
                  domain={[
                    isFinite(d.min) && isFinite(d.max)
                      ? Math.min(d.min * 0.8, d.value ?? d.min)
                      : 0,
                    isFinite(d.min) && isFinite(d.max)
                      ? Math.max(d.max * 1.2, d.value ?? d.max)
                      : (d.value ?? 1) * 1.2,
                  ]}
                  tick={{ fill: "#718096" }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={false}
                />
                <Tooltip content={customTooltip} />
                {isFinite(d.min) && isFinite(d.max) && (
                  <>
                    {/* Highlighted normal range */}
                    <ReferenceArea
                      x1={d.min}
                      x2={d.max}
                      y1={d.name}
                      y2={d.name}
                      stroke="none"
                      fill={`url(#stripePattern-${d.name})`}
                      alwaysShow
                    />
                    {/* Range boundaries */}
                    <ReferenceLine
                      x={d.min}
                      stroke="#718096"
                      strokeDasharray="3 3"
                      label={{
                        position: "insideStart",
                        fill: "#718096",
                        value: `Min ${d.min}`,
                      }}
                    />
                    <ReferenceLine
                      x={d.max}
                      stroke="#718096"
                      strokeDasharray="3 3"
                      label={{
                        position: "insideEnd",
                        fill: "#718096",
                        value: `Max ${d.max}`,
                      }}
                    />
                  </>
                )}
                <Bar
                  dataKey="value"
                  barSize={20}
                  minPointSize={6}
                  isAnimationActive
                  animationDuration={800}
                  fill={
                    d.value < d.min
                      ? "url(#outLowGradient)"
                      : d.value > d.max
                      ? "url(#outHighGradient)"
                      : "url(#normalGradient)"
                  }
                >
                  <LabelList dataKey="value" position="right" fill="#2d3748" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* CSV Download */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        onClick={() => {
          const rows = [["Metric", "Value", "Normal Range"]];
          parsedData.forEach((d) => {
            rows.push([
              d.name,
              d.value?.toString() ?? "",
              isFinite(d.min) && isFinite(d.max) ? `${d.min}-${d.max}` : "",
            ]);
          });
          const csv = rows.map((r) => r.join(",")).join("\n");
          const blob = new Blob([csv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "lab-report.csv";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Download CSV
      </button>

      {/* Summary */}
      {summary && (
        <div className="p-4 rounded border bg-blue-50 text-blue-900 shadow-sm dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800">
          <strong>Summary:</strong> {summary}
        </div>
      )}

      {/* Actionable Insights */}
      {actionable_insights?.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold dark:text-gray-100 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-300" />{" "}
            Actionable Insights
          </h2>
          <ul className="space-y-2 list-disc list-inside dark:text-gray-100">
            {actionable_insights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Explanation Accordion */}
      {explanation && (
        <div className="rounded border bg-white shadow dark:bg-gray-800 dark:border-gray-700">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            <span>Detailed Explanation</span>
            {showExplanation ? <ChevronUp /> : <ChevronDown />}
          </button>
          {showExplanation && (
            <div className="px-4 pb-4 text-gray-700 dark:text-gray-200">
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
