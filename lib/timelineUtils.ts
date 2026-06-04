export interface TimelineItem {
  id: string;
  company: string;
  start: number;
  end: number;
  row: number;
}

// Greedy row-packing: place each mission on the first row whose previous
// mission ended early enough (gap tolerance ≈ 2 weeks) to avoid visual overlap.
export function assignRows(items: Omit<TimelineItem, 'row'>[]): TimelineItem[] {
  const sorted = [...items].sort((a, b) => a.start - b.start);
  const rowEnds: number[] = [];
  return sorted.map((item) => {
    let row = 0;
    // eslint-disable-next-line security/detect-object-injection
    while (rowEnds[row] !== undefined && rowEnds[row] > item.start + 0.04) {
      row++;
    }
    // eslint-disable-next-line security/detect-object-injection
    rowEnds[row] = item.end;
    return { ...item, row };
  });
}

export const MIN_YEAR = 2010;
export const MAX_YEAR = 2025.83;
const SPAN = MAX_YEAR - MIN_YEAR;

export const yearToPct = (y: number): number => ((y - MIN_YEAR) / SPAN) * 100;
