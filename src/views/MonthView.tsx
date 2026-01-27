import React, { useMemo, useCallback } from 'react';
import { format, isSameMonth, isToday, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { getMonthGrid } from '../lib/date';
import { CalendarEvent } from '../types';
import { cn } from '../utils';
import { DraggableEvent } from '../components/dnd/DraggableEvent';
import { DroppableCell } from '../components/dnd/DroppableCell';
import { Locale } from 'date-fns';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  timezone?: string;
  locale?: Locale;
}

// Memoized Event Item Component for performance
const EventItem = React.memo(
  ({
    event,
    onEventClick,
  }: {
    event: CalendarEvent;
    onEventClick?: (e: CalendarEvent) => void;
  }) => (
    <DraggableEvent event={event}>
      <div
        className={cn(
          'cursor-pointer truncate rounded-lg px-2.5 py-1.5 text-xs shadow-sm transition-all duration-200',
          'hover:z-10 hover:scale-[1.02] hover:shadow-md',
          !event.color &&
            'border-[0.5px] border-primary/20 bg-primary/10 text-primary hover:bg-primary/15'
        )}
        style={
          event.color
            ? {
                backgroundColor: `${event.color}20`,
                color: event.color,
                borderLeft: `3px solid ${event.color}`,
              }
            : undefined
        }
        onClick={(e) => {
          e.stopPropagation();
          onEventClick?.(event);
        }}
      >
        <span className="font-medium">{event.title}</span>
      </div>
    </DraggableEvent>
  )
);

EventItem.displayName = 'EventItem';

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onDateClick,
  timezone,
  locale,
}) => {
  const days = useMemo(() => getMonthGrid(currentDate), [currentDate]);

  // Dynamic week days generation
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  // Timezone adjustment helper
  const getZonedDate = useCallback(
    (date: Date) => {
      return timezone ? toZonedTime(date, timezone) : date;
    },
    [timezone]
  );

  // Pre-calculate event buckets for O(1) access during render
  // This is crucial for handling 10000+ events
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();

    events.forEach((event) => {
      const zonedStart = getZonedDate(event.start);
      // Use date string as key (YYYY-MM-DD)
      const key = format(zonedStart, 'yyyy-MM-dd');

      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(event);
    });

    return map;
  }, [events, getZonedDate]);

  return (
    <div className="scrollbar-hide flex h-full min-w-[800px] flex-col overflow-hidden rounded-2xl border-[0.5px] border-border/50 bg-[#F9F9FB] shadow-sm md:min-w-0">
      <div className="relative flex-1 overflow-y-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 grid grid-cols-7 border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/30 via-muted/40 to-muted/30 backdrop-blur-sm">
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="border-r-[0.5px] border-border/30 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground last:border-r-0"
            >
              {format(day, 'EEE', { locale })}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7" style={{ gridAutoRows: '130px' }}>
          {days.map((day) => {
            const dayKey = format(day, 'yyyy-MM-dd');
            const dayEvents = eventsByDay.get(dayKey) || [];

            const isCurrentMonth = isSameMonth(day, currentDate);
            const cellId = day.toISOString();

            return (
              <DroppableCell
                key={cellId}
                id={cellId}
                date={day}
                className={cn(
                  'group relative flex h-[130px] flex-col gap-1.5 overflow-hidden border-b-[0.5px] border-r-[0.5px] border-border/30 p-2 transition-all duration-200 last:border-r-0',
                  !isCurrentMonth && 'bg-muted/5 text-muted-foreground/60',
                  isToday(day) && 'bg-primary/5 ring-1 ring-inset ring-primary/20'
                )}
                onClick={() => onDateClick?.(day)}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
                      isToday(day) &&
                        'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                    )}
                  >
                    {format(day, 'd', { locale })}
                  </div>
                  {dayEvents.length > 0 && (
                    <div className="rounded-full bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60">
                      {dayEvents.length}
                    </div>
                  )}
                </div>

                <div className="scrollbar-hide flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden">
                  {dayEvents.slice(0, 4).map((event) => (
                    <EventItem
                      key={`${event.id}-${dayKey}`}
                      event={event}
                      onEventClick={onEventClick}
                    />
                  ))}
                  {dayEvents.length > 4 && (
                    <div className="cursor-pointer rounded-md bg-primary/5 px-2 py-1 text-center text-[10px] font-semibold text-primary transition-colors hover:bg-primary/10">
                      +{dayEvents.length - 4} more
                    </div>
                  )}
                </div>
              </DroppableCell>
            );
          })}
        </div>
      </div>
    </div>
  );
};
