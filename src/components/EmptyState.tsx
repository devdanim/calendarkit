import React from 'react';
import { Calendar, CalendarDays, CalendarClock, ListTodo, Users, Plus } from 'lucide-react';
import { cn } from '../utils';
import { ViewType } from '../types';

interface EmptyStateProps {
  view: ViewType;
  onCreateEvent?: () => void;
  translations?: {
    noEvents?: string;
    noEventsDesc?: string;
    createFirst?: string;
    createEvent?: string;
  };
  className?: string;
}

const viewIcons: Record<ViewType, React.ReactNode> = {
  month: <Calendar className="h-16 w-16 text-muted-foreground/30" strokeWidth={1.5} />,
  week: <CalendarDays className="h-16 w-16 text-muted-foreground/30" strokeWidth={1.5} />,
  day: <CalendarClock className="h-16 w-16 text-muted-foreground/30" strokeWidth={1.5} />,
  agenda: <ListTodo className="h-16 w-16 text-muted-foreground/30" strokeWidth={1.5} />,
  resource: <Users className="h-16 w-16 text-muted-foreground/30" strokeWidth={1.5} />,
};

const viewTitles: Record<ViewType, string> = {
  month: 'No events this month',
  week: 'No events this week',
  day: 'No events today',
  agenda: 'No upcoming events',
  resource: 'No scheduled resources',
};

const viewDescriptions: Record<ViewType, string> = {
  month: 'Your calendar is clear. Add your first event to get started.',
  week: 'Nothing scheduled for this week. Create an event to begin planning.',
  day: 'Your day is free. Schedule something to make the most of it.',
  agenda: 'No events coming up. Plan ahead by creating new events.',
  resource: 'No resources have been assigned yet.',
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  view,
  onCreateEvent,
  translations,
  className,
}) => {
  const title = translations?.noEvents || viewTitles[view];
  const description = translations?.noEventsDesc || viewDescriptions[view];

  return (
    <div
      className={cn(
        'flex h-full min-h-[400px] flex-col items-center justify-center px-6 py-12',
        className
      )}
    >
      {/* Decorative background */}
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 rounded-full bg-gradient-to-br from-primary/5 via-transparent to-primary/5 blur-3xl" />
        <div className="relative rounded-3xl border border-border/30 bg-gradient-to-br from-muted/30 to-muted/10 p-6">
          {viewIcons[view]}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-sm text-center">
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{description}</p>

        {/* Create button */}
        {onCreateEvent && (
          <button
            onClick={onCreateEvent}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            {translations?.createEvent || 'Create Event'}
          </button>
        )}
      </div>

      {/* Decorative dots pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-primary/20" />
        <div className="absolute right-1/3 top-1/3 h-3 w-3 rounded-full bg-primary/10" />
        <div className="absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-primary/15" />
        <div className="absolute bottom-1/3 right-1/4 h-4 w-4 rounded-full bg-primary/5" />
      </div>
    </div>
  );
};

// Mini empty state for use in smaller containers
export const MiniEmptyState: React.FC<{
  message?: string;
  className?: string;
}> = ({ message = 'No events', className }) => (
  <div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
    <Calendar className="mb-3 h-10 w-10 text-muted-foreground/20" strokeWidth={1.5} />
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

// Empty state specifically for Agenda View with date context
export const AgendaEmptyState: React.FC<{
  onCreateEvent?: () => void;
  translations?: {
    noUpcoming?: string;
    createEvent?: string;
  };
}> = ({ onCreateEvent, translations }) => (
  <div className="flex h-full min-h-[400px] flex-col items-center justify-center py-12">
    <div className="relative mb-8">
      <div className="rounded-3xl border border-border/30 bg-gradient-to-br from-green-50 to-blue-50 p-8 dark:from-green-900/10 dark:to-blue-900/10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="text-left">
            <div className="font-medium text-foreground">All caught up!</div>
            <div className="text-sm text-muted-foreground">No events scheduled</div>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-sm text-center">
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {translations?.noUpcoming || 'Your schedule is clear'}
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        No upcoming events to show. Create a new event to start planning.
      </p>

      {onCreateEvent && (
        <button
          onClick={onCreateEvent}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          {translations?.createEvent || 'Create Event'}
        </button>
      )}
    </div>
  </div>
);
