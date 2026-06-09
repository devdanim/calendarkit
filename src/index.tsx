import React, { useId, useState, useMemo, useCallback, useEffect, useRef } from 'react';
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
import { ListView } from './views/ListView';
import { ResourceView } from './views/ResourceView';
import {
  MonthViewSkeleton,
  WeekViewSkeleton,
  DayViewSkeleton,
  ListViewSkeleton,
} from './components/Skeleton';
import { EventContextMenu, useEventContextMenu } from './components/ContextMenu';
import { CalendarProps, CalendarEvent } from './types';
import { cn } from './utils';
import { getThemeStyles } from './lib/theme';
import { useCalendarLogic } from './hooks/useCalendarLogic';
import { differenceInMinutes, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
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
  ListColumn,
  ListSortOption,
  ListViewConfig,
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
  listViewConfig,
  onCalendarToggle,
  isLoading,
  isDarkMode,
  onThemeToggle,
  showSidebar: controlledShowSidebar,
  onSidebarToggle,
  sidebarConfig,
  translations,
  hideViewSwitcher,
  blurContent,
  hideLanguageSelector,
  hideDarkModeToggle,
  language,
  onLanguageChange,
  locale, // Date-fns locale
  newEventButton,
}) => {
  const [activeDragEvent, setActiveDragEvent] = useState<CalendarEvent | null>(null);
  const sheetTouchStartYRef = useRef<number | null>(null);

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
  const mobileBreakpoint = sidebarConfig?.mobileBreakpoint ?? 900;
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const wasCompactLayoutRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleViewportChange = () => {
      setIsCompactLayout(window.innerWidth < mobileBreakpoint);
    };

    handleViewportChange();
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [mobileBreakpoint]);

  useEffect(() => {
    const wasCompactLayout = wasCompactLayoutRef.current;
    const enteredCompactLayout = !wasCompactLayout && isCompactLayout;

    if (enteredCompactLayout && controlledShowSidebar === undefined && sidebarFeatureEnabled) {
      setInternalSidebarOpen(false);
    }

    wasCompactLayoutRef.current = isCompactLayout;
  }, [isCompactLayout, controlledShowSidebar, sidebarFeatureEnabled, setInternalSidebarOpen]);

  const handleSidebarToggle = useCallback(() => {
    if (!sidebarFeatureEnabled) return; // Don't toggle if sidebar feature is disabled
    const newValue = !sidebarVisible;
    if (onSidebarToggle) {
      onSidebarToggle(newValue);
    } else {
      setInternalSidebarOpen(newValue);
    }
  }, [sidebarFeatureEnabled, sidebarVisible, onSidebarToggle, setInternalSidebarOpen]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isCompactLayout && sidebarEnabled) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isCompactLayout, sidebarEnabled]);

  useEffect(() => {
    if (!isCompactLayout || !sidebarEnabled) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleSidebarToggle();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCompactLayout, sidebarEnabled, handleSidebarToggle]);

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
    list: 'List',
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
    more: 'more',
    moreOptions: 'More ideas',
    guestCount: 'guest',
    guestsCount: 'guests',
    sortBy: 'Sort by',
    mostRecent: 'Most recent',
    oldest: 'Oldest',
    noEvents: 'No events',
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

  const handleSheetHandleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    sheetTouchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleSheetHandleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startY = sheetTouchStartYRef.current;
    if (startY === null) return;

    const endY = event.changedTouches[0]?.clientY ?? startY;
    const deltaY = endY - startY;
    sheetTouchStartYRef.current = null;

    if (deltaY > 60) {
      handleSidebarToggle();
    }
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
        className={cn(
          'relative flex h-full bg-[#F9F9FB] text-foreground',
          !isCompactLayout && 'space-x-4',
          className
        )}
        style={getThemeStyles(theme)}
      >
        {/* Sidebar à gauche sur toute la hauteur */}
        {sidebarEnabled && !isCompactLayout && (
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
              showMiniCalendar={showMiniCalendar && view !== 'list'}
              showCalendarFilters={showCalendarFilters}
              showTimezoneSelector={showTimezoneSelector}
              isSheetMode={false}
              locale={locale}
            />
          </div>
        )}

        {sidebarEnabled && isCompactLayout && (
          <div className="fixed inset-0 z-50 h-dvh w-screen">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={handleSidebarToggle}
              aria-label="Close sidebar"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 mx-auto h-[min(88dvh,760px)] w-full max-w-[560px] touch-pan-y"
            >
              <div
                className="flex justify-center py-2"
                onTouchStart={handleSheetHandleTouchStart}
                onTouchEnd={handleSheetHandleTouchEnd}
              >
                <div className="h-1.5 w-12 rounded-full bg-muted-foreground/35" />
              </div>
              <Sidebar
                currentDate={currentDate}
                onDateChange={handleDateChange}
                onViewChange={handleViewChange}
                timezone={timezone}
                onTimezoneChange={onTimezoneChange}
                className="h-[calc(100%-0.5rem)] w-full min-w-0 rounded-b-none rounded-t-3xl border-0 px-0 pb-0 pt-2 shadow-xl"
                calendars={calendars}
                onCalendarToggle={onCalendarToggle}
                translations={t}
                showMiniCalendar={showMiniCalendar && view !== 'list'}
                showCalendarFilters={showCalendarFilters}
                showTimezoneSelector={showTimezoneSelector}
                isSheetMode
                locale={locale}
              />
            </motion.div>
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
            onMenuClick={sidebarFeatureEnabled ? handleSidebarToggle : undefined}
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
            showMobileSidebarCta={isCompactLayout && sidebarFeatureEnabled}
            mobileSidebarCtaLabel={t.moreOptions || "Plus d'idées"}
          />

          <div className="relative flex flex-1 flex-col overflow-hidden">
            {isLoading ? (
              <div className="flex-1 overflow-auto p-0 md:p-4">
                <div className={cn('h-full', view !== 'list' && 'min-w-[max(100%,800px)]')}>
                  {view === 'month' && <MonthViewSkeleton />}
                  {view === 'week' && <WeekViewSkeleton />}
                  {view === 'day' && <DayViewSkeleton />}
                  {view === 'list' && <ListViewSkeleton />}
                  {view === 'resource' && <WeekViewSkeleton />}
                </div>
              </div>
            ) : (
              <div ref={swipeRef} className="flex-1 touch-pan-y overflow-auto p-0 md:p-4">
                <div className={cn('h-full', view !== 'list' && 'min-w-[max(100%,800px)]')}>
                  <div
                    className="h-full"
                    aria-hidden={blurContent ? true : undefined}
                    style={
                      blurContent
                        ? {
                            filter: 'blur(5px)',
                            pointerEvents: 'none',
                            userSelect: 'none',
                          }
                        : undefined
                    }
                  >
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
                            readonly={readOnly}
                            translations={{ more: t.more }}
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
                        {view === 'list' && (
                          <ListView
                            events={filteredEvents}
                            onEventClick={handleEventClickInternal}
                            locale={locale}
                            readonly={readOnly}
                            config={listViewConfig}
                            translations={{
                              sortBy: t.sortBy,
                              mostRecent: t.mostRecent,
                              oldest: t.oldest,
                              noEvents: t.noEvents,
                              title: t.title,
                              date: t.dateAndTime,
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
                            readonly={readOnly}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
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
          {activeDragEvent
            ? (() => {
                const dragHeight = getDragHeight();
                const isShortEvent = dragHeight ? dragHeight <= 40 : false;
                const eventTimeFormat = locale?.code === 'fr' ? 'H:mm' : 'h:mm a';
                const zonedStart = timezone
                  ? toZonedTime(activeDragEvent.start, timezone)
                  : activeDragEvent.start;
                const showDescription =
                  activeDragEvent.description && !isShortEvent && dragHeight && dragHeight > 50;

                // Determine padding and border style based on view
                const isMonthView = view === 'month';
                const padding = isShortEvent
                  ? isMonthView
                    ? 'px-2.5 py-1.5'
                    : 'px-1'
                  : view === 'day'
                    ? 'px-3 py-2'
                    : 'p-2';
                const borderRadius = view === 'day' ? 'rounded-lg' : 'rounded-md';
                const borderStyle = view === 'day' ? 'border-[0.5px]' : 'border';

                return (
                  <div
                    className={cn(
                      'cursor-grabbing overflow-hidden shadow-lg transition-transform',
                      'glass backdrop-blur-sm',
                      borderStyle,
                      !activeDragEvent.color && 'border-primary/20 bg-primary/10',
                      padding,
                      borderRadius
                    )}
                    style={{
                      backgroundColor: activeDragEvent.color
                        ? `${activeDragEvent.color}15`
                        : undefined,
                      borderColor: activeDragEvent.color
                        ? view === 'day'
                          ? `${activeDragEvent.color}30`
                          : `${activeDragEvent.color}40`
                        : undefined,
                      borderLeftWidth: '3px',
                      borderLeftColor: activeDragEvent.color || '#141417',
                      width: getDragWidth(),
                      height: dragHeight ? `${dragHeight}px` : undefined,
                      boxShadow: `0 10px 20px -5px ${activeDragEvent.color || 'var(--primary)'}20, 0 4px 8px -2px rgba(0,0,0,0.1)`,
                      transform: 'rotate(-1deg) scale(1.01)',
                    }}
                  >
                    <div className="flex h-full w-full flex-col overflow-hidden">
                      <div
                        className={cn(
                          'truncate font-semibold leading-tight',
                          isShortEvent
                            ? isMonthView
                              ? 'text-xs'
                              : 'text-center text-xs'
                            : view === 'day'
                              ? 'text-sm'
                              : 'text-xs',
                          activeDragEvent.color ? 'text-foreground' : 'text-foreground/90'
                        )}
                      >
                        {activeDragEvent.title}
                      </div>
                      {!isShortEvent &&
                        (view === 'week' || view === 'day' || view === 'resource') && (
                          <div
                            className={cn(
                              'mt-0.5 truncate font-medium leading-tight text-muted-foreground',
                              view === 'week' ? 'text-[10px]' : 'text-xs'
                            )}
                          >
                            {format(zonedStart, eventTimeFormat, { locale })}
                          </div>
                        )}
                      {showDescription && (
                        <div
                          className={cn(
                            'mt-1 font-normal text-muted-foreground/80',
                            view === 'week'
                              ? 'truncate text-[10px]'
                              : dragHeight && dragHeight > 60
                                ? 'line-clamp-2 text-xs'
                                : 'truncate text-xs'
                          )}
                        >
                          {activeDragEvent.description}
                        </div>
                      )}
                    </div>

                    {/* Drag indicator */}
                    <div className="absolute bottom-1.5 right-1.5 opacity-40">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="9" cy="5" r="1.5" />
                        <circle cx="15" cy="5" r="1.5" />
                        <circle cx="9" cy="12" r="1.5" />
                        <circle cx="15" cy="12" r="1.5" />
                        <circle cx="9" cy="19" r="1.5" />
                        <circle cx="15" cy="19" r="1.5" />
                      </svg>
                    </div>
                  </div>
                );
              })()
            : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};
