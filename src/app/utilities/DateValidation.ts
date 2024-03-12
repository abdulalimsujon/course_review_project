export function getDurationInWeeks(startDate: string, endDate: string): number {
  // Convert start and end dates to JavaScript Date objects
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);

  // Calculate the difference in milliseconds
  const differenceMs: number = end.getTime() - start.getTime();

  // Convert milliseconds to weeks (1 week = 7 days = 7 * 24 * 60 * 60 * 1000 milliseconds)
  const weeks: number = differenceMs / (1000 * 60 * 60 * 24 * 7);

  // Round to the nearest whole number
  return Math.round(weeks);
}
