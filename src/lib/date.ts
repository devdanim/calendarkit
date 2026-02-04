import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays as addDaysFns,
  subDays,
} from 'date-fns';

/** True if the cell is day-level (midnight); false if it's a time slot. */
export function isDayCell(date: Date): boolean {
  return date.getHours() === 0 && date.getMinutes() === 0;
}

/** Cell is in the past: before today for day cells, before now for time slots. */
export function isPastDate(date: Date): boolean {
  const now = new Date();
  if (isDayCell(date)) {
    return startOfDay(date) < startOfDay(now);
  }
  return date.getTime() < now.getTime();
}

export const getMonthGrid = (date: Date, weekStartOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);

  const startDate = startOfWeek(monthStart, { weekStartsOn: weekStartOn });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: weekStartOn });

  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
};

export const getWeekDays = (date: Date, weekStartOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: weekStartOn });
  const end = endOfWeek(date, { weekStartsOn: weekStartOn });
  return eachDayOfInterval({ start, end });
};

export {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDaysFns,
  subDays,
};
