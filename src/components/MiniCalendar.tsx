import React from 'react';
import {
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
} from 'date-fns';
import { Locale } from 'date-fns';
import { getMonthGrid } from '../lib/date';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils';

import { ViewType } from '../types';

interface MiniCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange?: (view: ViewType) => void;
  className?: string;
  locale?: Locale;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  currentDate,
  onDateChange,
  onViewChange,
  className,
  locale,
}) => {
  const [viewDate, setViewDate] = React.useState(currentDate);

  // Sync viewDate with currentDate when it changes externally
  React.useEffect(() => {
    setViewDate(currentDate);
  }, [currentDate]);

  const days = React.useMemo(() => getMonthGrid(viewDate), [viewDate]);

  // Generate weekday headers based on locale
  const weekDays = React.useMemo(() => {
    const start = startOfWeek(new Date(), { locale });
    return Array.from(
      {
        length: 7,
      },
      (_, i) => format(addDays(start, i), 'EEEEE', { locale })
    );
  }, [locale]);

  const handlePrev = () => {
    const newDate = subMonths(viewDate, 1);
    setViewDate(newDate);
    // Optional: if user wants to sync main calendar on arrow click, uncomment:
    onDateChange(newDate);
    if (onViewChange) onViewChange('month');
  };

  const handleNext = () => {
    const newDate = addMonths(viewDate, 1);
    setViewDate(newDate);
    // Optional: if user wants to sync main calendar on arrow click, uncomment:
    onDateChange(newDate);
    if (onViewChange) onViewChange('month');
  };

  const handleDateClick = (day: Date) => {
    onDateChange(day);
    if (onViewChange) onViewChange('day');
  };

  return (
    <div className={cn('w-[260px] px-4', className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold capitalize text-foreground">
          {format(viewDate, 'MMMM yyyy', { locale })}
        </span>
        <div className="flex items-center rounded-lg bg-muted/40 p-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md transition-all hover:bg-background/80"
            onClick={handlePrev}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-md transition-all hover:bg-background/80"
            onClick={handleNext}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="mb-2 grid grid-cols-7 gap-y-2 text-center">
        {weekDays.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className="text-[10px] font-semibold uppercase text-muted-foreground/70"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {days.map((day) => {
          const isSelected = isSameDay(day, currentDate);
          const isCurrentMonth = isSameMonth(day, viewDate);
          const isTodayDate = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              className={cn(
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-200',
                !isCurrentMonth && 'text-muted-foreground/30',
                isCurrentMonth &&
                  !isSelected &&
                  !isTodayDate &&
                  'text-foreground hover:bg-accent/80',
                isSelected && 'scale-105 bg-[#DAF9FF] text-primary',
                !isSelected && isTodayDate && 'bg-primary text-white'
              )}
            >
              {format(day, 'd', { locale })}
            </button>
          );
        })}
      </div>
    </div>
  );
};
