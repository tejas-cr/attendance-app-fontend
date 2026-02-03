"use client"
import { Package, Map, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const MODULES = [
  {
    title: "Employee's",
    count: 50,
    icon: <Package size={28} />,
    color: "text-[#4285F4]", // Google Blue
    bg: "bg-[#4285F4]/10",
    path: "/admin/packages",
},
{
    title: "Present",
    count: 40,
    icon: <CheckCircle size={28} />,
    color: "text-[#DB4437]", // Google Red
    bg: "bg-[#DB4437]/10",
    path: "/admin/categories",
},
{
    title: "Absent",
    count: 10,
    icon: <Map size={28} />,
    color: "text-[#F4B400]", // Google Yellow
    bg: "bg-[#F4B400]/10",
    path: "/admin/itinerary",
  },
];

export default function DashboardPage() {
    const router = useRouter();
    return (
    <main className="w-full bg-accent min-h-screen">

      {/* --- Modules Grid --- */}
      <section className="relative mt-1 z-30 max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-start mb-6">
          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-white/50 shadow-sm text-sm font-bold text-slate-600">
            <Calendar size={18} className="text-[#4285F4]" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((item, index) => (
            <div
              key={index}
            //   onClick={() => router.push(item.path)}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white/50 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-8">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} transition-transform group-hover:scale-110 duration-300`}
                >
                  {item.icon}
                </div>
                
                <div className="text-right">
                    <p className="text-3xl font-extrabold text-slate-800 group-hover:text-[#4285F4] transition-colors">
                    {item.count}
                    </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#4285F4] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}