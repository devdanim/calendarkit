import React from 'react';
import { format, differenceInMinutes, isToday, isSameDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { CalendarEvent } from '../types';
import { cn } from '../utils';
import { DraggableEvent } from '../components/dnd/DraggableEvent';
import { DroppableCell } from '../components/dnd/DroppableCell';
import { Locale } from 'date-fns';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onTimeSlotClick?: (date: Date) => void;
  timezone?: string;
  locale?: Locale;
  readonly?: boolean;
  translations?: {
    today?: string;
  };
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
  timezone,
  locale,
  readonly,
  translations,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourHeight = 80; // Larger height for Day View
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to 8am on mount
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollToActualTime = () => {
        const currentHour = now.getHours();
        const offsetHour = 3; // Scroll a bit above current hour
        return (currentHour - offsetHour) * hourHeight;
      };
      scrollContainerRef.current.scrollTop = scrollToActualTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timezone adjustment helper
  const getZonedDate = (date: Date) => {
    return timezone ? toZonedTime(date, timezone) : date;
  };

  const zonedNow = getZonedDate(now);

  // Filter events for the current day
  const dayEvents = events.filter((e) => {
    const zonedStart = getZonedDate(e.start);
    return isSameDay(zonedStart, currentDate);
  });

  const timeFormat = locale?.code === 'fr' ? 'H:mm' : 'h a';
  const eventTimeFormat = locale?.code === 'fr' ? 'H:mm' : 'h:mm a';
  const nowFormat = locale?.code === 'fr' ? 'H:mm' : 'h:mm a';

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border-[0.5px] border-border/50 bg-[#14141705] shadow-sm">
      {/* Header */}
      <div className="shrink-0 border-b-[0.5px] border-border/50 bg-[#14141705] px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-xl font-semibold capitalize text-foreground">
            {format(currentDate, 'EEEE, MMMM d, yyyy', { locale })}
          </h2>
          {isToday(currentDate) && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20">
              {translations?.today || 'Today'}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div ref={scrollContainerRef} className="relative flex-1 overflow-y-auto bg-[#14141705]">
        <div className="relative flex" style={{ height: hours.length * hourHeight }}>
          {/* Time Labels */}
          <div className="relative w-20 border-r-[0.5px] border-border/30 bg-[#14141705]">
            {hours.map((hour) => (
              <div key={hour} className="relative w-full" style={{ height: hourHeight }}>
                {hour !== 0 && (
                  <span className="absolute -top-3 left-1/2 w-full -translate-x-1/2 rounded-md px-1.5 py-0.5 text-center text-[11px] font-medium tabular-nums text-muted-foreground/80">
                    {format(new Date().setHours(hour, 0, 0, 0), timeFormat, { locale })}
                  </span>
                )}
              </div>
            ))}

            {/* Left Side Current Time Indicator (Overlay) */}
            {isToday(currentDate) && (
              <div
                className="pointer-events-none absolute left-0 z-30 flex w-full justify-end pr-2"
                style={{
                  top: `${((zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60) * hourHeight}px`,
                }}
              >
                <span className="-translate-y-1/2 rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white shadow-md shadow-primary/30">
                  {format(zonedNow, nowFormat, { locale })}
                </span>
              </div>
            )}
          </div>

          {/* Day Column */}
          <div className="relative flex-1">
            {hours.map((hour) => {
              return (
                <div
                  key={hour}
                  className="relative box-border border-b-[0.5px] border-dashed border-border/20 bg-[#F9F9FB]"
                  style={{ height: hourHeight }}
                >
                  {/* 4 x 15-minute intervals */}
                  {[0, 15, 30, 45].map((minute) => {
                    const cellDate = new Date(currentDate);
                    cellDate.setHours(hour, minute, 0, 0);
                    const cellId = cellDate.toISOString();

                    return (
                      <DroppableCell
                        key={minute}
                        id={cellId}
                        date={cellDate}
                        className="absolute left-0 right-0 z-0 w-full transition-colors"
                        style={{
                          height: '25%',
                          top: `${(minute / 60) * 100}%`,
                        }}
                      >
                        <div
                          className="h-full w-full cursor-pointer bg-transparent"
                          onClick={() => onTimeSlotClick?.(cellDate)}
                        />
                      </DroppableCell>
                    );
                  })}
                </div>
              );
            })}

            {dayEvents.map((event) => {
              // Calculate layout for overlapping events (same logic as WeekView)
              const overlappingEvents = dayEvents.filter((e) => {
                if (e.id === event.id) return false;
                const s1 = getZonedDate(event.start).getTime();
                const e1 = getZonedDate(event.end).getTime();
                const s2 = getZonedDate(e.start).getTime();
                const e2 = getZonedDate(e.end).getTime();
                return s1 < e2 && e1 > s2;
              });

              // Sort overlapping group by start time for consistent positioning
              const group = [event, ...overlappingEvents].sort(
                (a, b) =>
                  getZonedDate(a.start).getTime() - getZonedDate(b.start).getTime() ||
                  (a.id > b.id ? 1 : -1)
              );

              const index = group.findIndex((e) => e.id === event.id);
              const count = group.length;

              const widthPercent = 100 / count;
              const leftPercent = index * widthPercent;

              const zonedStart = getZonedDate(event.start);
              const zonedEnd = getZonedDate(event.end);

              const startMinutes = zonedStart.getHours() * 60 + zonedStart.getMinutes();
              const durationMinutes = differenceInMinutes(zonedEnd, zonedStart);
              const top = (startMinutes / 60) * hourHeight;
              const height = (durationMinutes / 60) * hourHeight;

              const isShortEvent = durationMinutes < 45;

              return (
                <DraggableEvent
                  key={`${event.id}-${currentDate.toISOString()}`}
                  event={event}
                  className={`absolute z-10 transition-all ${readonly ? 'cursor-default' : ''}`}
                  style={{
                    top: `${top}px`,
                    height: `${Math.max(height, 28)}px`,
                    left: `calc(${leftPercent}% + 4px)`,
                    width: `calc(${widthPercent}% - 8px)`,
                    paddingRight: count > 1 ? '2px' : '0',
                  }}
                >
                  <div
                    className={cn(
                      'group h-full overflow-hidden rounded-lg border-[0.5px] shadow-sm transition-all hover:z-20 hover:shadow-lg',
                      'glass backdrop-blur-sm',
                      readonly ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
                      !event.color && 'border-primary/20 bg-primary/10',
                      isShortEvent ? 'flex items-center px-2' : 'px-3 py-2',
                      count > 1 && 'border-l-4'
                    )}
                    style={{
                      backgroundColor: event.color ? `${event.color}15` : undefined,
                      borderColor: event.color ? `${event.color}30` : undefined,
                      borderLeftColor: event.color || 'var(--primary)',
                      borderLeftWidth: count > 1 ? '4px' : '3px',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event);
                    }}
                    title={count > 1 ? `${event.title} (${index + 1}/${count})` : undefined}
                  >
                    <div className="flex h-full w-full flex-col overflow-hidden">
                      <div
                        className={cn(
                          'truncate font-semibold leading-tight',
                          isShortEvent ? 'text-xs' : 'text-sm',
                          event.color ? 'text-foreground' : 'text-foreground/90'
                        )}
                      >
                        {event.title}
                      </div>
                      {!isShortEvent && (
                        <>
                          <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                            {format(zonedStart, eventTimeFormat, { locale })}
                          </div>
                          {event.description && height > 60 && (
                            <div className="mt-1 line-clamp-2 text-xs text-muted-foreground/80">
                              {event.description}
                            </div>
                          )}
                        </>
                      )}
                      {/* Overlap Badge */}
                      {count > 1 && !isShortEvent && (
                        <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background/90 text-[10px] font-bold text-muted-foreground shadow-sm backdrop-blur-sm">
                          {count}
                        </div>
                      )}
                    </div>
                  </div>
                </DraggableEvent>
              );
            })}

            {/* Current Time Indicator */}
            {isToday(currentDate) && (
              <div
                className="pointer-events-none absolute left-0 right-0 z-20 flex items-center"
                style={{
                  top: `${((zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60) * hourHeight}px`,
                }}
              >
                {/* Line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-primary via-primary to-primary/50" />
                {/* Dot */}
                <div className="absolute -left-1.5 h-3 w-3 animate-pulse rounded-full bg-primary shadow-lg shadow-primary/40 ring-2 ring-background" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
