import { DailyLog } from "@/app/types/attendance";
import { minutesToHours, formatUnixTime } from "@/app/utils/timeCoversions";

export function DailyLogs({ logs }: { logs: DailyLog[] }) {
  if (!logs.length) {
    return <p className="text-sm text-slate-400">No data</p>;
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-3 py-2 text-left">Date</th>
            <th>Status</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.date} className="border-t">
              <td className="px-3 py-2">
                {log.date} ({log.dayOfWeek})
              </td>
              <td>{log.status?.replaceAll("_", " ").toLowerCase()}</td>
              <td>{formatUnixTime(log.clockInTime) ?? "—"}</td>
              <td>{formatUnixTime(log.clockOutTime) ?? "—"}</td>
              <td>{minutesToHours(log.totalWorkMinutes)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
