import React from 'react';
import { cn } from '../utils';

// Base skeleton component
export const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => <div className={cn('animate-pulse rounded bg-muted/40', className)} style={style} />;

// Month View Skeleton
export const MonthViewSkeleton: React.FC = () => (
  <div className="h-full overflow-hidden rounded-2xl border border-border/50 bg-background">
    {/* Header */}
    <div className="grid grid-cols-7 border-b border-border/50 bg-muted/10">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="border-r border-border/30 px-2 py-3 text-center last:border-r-0">
          <Skeleton className="mx-auto h-4 w-8" />
        </div>
      ))}
    </div>
    {/* Grid */}
    <div className="grid flex-1 grid-cols-7">
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} className="min-h-[120px] border-b border-r border-border/30 p-2">
          <Skeleton className="mb-2 h-4 w-6" />
          <div className="space-y-1">
            {i % 2 === 0 && <Skeleton className="h-5 w-full rounded-md" />}
            {i % 3 === 0 && <Skeleton className="h-5 w-3/4 rounded-md" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Week View Skeleton
export const WeekViewSkeleton: React.FC = () => (
  <div className="h-full overflow-hidden rounded-2xl border border-border/50 bg-background">
    {/* Header */}
    <div className="flex border-b border-border/50 bg-muted/10">
      <div className="w-16 border-r border-border/30 p-3">
        <Skeleton className="mx-auto h-8 w-10" />
      </div>
      <div className="grid flex-1 grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="border-r border-border/30 px-2 py-3 text-center last:border-r-0">
            <Skeleton className="mx-auto mb-1 h-3 w-8" />
            <Skeleton className="mx-auto h-8 w-8 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
    {/* Grid */}
    <div className="flex flex-1" style={{ height: '600px' }}>
      <div className="w-16 border-r border-border/30">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="relative h-[60px]">
            <Skeleton className="absolute right-2 h-4 w-10 -translate-y-1/2" />
          </div>
        ))}
      </div>
      <div className="relative grid flex-1 grid-cols-7">
        {Array.from({ length: 7 }).map((_, colIdx) => (
          <div key={colIdx} className="relative border-r border-border/30 last:border-r-0">
            {Array.from({ length: 10 }).map((_, rowIdx) => (
              <div key={rowIdx} className="h-[60px] border-b border-dashed border-border/20" />
            ))}
            {/* Skeleton events */}
            {colIdx % 2 === 0 && (
              <Skeleton
                className="absolute rounded-md"
                style={{
                  top: `${(colIdx * 50) % 400}px`,
                  left: '4px',
                  right: '4px',
                  height: `${60 + ((colIdx * 30) % 120)}px`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Day View Skeleton
export const DayViewSkeleton: React.FC = () => (
  <div className="h-full overflow-hidden rounded-2xl border border-border/50 bg-background">
    {/* Header */}
    <div className="border-b border-border/50 bg-muted/10 px-6 py-4 text-center">
      <Skeleton className="mx-auto h-7 w-64" />
    </div>
    {/* Grid */}
    <div className="flex flex-1" style={{ height: '600px' }}>
      <div className="w-20 border-r border-border/30 bg-muted/5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="relative h-[80px]">
            <Skeleton className="absolute left-1/2 h-4 w-12 -translate-x-1/2 -translate-y-1/2" />
          </div>
        ))}
      </div>
      <div className="relative flex-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-[80px] border-b border-dashed border-border/20" />
        ))}
        {/* Random events */}
        <Skeleton
          className="absolute left-4 right-4 rounded-lg"
          style={{ top: '160px', height: '120px' }}
        />
        <Skeleton
          className="absolute left-4 right-4 rounded-lg"
          style={{ top: '400px', height: '80px' }}
        />
      </div>
    </div>
  </div>
);

// Agenda View Skeleton
export const AgendaViewSkeleton: React.FC = () => (
  <div className="h-full overflow-hidden rounded-2xl border border-border/50 bg-background p-6">
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, dayIdx) => (
        <div key={dayIdx}>
          <Skeleton className="mb-4 h-5 w-40" />
          <div className="space-y-3">
            {Array.from({ length: 2 + (dayIdx % 3) }).map((_, eventIdx) => (
              <div key={eventIdx} className="flex items-center gap-4 rounded-xl bg-muted/10 p-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Calendar Header Skeleton
export const CalendarHeaderSkeleton: React.FC = () => (
  <div className="flex items-center justify-between border-b border-border/50 bg-muted/10 px-4 py-3">
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-40" />
    </div>
    <div className="flex items-center gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-16 rounded-lg" />
      ))}
    </div>
  </div>
);

// Sidebar Skeleton
export const SidebarSkeleton: React.FC = () => (
  <div className="h-full w-[260px] space-y-6 border-r border-border/50 bg-background p-4">
    {/* Create button */}
    <Skeleton className="h-12 w-full rounded-2xl" />

    {/* Mini calendar */}
    <div className="space-y-2">
      <div className="mb-2 flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-1">
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-6 w-6 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="mx-auto h-4 w-4" />
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="mx-auto h-7 w-7 rounded" />
        ))}
      </div>
    </div>

    {/* Calendars section */}
    <div className="rounded-2xl bg-muted/20 p-3">
      <Skeleton className="mb-3 h-4 w-20" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Full Calendar Skeleton (combines all)
export const CalendarSkeleton: React.FC<{ view?: string }> = ({ view = 'month' }) => (
  <div className="flex h-full flex-col">
    <CalendarHeaderSkeleton />
    <div className="flex flex-1 overflow-hidden">
      <SidebarSkeleton />
      <div className="flex-1 p-4">
        {view === 'month' && <MonthViewSkeleton />}
        {view === 'week' && <WeekViewSkeleton />}
        {view === 'day' && <DayViewSkeleton />}
        {view === 'agenda' && <AgendaViewSkeleton />}
      </div>
    </div>
  </div>
);
