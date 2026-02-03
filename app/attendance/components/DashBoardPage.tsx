"use client";

import { User } from "lucide-react";

const juniors = [
  { id: 1, name: "Aman Verma", role: "Frontend Developer" },
  { id: 2, name: "Neha Singh", role: "QA Engineer" },
  { id: 3, name: "Neha Singh", role: "QA Engineer" },
  { id: 4, name: "Neha Singh", role: "QA Engineer" },
  { id: 5, name: "Neha Singh", role: "QA Engineer" },
  { id: 6, name: "Neha Singh", role: "QA Engineer" },
  { id: 7, name: "Neha Singh", role: "QA Engineer" },
  { id: 8, name: "Neha Singh", role: "QA Engineer" },
];

const seniors = [
  { id: 1, name: "Rahul Mehta", role: "Tech Lead" },
  { id: 2, name: "Priya Sharma", role: "Product Manager" },
  { id: 3, name: "Rahul Mehta", role: "Tech Lead" },
  { id: 4, name: "Priya Sharma", role: "Product Manager" },
]

export default function DashboardPage() {
  return (
    <div className="w-full min-h-screen bg-accent p-8">
      <h1 className="text-3xl font-black text-slate-800 mb-8">
        Employees
      </h1>

      <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">

          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-slate-200" />
          {/* Seniors */}
          <Section
            title="Senior Employees"
            count={seniors.length}
            accent="border-indigo-600">
            {seniors.map((emp) => (
              <EmployeeCard key={emp.id} {...emp} />
            ))}
          </Section>

          {/* Juniors */}
          <Section
            title="Junior Employees"
            count={juniors.length}
            accent="border-emerald-600">
            {juniors.map((emp) => (
              <EmployeeCard key={emp.id} {...emp} />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Section({
  title,
  count,
  accent,
  children,
}: {
  title: string;
  count: number;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h2
        className={`text-xl font-extrabold text-slate-700 border-l-4 pl-4 ${accent}`}
        >
          {title}
        </h2>
        <span
          className={`text-sm font-bold border ${accent} bg-slate-100 px-3 py-1 rounded-full`}
        >
          {count}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function EmployeeCard({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  return (
    <div className="group bg-white/90 rounded-2xl p-5 shadow-xl shadow-slate-200/50
    border border-slate-100 cursor-pointer
    hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600
        transition-transform group-hover:scale-110 duration-300">
          <User size={18} />
        </div>

        <div>
          <p className="font-semibold text-slate-800 group-hover:text-[#4285F4] transition-colors">{name}</p>
          <p className="text-sm text-slate-500 group-hover:text-[#4285F4] transition-colors">{role}</p>
        </div>
      </div>
    </div>
  );
}
