import type { Assignment } from '../types';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH_RE = '(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?';

/** Roll a month/day with no explicit year into the nearest sensible year. */
function withImpliedYear(month: number, day: number, now: Date): Date {
  const candidate = new Date(now.getFullYear(), month, day);
  const sixMonthsMs = 1000 * 60 * 60 * 24 * 183;
  // "Jan 10" typed in December means next January, not eleven months ago.
  if (now.getTime() - candidate.getTime() > sixMonthsMs) {
    candidate.setFullYear(candidate.getFullYear() + 1);
  }
  return candidate;
}

/**
 * Best-effort parse of free-text due dates such as
 * "Thursday, Dec 5", "December 5th", "5 Dec", "12/5", "12/5/2026" or "2026-12-05".
 * Returns null when nothing recognisable is found.
 */
export function parseDueDate(text: string, now: Date = new Date()): Date | null {
  const s = text.trim().toLowerCase();
  if (!s) return null;

  let m = s.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));

  m = s.match(new RegExp(`\\b${MONTH_RE}\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:,?\\s+(\\d{4}))?`));
  if (m) {
    const month = MONTHS.indexOf(m[1]);
    const day = Number(m[2]);
    return m[3] ? new Date(Number(m[3]), month, day) : withImpliedYear(month, day, now);
  }

  m = s.match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+${MONTH_RE}(?:,?\\s+(\\d{4}))?`));
  if (m) {
    const month = MONTHS.indexOf(m[2]);
    const day = Number(m[1]);
    return m[3] ? new Date(Number(m[3]), month, day) : withImpliedYear(month, day, now);
  }

  m = s.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (m) {
    const month = Number(m[1]) - 1;
    const day = Number(m[2]);
    if (month < 0 || month > 11 || day < 1 || day > 31) return null;
    if (m[3]) {
      const year = Number(m[3]);
      return new Date(year < 100 ? 2000 + year : year, month, day);
    }
    return withImpliedYear(month, day, now);
  }

  return null;
}

/**
 * Sort by nearest deadline. Open tasks come before completed ones,
 * tasks with a recognisable date come before those without.
 */
export function sortByDeadline(list: Assignment[]): Assignment[] {
  const now = new Date();
  const keyed = list.map((a, index) => ({
    a,
    index,
    t: parseDueDate(a.dueDate, now)?.getTime() ?? null,
  }));
  keyed.sort((x, y) => {
    if (x.a.done !== y.a.done) return x.a.done ? 1 : -1;
    if (x.t !== null && y.t !== null && x.t !== y.t) return x.t - y.t;
    if (x.t !== null && y.t === null) return -1;
    if (x.t === null && y.t !== null) return 1;
    return x.index - y.index; // keep insertion order otherwise
  });
  return keyed.map(k => k.a);
}

/** Monday 00:00 of the week containing `date` (local time). */
export function startOfWeek(date: Date = new Date()): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
