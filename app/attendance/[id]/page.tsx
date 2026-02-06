"use client";

import { adminService } from "@/services/admin-services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserAttendanceById } from "@/app/types/attendance";
import { formatUnixTime, minutesToHours } from "@/app/utils/timeCoversions";
import { DailyLogs } from "../components/DailyLogs";
import { Button } from "@/components/ui/button";

export default function EmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<UserAttendanceById["data"] | null>(null);
  const [weeklyCard, setWeeklyCard] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await adminService.getUserAttendanceById(id as string);
        setEmployee(data);
      } catch (err) {
        console.error("Failed to fetch employee", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!employee) {
    return <div className="p-8">Employee not found</div>;
  }
  const { user, attendance } = employee;

  return (
    <div className="w-full min-h-screen flex bg-accent">
      <div className="w-full mx-auto bg-white rounded-3xl p-8 shadow-xl">
        <div className="flex justify-between">
          {/* Today */}
          <section className="w-2/3 mb-8 rounded-2xl border bg-slate-50 p-6">
            <h2 className="mb-4 text-lg font-bold text-slate-700">Today</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><strong>Status:</strong> {attendance.today.status}</p>
              <p><strong>Total:</strong> {minutesToHours(attendance.today.totalWorkMinutes)}</p>
              <p><strong>Clock In:</strong> {formatUnixTime(attendance.today.clockInTime) ?? "—"}</p>
              <p><strong>Clock Out:</strong> {formatUnixTime(attendance.today.clockOutTime) ?? "—"}</p>
            </div>
          </section>
          <div className="flex gap-4">
            <Button
              onClick={() => setWeeklyCard(true)}
              className={`bg-primary text-white ${weeklyCard ? "bg-primary" : "bg-primary/50"}`}
              >
              Weekly
            </Button>
            <Button
              onClick={() => setWeeklyCard(false)}
              className={`bg-primary text-white ${weeklyCard ? "bg-primary/50" : "bg-primary"}`}
            >
              Monthly
            </Button>
          </div>
        </div>

        {/* weekly */}
        {weeklyCard && (
          <section className="mb-8 rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-slate-700">
              Weekly ({attendance.weekly.weekRange})
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <p><strong>Total Hours:</strong> {minutesToHours(attendance.weekly.totalHoursThisWeek)}</p>
              <p><strong>Avg Clock In:</strong> {attendance.weekly.averageClockInTime}</p>
              <p><strong>Present:</strong> {attendance.weekly.counts.presentDays}</p>
              <p><strong>Absent:</strong> {attendance.weekly.counts.absentDays}</p>
            </div>

            <DailyLogs logs={attendance.weekly.dailyLogs} />
          </section>
        )}

        {/* monthly */}
        {!weeklyCard && (
          <section className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-slate-700">
              Monthly ({attendance.monthly.month})
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <p><strong>Total Hours:</strong> {minutesToHours(attendance.monthly.totalHoursThisMonth)}</p>
              <p><strong>Avg Clock In:</strong> {attendance.monthly.averageClockInTime}</p>
              <p><strong>Working Days:</strong> {attendance.monthly.totalWorkingDays}</p>
              <p><strong>Present:</strong> {attendance.monthly.presentDays}</p>
              <p><strong>Absent:</strong> {attendance.monthly.absentDays}</p>
            </div>

            <DailyLogs logs={attendance.monthly.dailyLogs} />
          </section>  
        )}
      </div>
    </div>
  );
}