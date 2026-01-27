import React, { useId, useState, useMemo, useCallback } from 'react';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  Modifier,
  DragOverlay,
} from '@dnd-kit/core';
import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarHeader } from './components/CalendarHeader';
import { Sidebar } from './components/Sidebar';
import { MonthView } from './views/MonthView';
import { WeekView } from './views/WeekView';
import { DayView } from './views/DayView';
import { AgendaView } from './views/AgendaView';
import { ResourceView } from './views/ResourceView';
import {
  MonthViewSkeleton,
  WeekViewSkeleton,
  DayViewSkeleton,
  AgendaViewSkeleton,
} from './components/Skeleton';
import { EventContextMenu, useEventContextMenu } from './components/ContextMenu';
import { CalendarProps, CalendarEvent } from './types';
import { cn } from './utils';
import { getThemeStyles } from './lib/theme';
import { useCalendarLogic } from './hooks/useCalendarLogic';
import { differenceInMinutes, format } from 'date-fns';
import { useViewSwipe } from './hooks/useSwipeGesture';

// Re-export types for consumers
export type {
  ViewType,
  CalendarEvent,
  CalendarProps,
  CalendarTheme,
  CalendarTranslations,
  EventType,
  Resource,
  EventReminder,
  EventAttachment,
  ThemeColors,
  SidebarConfig,
  CalendarFilterItem,
  CalendarFilterSection,
} from './types';

// Re-export utilities
export { cn } from './utils';

