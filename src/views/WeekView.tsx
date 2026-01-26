import React from 'react';
import {
  format,
  isSameDay,
  differenceInMinutes,
  isToday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { CalendarEvent } from '../types';
import { cn } from '../utils';
import { DraggableEvent } from '../components/dnd/DraggableEvent';
import { DroppableCell } from '../components/dnd/DroppableCell';
import { Locale } from 'date-fns';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onTimeSlotClick?: (date: Date) => void;
  timezone?: string;
  locale?: Locale;
  readonly?: boolean;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
  timezone,
  locale,
  readonly,
}) => {
  // Generate days for the week
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start, end });
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const hourHeight = 60; // px
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to 8am on mount for better UX
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollToActualTime = () => {
        const currentHour = now.getHours();
        const offsetHour = 4; // Scroll a bit above current hour
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

  const zonedNow = getZonedDate(new Date());

  const getTimezoneDisplay = (tz: string | undefined) => {
    // Use zonedNow if tz matches, otherwise calculate for specific tz if needed
    // But here tz IS the current view timezone.
    const date = now;
    let displayTime = '';
    let acronym = '';

    if (!tz) {
      // Local time
      displayTime = format(date, 'HH:mm');
      try {
        acronym =
          new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
            .formatToParts(date)
            .find((part) => part.type === 'timeZoneName')?.value || '';
      } catch {
        acronym = 'LOC';
      }
    } else {
      try {
        const zDate = toZonedTime(date, tz);
        displayTime = format(zDate, 'HH:mm');

        // Get acronym
        // Note: Intl.DateTimeFormat needs the IANA timezone string
        acronym =
          new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
            .formatToParts(date)
            .find((part) => part.type === 'timeZoneName')?.value || '';
      } catch {
        // Fallback
        displayTime = format(date, 'HH:mm');
        acronym = tz;
      }
    }

    // Simplify generic long names if necessary, though 'short' usually works well.
    // E.g. "GMT-5" is often returned for offsets. The user asked for "EST", "PST".
    // Chrome/Node usually return "EST" for America/New_York.

    return (
      <div className="flex flex-col items-center justify-center leading-tight">
        <span>{displayTime}</span>
        <span className="text-[10px] opacity-75">({acronym})</span>
      </div>
    );
  };

  const timeFormat = locale?.code === 'fr' ? 'H:mm' : 'h a';
  const eventTimeFormat = locale?.code === 'fr' ? 'H:mm' : 'h:mm a';
  const nowFormat = locale?.code === 'fr' ? 'H:mm' : 'h:mm';

  return (
    <div className="flex h-full min-w-[800px] flex-col overflow-hidden rounded-2xl border-[0.5px] border-border/50 bg-background shadow-sm md:min-w-0">
      {/* Scrollable Container - includes header for proper alignment */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide relative flex-1 overflow-y-auto scroll-smooth bg-background"
        style={{ scrollbarGutter: 'stable' }}
      >
        {/* Header - sticky inside scroll container */}
        <div className="sticky top-0 z-20 flex border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/20 via-background to-muted/20 backdrop-blur-sm">
          <div className="flex w-16 flex-none items-center justify-center border-r-[0.5px] border-border/30 bg-muted/10 p-3 text-center text-xs font-semibold text-muted-foreground">
            {getTimezoneDisplay(timezone)}
          </div>
          <div className="grid flex-1 grid-cols-7">
            {weekDays.map((day, index) => (
              <div
                key={day.toISOString()}
                className={cn(
                  'px-2 py-3 text-center',
                  index > 0 && 'border-l-[0.5px] border-border/30'
                )}
              >
                <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {format(day, 'EEE', { locale })}
                </div>
                <div
                  className={cn(
                    'mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
                    isToday(day)
                      ? 'scale-110 bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'text-foreground hover:bg-accent/80'
                  )}
                >
                  {format(day, 'd', { locale })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Content */}
        <div className="relative flex min-w-full" style={{ height: hours.length * hourHeight }}>
          {/* Time Labels Column */}
          <div className="relative w-16 flex-none border-r-[0.5px] border-border/30 bg-muted/5">
            {hours.map((hour) => (
              <div
                key={hour}
                className="relative box-border w-full pr-3 text-right text-[11px] font-medium tabular-nums text-muted-foreground/80"
                style={{ height: hourHeight }}
              >
                <span className="block -translate-y-1/2">
                  {hour !== 0 && format(new Date().setHours(hour, 0, 0, 0), timeFormat, { locale })}
                </span>
              </div>
            ))}
          </div>

          {/* Days Columns */}
          <div className="relative grid flex-1 grid-cols-7">
            {weekDays.map((day, dayIndex) => {
              // Filter events for this day
              const dayEvents = events.filter((e) => {
                const zonedStart = getZonedDate(e.start);
                return isSameDay(zonedStart, day);
              });

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'relative h-full',
                    dayIndex > 0 && 'border-l-[0.5px] border-border/30'
                  )}
                >
                  {/* Grid Rows (Droppable Cells) */}
                  {hours.map((hour) => {
                    return (
                      <div
                        key={hour}
                        className="relative box-border w-full border-b-[0.5px] border-dashed border-border/20"
                        style={{ height: hourHeight }}
                      >
                        {/* 4 x 15-minute intervals */}
                        {[0, 15, 30, 45].map((minute) => {
                          const cellDate = new Date(day);
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

                  {/* Events Overlay */}
                  {dayEvents.map((event) => {
                    // Calculate layout for overlapping events
                    // Find all events that overlap with this one
                    const overlappingEvents = dayEvents.filter((e) => {
                      if (e.id === event.id) return false;
                      const s1 = getZonedDate(event.start).getTime();
                      const e1 = getZonedDate(event.end).getTime();
                      const s2 = getZonedDate(e.start).getTime();
                      const e2 = getZonedDate(e.end).getTime();
                      return s1 < e2 && e1 > s2;
                    });

                    // Calculate horizontal position (simple version)
                    // A more robust algorithm would use graph coloring or column packing
                    // For now, we can check how many simultaneous events exist and assign width/left

                    // Sort overlapping group by start time
                    const group = [event, ...overlappingEvents].sort(
                      (a, b) =>
                        getZonedDate(a.start).getTime() - getZonedDate(b.start).getTime() ||
                        (a.id > b.id ? 1 : -1) // stable sort
                    );

                    const index = group.findIndex((e) => e.id === event.id);
                    const count = group.length;

                    const widthPercent = 100 / count;
                    const leftPercent = index * widthPercent;

                    const zonedEventStart = getZonedDate(event.start);
                    const zonedEventEnd = getZonedDate(event.end);

                    const startMinutes =
                      zonedEventStart.getHours() * 60 + zonedEventStart.getMinutes();
                    const durationMinutes = differenceInMinutes(zonedEventEnd, zonedEventStart);

                    const top = (startMinutes / 60) * hourHeight;
                    const height = (durationMinutes / 60) * hourHeight;

                    const isShortEvent = durationMinutes < 60;

                    return (
                      <DraggableEvent
                        key={`${event.id}-${day.toISOString()}`}
                        event={event}
                        className={`absolute z-10 transition-all ${readonly ? 'cursor-default' : ''}`}
                        style={{
                          top: `${top}px`,
                          height: `${Math.max(height, 20)}px`,
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                          // Add minimal spacing between overlapping events
                          paddingRight: count > 1 ? '2px' : '0',
                        }}
                      >
                        <div
                          className={cn(
                            'group relative overflow-hidden rounded-md border shadow-sm transition-all hover:shadow-md',
                            'glass',
                            readonly ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
                            !event.color && 'border-primary/20 bg-primary/10',
                            isShortEvent ? 'flex items-center justify-center px-1' : 'p-2',
                            // Add active border for overlapped events to distinguish them
                            count > 1 && 'border-l-4 border-l-primary/50'
                          )}
                          style={{
                            height: '100%',
                            backgroundColor: event.color ? `${event.color}15` : undefined,
                            borderColor: event.color ? `${event.color}40` : undefined,
                            borderLeftWidth: '3px',
                            borderLeftColor: event.color || 'var(--primary)',
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
                                'truncate font-semibold leading-tight text-foreground/90',
                                isShortEvent ? 'text-center text-xs' : 'text-xs'
                              )}
                            >
                              {event.title}
                            </div>
                            {!isShortEvent && (
                              <>
                                <div className="mt-0.5 truncate text-[10px] font-medium leading-tight text-muted-foreground">
                                  {format(zonedEventStart, eventTimeFormat, { locale })}
                                </div>
                                {event.description && height > 50 && (
                                  <div className="mt-1 truncate text-[10px] leading-tight text-muted-foreground/80 opacity-80">
                                    {event.description}
                                  </div>
                                )}
                              </>
                            )}
                            {/* Overlap Badge */}
                            {count > 1 && !isShortEvent && (
                              <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background/80 text-[9px] font-bold text-muted-foreground shadow-sm backdrop-blur-sm">
                                {count}
                              </div>
                            )}
                          </div>
                        </div>
                      </DraggableEvent>
                    );
                  })}

                  {/* Current Time Indicator */}
                  {isToday(day) && (
                    <div
                      className="pointer-events-none absolute left-0 right-0 z-20 flex items-center"
                      style={{
                        top: `${((zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60) * hourHeight}px`,
                      }}
                    >
                      <div className="h-[2px] w-full bg-gradient-to-r from-primary via-primary to-primary/50" />
                      <div className="absolute -left-1.5 h-3 w-3 animate-pulse rounded-full bg-primary shadow-lg shadow-primary/40 ring-2 ring-background" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Time Label (Left Axis) */}
        <div
          className="pointer-events-none absolute left-0 z-30 flex w-16 justify-end pr-2"
          style={{
            top: `${((zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60) * hourHeight + 80}px`,
          }}
        >
          <span className="-translate-y-1/2 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground shadow-md backdrop-blur-none">
            {format(zonedNow, nowFormat, { locale })}
          </span>
        </div>
      </div>
    </div>
  );
};
