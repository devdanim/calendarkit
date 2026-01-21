import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
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