export const Scheduler: React.FC<CalendarProps> = ({
  events = [],
  view: controlledView,
  onViewChange: controlledOnViewChange,
  date: controlledDate,
  onDateChange: controlledOnDateChange,
  onEventClick,
  onEventDrop,
  timezone,
  onTimezoneChange,
  className,
  theme,
  readOnly,
  calendars,
  resources,
  onCalendarToggle,
  isLoading,
  isDarkMode,
  onThemeToggle,
  showSidebar: controlledShowSidebar,
  onSidebarToggle,
  sidebarConfig,
  translations,
  hideViewSwitcher,
  hideLanguageSelector,
  hideDarkModeToggle,
  language,
  onLanguageChange,
  locale, // Date-fns locale
  newEventButton,
}) => {
  const [activeDragEvent, setActiveDragEvent] = useState<CalendarEvent | null>(null);

  // Context menu state
  const { contextMenuEvent, contextMenuPosition, closeContextMenu } = useEventContextMenu();

  const {
    view,
    currentDate,
    isSidebarOpen: internalSidebarOpen,
    setIsSidebarOpen: setInternalSidebarOpen,
    events: expandedEvents,
    handleViewChange,
    handleDateChange,
    handlePrev,
    handleNext,
    handleToday,
    handleDateClick,
    handleTimeSlotClick,
    handleEventClickInternal,
    handleDragEnd,
  } = useCalendarLogic({
    events,
    view: controlledView,
    onViewChange: controlledOnViewChange,
    date: controlledDate,
    onDateChange: controlledOnDateChange,
    onEventClick,
    onEventDrop,
    readOnly,
    timezone,
  });

  // Sidebar: controlled or uncontrolled mode
  // sidebarConfig.enabled controls whether sidebar feature is available (default: true)
  // controlledShowSidebar or internalSidebarOpen controls whether it's currently visible
  const sidebarFeatureEnabled = sidebarConfig?.enabled ?? true;
  const sidebarVisible = controlledShowSidebar ?? internalSidebarOpen;
  const sidebarEnabled = sidebarFeatureEnabled && sidebarVisible;

  const handleSidebarToggle = useCallback(() => {
    if (!sidebarFeatureEnabled) return; // Don't toggle if sidebar feature is disabled
    const newValue = !sidebarVisible;
    if (onSidebarToggle) {
      onSidebarToggle(newValue);
    } else {
      setInternalSidebarOpen(newValue);
    }
  }, [sidebarFeatureEnabled, sidebarVisible, onSidebarToggle, setInternalSidebarOpen]);

  // Sidebar section visibility (default: all visible)
  const showMiniCalendar = sidebarConfig?.showMiniCalendar ?? true;
  const showCalendarFilters = sidebarConfig?.showCalendarFilters ?? true;
  const showTimezoneSelector = sidebarConfig?.showTimezoneSelector ?? true;

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const gridSize = 15; // 15px snap (15 minutes if 60px/hr)
  const snapToGrid = createSnapModifier(gridSize);
  const modifiers: Modifier[] = [snapToGrid, restrictToWindowEdges];

  // Disable DnD if readOnly
  const dndSensors = readOnly ? [] : sensors;

  const id = useId();

  // Mobile swipe gesture support
  const swipeRef = useViewSwipe<HTMLDivElement>(handlePrev, handleNext, true);

  // Default Translations
  const t = {
    today: 'Today',
    tomorrow: 'Tomorrow',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    agenda: 'Agenda',
    resource: 'Resource',
    createEvent: 'Create Event',
    editEvent: 'Edit Event',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    title: 'Title',
    start: 'Start',
    end: 'End',
    allDay: 'All Day',
    description: 'Description',
    repeat: 'Repeat',
    noRepeat: 'Does not repeat',
    selectCalendar: 'Select Calendar',
    selectType: 'Select Type',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    eventCount: 'event',
    eventsCount: 'events',
    guestCount: 'guest',
    guestsCount: 'guests',
    ...translations,
  };

  const handleDragStart = (event: { active: { id: string | number } }) => {
    const { active } = event;
    const draggedEvent = expandedEvents.find((e) => e.id === String(active.id));
    if (draggedEvent) {
      setActiveDragEvent(draggedEvent);
    }
  };

  const onDragEndWrapper = (event: Parameters<typeof handleDragEnd>[0]) => {
    setActiveDragEvent(null);
    handleDragEnd(event);
  };

  // Calculate height for week/day view drag overlay
  const getDragHeight = () => {
    if (!activeDragEvent) return undefined;

    if (view === 'resource') {
      return 80; // Approximate height for resource view events
    }

    if (view !== 'week' && view !== 'day') return undefined;
    const duration = differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
    // If DayView uses 80px, we should account for that.
    // Current implementation: WeekView = 60px, DayView = 80px.
    // But DayView uses 80px in DayView.tsx.
    // Let's assume 60px for now as default or pass a prop.
    // Or check view state.
    const hourHeight = view === 'day' ? 80 : 60;
    return (duration / 60) * hourHeight;
  };

  const getDragWidth = () => {
    if (view === 'month') return '100%';

    if (view === 'resource' && activeDragEvent) {
      const duration = differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
      const width = (duration / 60) * 100; // 100px per hour in ResourceView
      return `${Math.max(width, 4)}px`;
    }

    // For Week/Day views, use a fixed width that looks like a column
    // Ideally we would measure the column width, but a fixed reasonable width works for the ghost
    return '150px';
  };

  // Filter events based on active calendars (supports both formats)
  const filteredEvents = useMemo(() => {
    if (!calendars || calendars.length === 0) return expandedEvents;

    let activeCalendarIds: string[];

    // Check if using section format (has 'items' property)
    if ('items' in calendars[0]) {
      // New section format: flatten all items from all sections
      const sections = calendars as { id: string; items: { id: string; active?: boolean }[] }[];
      activeCalendarIds = sections
        .flatMap((section) => section.items)
        .filter((item) => item.active !== false)
        .map((item) => item.id);
    } else {
      // Legacy flat array format
      const items = calendars as { id: string; active?: boolean }[];
      activeCalendarIds = items.filter((c) => c.active !== false).map((c) => c.id);
    }

    return expandedEvents.filter((e) => {
      // If event has no calendarId, show it by default
      if (!e.calendarId) return true;
      return activeCalendarIds.includes(e.calendarId);
    });
  }, [expandedEvents, calendars]);

  return (
    <DndContext
      id={id}
      sensors={dndSensors}
      onDragStart={handleDragStart}
      onDragEnd={onDragEndWrapper}
      modifiers={modifiers}
    >
      <div
        className={cn('relative flex h-full space-x-4 bg-[#F9F9FB] text-foreground', className)}
        style={getThemeStyles(theme)}
      >
        {/* Sidebar à gauche sur toute la hauteur */}
        {sidebarEnabled && (
          <div className="flex w-64 flex-shrink-0 px-4 py-4">
            <Sidebar
              currentDate={currentDate}
              onDateChange={handleDateChange}
              onViewChange={handleViewChange}
              timezone={timezone}
              onTimezoneChange={onTimezoneChange}
              className="h-full w-full"
              calendars={calendars}
              onCalendarToggle={onCalendarToggle}
              translations={t}
              showMiniCalendar={showMiniCalendar}
              showCalendarFilters={showCalendarFilters}
              showTimezoneSelector={showTimezoneSelector}
              locale={locale}
            />
          </div>
        )}

        {/* Bloc droit avec Header + Calendrier */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <CalendarHeader
            currentDate={currentDate}
            onPrev={handlePrev}
            onNext={handleNext}
            onToday={handleToday}
            view={view}
            onViewChange={handleViewChange}
            onMenuClick={handleSidebarToggle}
            isDarkMode={isDarkMode}
            onThemeToggle={onThemeToggle}
            translations={t}
            hideViewSwitcher={hideViewSwitcher}
            hideLanguageSelector={hideLanguageSelector}
            hideDarkModeToggle={hideDarkModeToggle}
            language={language}
            onLanguageChange={onLanguageChange}
            locale={locale}
            newEventButton={newEventButton}
          />

          <div className="relative flex flex-1 flex-col overflow-hidden">
            {isLoading ? (
              <div className="flex-1 overflow-auto p-0 md:p-4">
                <div className="h-full min-w-full">
                  {view === 'month' && <MonthViewSkeleton />}
                  {view === 'week' && <WeekViewSkeleton />}
                  {view === 'day' && <DayViewSkeleton />}
                  {view === 'agenda' && <AgendaViewSkeleton />}
                  {view === 'resource' && <WeekViewSkeleton />}
                </div>
              </div>
            ) : (
              <div ref={swipeRef} className="flex-1 touch-pan-y overflow-auto p-0 md:p-4">
                <div className="h-full min-w-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${view}-${currentDate.toISOString()}-${timezone || 'local'}`}
                      initial={{ opacity: 0, scale: 0.98, y: 15 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          duration: 0.25,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.98,
                        y: -10,
                        transition: {
                          duration: 0.15,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                      }}
                      className="h-full"
                    >
                      {view === 'month' && (
                        <MonthView
                          currentDate={currentDate}
                          events={filteredEvents}
                          onEventClick={handleEventClickInternal}
                          onDateClick={handleDateClick}
                          timezone={timezone}
                          locale={locale}
                        />
                      )}
                      {view === 'week' && (
                        <WeekView
                          currentDate={currentDate}
                          events={filteredEvents}
                          onEventClick={handleEventClickInternal}
                          onTimeSlotClick={handleTimeSlotClick}
                          timezone={timezone}
                          locale={locale}
                          readonly={readOnly}
                        />
                      )}
                      {view === 'day' && (
                        <DayView
                          currentDate={currentDate}
                          events={filteredEvents}
                          onEventClick={handleEventClickInternal}
                          onTimeSlotClick={handleTimeSlotClick}
                          timezone={timezone}
                          locale={locale}
                          readonly={readOnly}
                          translations={{ today: t.today }}
                        />
                      )}
                      {view === 'agenda' && (
                        <AgendaView
                          currentDate={currentDate}
                          events={filteredEvents}
                          onEventClick={handleEventClickInternal}
                          locale={locale}
                          translations={{
                            today: t.today,
                            tomorrow: t.tomorrow,
                            allDay: t.allDay,
                            eventCount: t.eventCount,
                            eventsCount: t.eventsCount,
                            guestCount: t.guestCount,
                            guestsCount: t.guestsCount,
                          }}
                        />
                      )}
                      {view === 'resource' && resources && (
                        <ResourceView
                          currentDate={currentDate}
                          events={filteredEvents}
                          resources={resources}
                          onEventClick={handleEventClickInternal}
                          onTimeSlotClick={(date) => {
                            if (readOnly) return;
                            handleTimeSlotClick(date);
                          }}
                          locale={locale}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Context Menu */}
        <EventContextMenu
          event={contextMenuEvent}
          position={contextMenuPosition}
          onClose={closeContextMenu}
          onEdit={(event) => {
            handleEventClickInternal(event);
            closeContextMenu();
          }}
          onDelete={() => {
            closeContextMenu();
          }}
          onDuplicate={() => {
            closeContextMenu();
          }}
          translations={{
            edit: t.editEvent || 'Edit',
            delete: t.delete || 'Delete',
            duplicate: 'Duplicate',
          }}
        />

        <DragOverlay dropAnimation={null}>
          {activeDragEvent ? (
            <div
              className={cn(
                'cursor-grabbing overflow-hidden rounded-lg border-2 shadow-2xl transition-transform',
                'backdrop-blur-sm',
                !activeDragEvent.color && 'border-primary/60 bg-primary/90 text-primary-foreground'
              )}
              style={{
                backgroundColor: activeDragEvent.color ? `${activeDragEvent.color}e0` : undefined,
                borderColor: activeDragEvent.color ? `${activeDragEvent.color}80` : undefined,
                color: activeDragEvent.color ? '#fff' : undefined,
                width: getDragWidth(),
                height: getDragHeight() ? `${getDragHeight()}px` : undefined,
                boxShadow: `0 20px 40px -15px ${activeDragEvent.color || 'var(--primary)'}40, 0 10px 20px -10px rgba(0,0,0,0.2)`,
                transform: 'rotate(-2deg) scale(1.02)',
              }}
            >
              <div className="flex h-full flex-col p-2.5">
                {/* Event color accent bar */}
                <div
                  className="absolute bottom-0 left-0 top-0 w-1 rounded-l-lg"
                  style={{ backgroundColor: activeDragEvent.color || 'var(--primary)' }}
                />

                {/* Content */}
                <div className="pl-2">
                  <div className="truncate text-sm font-semibold">{activeDragEvent.title}</div>
                  {(view === 'week' || view === 'day') &&
                    getDragHeight() &&
                    getDragHeight()! > 40 && (
                      <div className="mt-0.5 flex items-center gap-1 text-xs opacity-80">
                        <svg
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        {format(activeDragEvent.start, 'h:mm a')}
                      </div>
                    )}
                </div>

                {/* Drag indicator */}
                <div className="absolute bottom-1.5 right-1.5 opacity-60">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="5" r="1.5" />
                    <circle cx="15" cy="5" r="1.5" />
                    <circle cx="9" cy="12" r="1.5" />
                    <circle cx="15" cy="12" r="1.5" />
                    <circle cx="9" cy="19" r="1.5" />
                    <circle cx="15" cy="19" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};
