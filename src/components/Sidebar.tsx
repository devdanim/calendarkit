import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { MiniCalendar } from './MiniCalendar';
import { cn } from '../utils';
import { toZonedTime } from 'date-fns-tz';
import { format, Locale } from 'date-fns';

import { ViewType, CalendarEvent, CalendarFilterItem, CalendarFilterSection } from '../types';

interface SidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange?: (view: ViewType) => void;
  timezone?: string;
  onTimezoneChange?: (timezone: string) => void;
  className?: string;
  calendars?: CalendarFilterItem[] | CalendarFilterSection[];
  onCalendarToggle?: (calendarId: string, active: boolean) => void;
  translations?: Record<string, string>;
  events?: CalendarEvent[];
  onImport?: (events: Partial<CalendarEvent>[]) => void;
  /** Show/hide the mini calendar (default: true) */
  showMiniCalendar?: boolean;
  /** Show/hide the calendar filters (default: true) */
  showCalendarFilters?: boolean;
  /** Show/hide the timezone selector (default: true) */
  showTimezoneSelector?: boolean;
  /** Date-fns locale for formatting */
  locale?: Locale;
}

/**
 * Helper to determine if calendars prop is using the new section format
 */
function isFilterSectionArray(
  calendars: CalendarFilterItem[] | CalendarFilterSection[]
): calendars is CalendarFilterSection[] {
  if (!calendars || calendars.length === 0) return false;
  // Check if first item has 'items' property (section format)
  return 'items' in calendars[0];
}

/**
 * Normalize calendars to section format for consistent rendering
 */
