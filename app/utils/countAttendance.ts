import { AttendanceMember } from "@/app/types/attendance";

export function countAttendance(members: AttendanceMember[]) {
  return members.reduce(
    (acc, member) => {
      if (member.attendanceStatus === "PRESENT") acc.present++;
      if (member.attendanceStatus === null) acc.absent++;

      if (member.isClockedIn) acc.clockedIn++;
      if (member.isInOffice) acc.inOffice++;

      return acc;
    },
    {
      present: 0,
      absent: 0,
      clockedIn: 0,
      inOffice: 0,
      total: members.length,
    }
  );
}
