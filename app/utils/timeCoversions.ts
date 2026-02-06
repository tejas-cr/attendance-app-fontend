export const minutesToHours = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};


export function formatUnixTime(
  unix: string | number | null,
  options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  }
) {
  if (!unix) return "—";

  const ts = Number(unix);

  // Auto-detect seconds vs milliseconds
  const date = new Date(ts < 1e12 ? ts * 1000 : ts);

  return date.toLocaleString(undefined, options);
}