function normalizeToSections(
  calendars: CalendarFilterItem[] | CalendarFilterSection[] | undefined,
  defaultTitle: string
): CalendarFilterSection[] {
  if (!calendars || calendars.length === 0) {
    // Return default demo data as a section
    return [
      {
        id: 'default',
        title: defaultTitle,
        items: [
          { id: '1', label: 'My Calendar', color: '#3b82f6', active: true },
          { id: '2', label: 'Birthdays', color: '#10b981', active: true },
          { id: '3', label: 'Tasks', color: '#6366f1', active: true },
        ],
      },
    ];
  }

  if (isFilterSectionArray(calendars)) {
    return calendars;
  }

  // Convert flat array to single section
  return [
    {
      id: 'default',
      title: defaultTitle,
      items: calendars,
    },
  ];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentDate,
  onDateChange,
  onViewChange,
  timezone,
  onTimezoneChange,
  className,
  calendars,
  onCalendarToggle,
  translations,
  showMiniCalendar = true,
  showCalendarFilters = true,
  showTimezoneSelector = true,
  locale,
}) => {
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Normalize calendars to sections format
  const filterSections = normalizeToSections(calendars, translations?.calendars || 'Calendars');

  // Track collapsed state for each section
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    filterSections.forEach((section) => {
      initial[section.id] = section.collapsed ?? false;
    });
    return initial;
  });

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Only run on client to prevent hydration mismatch
  useEffect(() => {
    const initializeTime = () => {
      setHasMounted(true);
      setNow(new Date());
    };
    // Use setTimeout to avoid synchronous setState warning
    const initTimer = setTimeout(initializeTime, 0);
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => {
      clearTimeout(initTimer);
      clearInterval(timer);
    };
  }, []);

  const getAcronym = (tz: string) => {
    if (!tz || !now) return 'LOC';
    try {
      return (
        new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
          .formatToParts(now)
          .find((part) => part.type === 'timeZoneName')?.value || ''
      );
    } catch {
      return '';
    }
  };

  const timezones = [
    { value: '', label: 'Local Time', acronym: 'LOC' },
    { value: 'UTC', label: 'UTC', acronym: 'UTC' },
    { value: 'America/New_York', label: 'New York', acronym: 'EST' },
    { value: 'America/Chicago', label: 'Chicago', acronym: 'CST' },
    { value: 'America/Denver', label: 'Denver', acronym: 'MST' },
    { value: 'America/Los_Angeles', label: 'Los Angeles', acronym: 'PST' },
    { value: 'Europe/London', label: 'London', acronym: 'GMT' },
    { value: 'Europe/Paris', label: 'Paris', acronym: 'CET' },
    { value: 'Europe/Berlin', label: 'Berlin', acronym: 'CET' },
    { value: 'Asia/Dubai', label: 'Dubai', acronym: 'GST' },
    { value: 'Asia/Tokyo', label: 'Tokyo', acronym: 'JST' },
    { value: 'Asia/Singapore', label: 'Singapore', acronym: 'SGT' },
    { value: 'Australia/Sydney', label: 'Sydney', acronym: 'AEDT' },
  ];

  // Format label with time: HH:MM (ACR)
  const formatTzLabel = (
    tz: { value: string; label: string; acronym: string },
    showTime: boolean = true
  ) => {
    // Don't show time if not mounted yet (SSR) to prevent hydration mismatch
    if (!hasMounted || !now || !showTime) {
      return <span>{tz.label}</span>;
    }

    let time = '';
    let acronym = tz.acronym;

    try {
      if (!tz.value) {
        time = format(now, 'HH:mm');
        // Try to get real local acronym
        try {
          acronym =
            new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
              .formatToParts(now)
              .find((part) => part.type === 'timeZoneName')?.value || 'LOC';
        } catch {}
      } else {
        const zDate = toZonedTime(now, tz.value);
        time = format(zDate, 'HH:mm');
        // Calculate dynamic acronym if needed (e.g. DST changes)
        const dynAcronym = getAcronym(tz.value);
        if (dynAcronym && !dynAcronym.includes('GMT') && !dynAcronym.includes('Time')) {
          acronym = dynAcronym;
        }
      }
    } catch {
      return <span>{tz.label}</span>;
    }

    return (
      <div className="flex w-full justify-between">
        <span>{tz.label}</span>
        <span className="ml-2 tabular-nums text-muted-foreground">
          {time} <span className="text-xs opacity-75">({acronym})</span>
        </span>
      </div>
    );
  };

  const selectedTzObj = timezones.find((t) => t.value === (timezone || ''));
  const selectedTimezoneLabel = selectedTzObj
    ? formatTzLabel(selectedTzObj)
    : translations?.localTime || 'Local Time';

  return (
    <div
      className={cn(
        'scrollbar-hide flex h-full min-w-[256px] flex-col overflow-y-auto overflow-x-hidden bg-gradient-to-b from-background via-background to-muted/10 pb-4 pt-4',
        className
      )}
    >
      {showMiniCalendar && (
        <MiniCalendar
          currentDate={currentDate}
          onDateChange={onDateChange}
          onViewChange={onViewChange}
          locale={locale}
        />
      )}

      <div className={cn('flex-1 space-y-4 px-4', showMiniCalendar ? 'mt-5' : 'mt-0')}>
        {/* Filter Sections */}
        {showCalendarFilters &&
          filterSections.map((section) => {
            const isCollapsed = collapsedSections[section.id] ?? false;

            return (
              <div
                key={section.id}
                className="rounded-2xl border-[0px] border-border/30 bg-muted/20 p-3"
              >
                {section.title && (
                  <div
                    className="-m-1 mb-2 flex cursor-pointer items-center justify-between rounded-xl p-2 transition-all duration-200 hover:bg-accent/50"
                    onClick={() => toggleSection(section.id)}
                  >
                    <span className="text-sm font-semibold text-foreground">{section.title}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-muted-foreground transition-transform duration-200',
                        !isCollapsed && 'rotate-180'
                      )}
                    />
                  </div>
                )}
                {!isCollapsed && (
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-all duration-200 hover:bg-accent/60"
                        onClick={() => onCalendarToggle?.(item.id, !(item.active ?? true))}
                      >
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={item.active ?? true}
                            onChange={(e) => {
                              e.stopPropagation();
                              onCalendarToggle?.(item.id, e.target.checked);
                            }}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-border/60 transition-all duration-200 checked:border-transparent"
                            style={{ '--primary-color': item.color } as React.CSSProperties}
                            data-cal-id={item.id}
                          />
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                              className="h-3.5 w-3.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <style>{`
                          input[type="checkbox"][data-cal-id="${item.id}"]:checked {
                            background-color: ${item.color} !important;
                            border-color: ${item.color} !important;
                          }
                          input[type="checkbox"][data-cal-id="${item.id}"]:focus {
                            --tw-ring-color: ${item.color}40 !important;
                          }
                        `}</style>
                        </div>
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          {item?.icon}
                          <span className="truncate text-sm font-medium text-foreground/90">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Timezone Selector - Custom UI */}
      {showTimezoneSelector && (
        <div className="mt-auto px-4 pt-5">
          <div className="rounded-2xl bg-muted/20 p-3">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-1.5">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {translations?.timezone || 'Timezone'}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setTimezoneOpen(!timezoneOpen)}
                className="flex w-full items-center justify-between rounded-xl bg-blue-200/40 py-2.5 pl-4 pr-3 text-left text-sm text-foreground transition-all duration-200 hover:bg-blue-200/80 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <div className="mr-2 flex-1 truncate font-medium">{selectedTimezoneLabel}</div>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-200',
                    timezoneOpen && 'rotate-180'
                  )}
                />
              </button>

              {timezoneOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setTimezoneOpen(false)} />
                  <div className="animate-in fade-in zoom-in-95 absolute bottom-full left-0 z-50 mb-2 max-h-[260px] w-full overflow-y-auto rounded-xl bg-background p-1.5 shadow-2xl backdrop-blur-none duration-200">
                    {timezones.map((tz) => (
                      <div
                        key={tz.value}
                        className={cn(
                          'cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
                          (timezone || '') === tz.value
                            ? 'bg-primary font-semibold text-primary-foreground'
                            : 'text-foreground hover:bg-accent/80'
                        )}
                        onClick={() => {
                          onTimezoneChange?.(tz.value);
                          setTimezoneOpen(false);
                        }}
                      >
                        {formatTzLabel(tz)}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
