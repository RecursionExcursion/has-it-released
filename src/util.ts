export function isIso(s?: string) {
  return !!s && /\d{4}-\d{2}-\d{2}/.test(s);
}

export function fmtDate(s?: string) {
  if (!s) return "TBA";
  if (!isIso(s)) return s;
  const d = new Date(s + "T12:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function cmpDateAsc(a?: string, b?: string) {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  if (!isIso(a) && !isIso(b)) return a.localeCompare(b);
  if (!isIso(a)) return 1;
  if (!isIso(b)) return -1;
  return new Date(a).getTime() - new Date(b).getTime();
}
