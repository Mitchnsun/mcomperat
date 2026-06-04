// Maps month abbreviations (FR + EN) to a 0-based month index.
const MONTH_MAP: Record<string, number> = {
  jan: 0,
  fev: 1,
  fév: 1,
  feb: 1,
  mar: 2,
  avr: 3,
  apr: 3,
  mai: 4,
  may: 4,
  juin: 5,
  jun: 5,
  juil: 6,
  jul: 6,
  août: 7,
  aoû: 7,
  aug: 7,
  sept: 8,
  sep: 8,
  oct: 9,
  nov: 10,
  déc: 11,
  dec: 11,
};

// Regex alternation: longer/more specific tokens first so a prefix token
// (e.g. "sep") does not shadow a longer one ("sept"). Both map to the same
// value anyway, but order keeps intent clear.
const MONTH_RE = /(sept|sep|juin|juil|août|aoû|jan|fév|fev|feb|mar|avr|apr|mai|may|jun|jul|aug|oct|nov|déc|dec)/;

export function parseYearMonth(str: string): number | null {
  if (!str) return null;

  const yearMatch = /\d{4}/.exec(str);
  if (!yearMatch) return null;
  const year = Number(yearMatch[0]);

  const monthMatch = str.toLowerCase().match(MONTH_RE);

  return year + (monthMatch ? (MONTH_MAP[monthMatch[1]] ?? 0) / 12 : 0);
}

export function isCurrentPosition(endStr: string): boolean {
  return !endStr || /présent|present/i.test(endStr);
}
