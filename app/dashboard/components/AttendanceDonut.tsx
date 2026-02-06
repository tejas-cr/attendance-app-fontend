"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function AttendanceDonut({
  present,
  absent,
}: {
  present: number;
  absent: number;
}) {
  const data = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  const COLORS = ["#34A853", "#DB4437"];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Attendance Overview
      </h3>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm font-medium">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#34A853]" />
          Present
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#DB4437]" />
          Absent
        </span>
      </div>
    </div>
  );
}
