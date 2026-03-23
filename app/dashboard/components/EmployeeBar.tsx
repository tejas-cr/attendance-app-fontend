"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EmployeeBar({
  total,
  present,
  absent,
}: {
  total: number;
  present: number;
  absent: number;
}) {
  const data = [
    { name: "Employees", value: total },
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-sm p-6 shadow-xl border border-neutral-100 
    hover:border-neutral-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-in-out">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Employees Status
      </h3>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#4285F4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
