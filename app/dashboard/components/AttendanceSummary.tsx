import { AttendanceMember } from "@/app/types/attendance";
import { countAttendance } from "@/app/utils/countAttendance";

interface Props {
  members: AttendanceMember[];
}

interface StatProps {
  label: string;
  value: number;
}

export default function AttendanceSummary({ members }: Props) {
  const stats = countAttendance(members);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Stat label="Total" value={stats.total} />
      <Stat label="Present" value={stats.present} />
      <Stat label="Absent" value={stats.absent} />
      <Stat label="Clocked In" value={stats.clockedIn} />
      <Stat label="In Office" value={stats.inOffice} />
    </div>
  );
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-xl border p-4 text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
