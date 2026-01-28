import React, { useMemo } from 'react';
import {
  format,
  isSameDay,
  isToday,
  isTomorrow,
  addDays,
  startOfDay,
  differenceInMinutes,
} from 'date-fns';
import { Locale } from 'date-fns';
import { CalendarEvent } from '../types';
import { cn } from '../utils';
import { motion } from 'framer-motion';
import { Clock, Users, Paperclip, Bell } from 'lucide-react';

interface AgendaViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onCreateEvent?: () => void;
  locale?: Locale;
  translations?: {
    today?: string;
    tomorrow?: string;
    allDay?: string;
    eventCount?: string;
    eventsCount?: string;
    guestCount?: string;
    guestsCount?: string;
  };
}

const formatDuration = (start: Date, end: Date): string => {
  const minutes = differenceInMinutes(end, start);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
};

export const AgendaView: React.FC<AgendaViewProps> = ({
  currentDate,
  events,
  onEventClick,
  locale,
  translations,
}) => {
  const getDateLabel = (date: Date): string => {
    if (isToday(date)) return translations?.today || 'Today';
    if (isTomorrow(date)) return translations?.tomorrow || 'Tomorrow';
    return format(date, 'EEEE', { locale });
  };

  const getEventCountLabel = (count: number): string => {
    if (count === 1) {
      return `1 ${translations?.eventCount || 'event'}`;
    }
    return `${count} ${translations?.eventsCount || 'events'}`;
  };

  const getGuestCountLabel = (count: number): string => {
    if (count === 1) {
      return `1 ${translations?.guestCount || 'guest'}`;
    }
    return `${count} ${translations?.guestsCount || 'guests'}`;
  };
  // Group events by day for the next 30 days starting from currentDate
  const groupedEvents = useMemo(() => {
    const startDate = startOfDay(currentDate);

    const groups: { date: Date; events: CalendarEvent[] }[] = [];

    // Sort all events by start time first
    const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

    // Iterate through the next 30 days
    for (let i = 0; i < 30; i++) {
      const day = addDays(startDate, i);
      const dayEvents = sortedEvents.filter((event) => isSameDay(event.start, day));

      if (dayEvents.length > 0) {
        groups.push({ date: day, events: dayEvents });
      }
    }

    return groups;
  }, [currentDate, events]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#F9F9FB]">
      <motion.div
        className="mx-auto w-full max-w-3xl px-4 pb-10 md:px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {groupedEvents.map((group) => (
          <motion.div key={group.date.toISOString()} className="relative" variants={item}>
            {/* Date Header */}
            <div className="sticky top-0 z-10 border-b border-border/50 bg-[#F9F9FB] py-4 backdrop-blur-md">
              <div className="flex items-center gap-4">
                {/* Date box */}
                <div
                  className={cn(
                    'flex h-16 w-16 flex-col items-center justify-center rounded-2xl transition-all',
                    isToday(group.date)
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-muted/50 text-foreground'
                  )}
                >
                  <span className="text-2xl font-bold leading-none">
                    {format(group.date, 'd', { locale })}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide opacity-80">
                    {format(group.date, 'MMM', { locale })}
                  </span>
                </div>

                {/* Day info */}
                <div className="flex flex-col">
                  <span
                    className={cn('text-lg font-semibold', isToday(group.date) && 'text-primary')}
                  >
                    {getDateLabel(group.date)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {getEventCountLabel(group.events.length)}
                  </span>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-3 py-4">
              {group.events.map((event) => (
                <motion.div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className={cn(
                    'group relative flex gap-4 rounded-2xl border border-border/40 p-4',
                    'hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
                    'cursor-pointer transition-all duration-200',
                    'from-card via-card to-card/80 bg-gradient-to-br'
                  )}
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute bottom-3 left-0 top-3 w-1 rounded-full"
                    style={{ backgroundColor: event.color || 'var(--primary)' }}
                  />

                  {/* Time Column */}
                  <div className="flex min-w-[70px] flex-col items-center pl-2">
                    {event.allDay ? (
                      <div className="flex flex-col items-center">
                        <span className="rounded-full bg-muted/80 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                          {translations?.allDay || 'All Day'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-base font-semibold text-foreground">
                          {format(event.start, locale?.code === 'fr' ? 'H:mm' : 'h:mm', {
                            locale,
                          })}
                        </span>
                        {locale?.code !== 'fr' && (
                          <span className="text-xs uppercase text-muted-foreground">
                            {format(event.start, 'a', { locale })}
                          </span>
                        )}
                        <div className="my-1 h-3 w-px bg-border" />
                        <span className="text-xs font-medium text-muted-foreground/70">
                          {formatDuration(event.start, event.end)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="line-clamp-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                        {event.title}
                      </h4>
                      {/* Color dot */}
                      <div
                        className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: event.color || 'var(--primary)' }}
                      />
                    </div>

                    {event.description && (
                      <div className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </div>
                    )}

                    {/* Meta info row */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {!event.allDay && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {format(event.start, locale?.code === 'fr' ? 'H:mm' : 'h:mm a', {
                              locale,
                            })}
                          </span>
                        </div>
                      )}

                      {event.guests && event.guests.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          <span>{getGuestCountLabel(event.guests.length)}</span>
                        </div>
                      )}

                      {event.attachments && event.attachments.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Paperclip className="h-3.5 w-3.5" />
                          <span>{event.attachments.length}</span>
                        </div>
                      )}

                      {event.reminders && event.reminders.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Bell className="h-3.5 w-3.5" />
                          <span>{event.reminders.length}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover arrow indicator */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    <svg
                      className="h-5 w-5 text-muted-foreground"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
