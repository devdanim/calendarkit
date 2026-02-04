import { useState } from 'react';
import {
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  differenceInMilliseconds,
} from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { DragEndEvent } from '@dnd-kit/core';
import { ViewType, CalendarEvent } from '../types';
import { isPastDate } from '../lib/date';

interface UseCalendarLogicProps {
  events: CalendarEvent[];
  view?: ViewType;
  onViewChange?: (view: ViewType) => void;
  date?: Date;
  onDateChange?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onEventDrop?: (event: CalendarEvent, start: Date, end: Date) => void;
  readOnly?: boolean;
  timezone?: string;
}

export const useCalendarLogic = ({
  events,
  view: controlledView,
  onViewChange: controlledOnViewChange,
  date: controlledDate,
  onDateChange: controlledOnDateChange,
  onEventClick,
  onEventDrop,
  readOnly,
  timezone,
}: UseCalendarLogicProps) => {
  const [internalView, setInternalView] = useState<ViewType>('week');
  const [internalDate, setInternalDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [modalInitialDate, setModalInitialDate] = useState<Date | undefined>(undefined);

  const view = controlledView ?? internalView;
  const currentDate = controlledDate ?? internalDate;

  const handleViewChange = (newView: ViewType) => {
    if (controlledOnViewChange) {
      controlledOnViewChange(newView);
    } else {
      setInternalView(newView);
    }
  };

  const handleDateChange = (newDate: Date) => {
    if (controlledOnDateChange) {
      controlledOnDateChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  };

  const handlePrev = () => {
    switch (view) {
      case 'month':
        handleDateChange(subMonths(currentDate, 1));
        break;
      case 'week':
        handleDateChange(subWeeks(currentDate, 1));
        break;
      case 'day':
      case 'resource':
        handleDateChange(subDays(currentDate, 1));
        break;
      case 'agenda':
        handleDateChange(subDays(currentDate, 7));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'month':
        handleDateChange(addMonths(currentDate, 1));
        break;
      case 'week':
        handleDateChange(addWeeks(currentDate, 1));
        break;
      case 'day':
      case 'resource':
        handleDateChange(addDays(currentDate, 1));
        break;
      case 'agenda':
        handleDateChange(addDays(currentDate, 7));
        break;
    }
  };

  const handleToday = () => {
    handleDateChange(new Date());
  };

  const handleDateClick = (date: Date) => {
    handleDateChange(date);
    handleViewChange('day');
  };

  const handleTimeSlotClick = (date: Date) => {
    if (readOnly) return;
    setSelectedEvent(null);
    setModalInitialDate(date);
    setIsModalOpen(true);
  };

  const handleEventClickInternal = (event: CalendarEvent) => {
    if (onEventClick) {
      onEventClick(event);
    }

    if (!readOnly) {
      setSelectedEvent(event);
      setModalInitialDate(undefined);
      setIsModalOpen(true);
    }
  };

  const handleCreateEvent = () => {
    if (readOnly) return;
    setSelectedEvent(null);
    setModalInitialDate(new Date());
    setIsModalOpen(true);
  };

  const handleModalSave = () => {
    // Placeholder - consumer should provide their own save logic via renderEventForm
  };

  const handleModalDelete = () => {
    // Placeholder - consumer should provide their own delete logic via renderEventForm
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeEvent = active.data.current?.event as CalendarEvent;
    const overDate = over.data.current?.date as Date;

    if (!activeEvent || !overDate) return;

    // Interdire le drop dans la zone passée (avant la date/heure actuelle)
    if (isPastDate(overDate)) return;

    const originalStart = new Date(activeEvent.start);
    const originalEnd = new Date(activeEvent.end);
    const duration = differenceInMilliseconds(originalEnd, originalStart);

    let newStart: Date;

    if (view === 'month') {
      // For month view, overDate is the day cell
      // We need to preserve the original time but change the date
      if (timezone) {
        // Get the original time in the target timezone
        const zonedOriginal = toZonedTime(originalStart, timezone);
        // Create new date with overDate's date but original's time
        const zonedNew = new Date(overDate);
        zonedNew.setHours(zonedOriginal.getHours());
        zonedNew.setMinutes(zonedOriginal.getMinutes());
        zonedNew.setSeconds(zonedOriginal.getSeconds());
        zonedNew.setMilliseconds(zonedOriginal.getMilliseconds());
        // Convert back from zoned time to UTC
        newStart = fromZonedTime(zonedNew, timezone);
      } else {
        newStart = new Date(overDate);
        newStart.setHours(originalStart.getHours());
        newStart.setMinutes(originalStart.getMinutes());
        newStart.setSeconds(originalStart.getSeconds());
        newStart.setMilliseconds(originalStart.getMilliseconds());
      }
    } else {
      // Week / Day / Resource View Logic
      // overDate represents the time slot in "display timezone"
      if (timezone) {
        // overDate is already in the display timezone representation
        // We need to convert it back to UTC for storage
        // The cell date was created as local time representing the target timezone
        newStart = fromZonedTime(overDate, timezone);
      } else {
        // No timezone set - use the date directly
        newStart = new Date(overDate);
      }

      newStart.setSeconds(0);
      newStart.setMilliseconds(0);
    }

    const newEnd = new Date(newStart.getTime() + duration);

    // Resource Handling
    let newResourceId = activeEvent.resourceId;
    const overResourceId = over.data.current?.resourceId;
    if (overResourceId) {
      newResourceId = overResourceId;
    }

    // Check if event has actually changed
    if (
      newStart.getTime() === originalStart.getTime() &&
      newEnd.getTime() === originalEnd.getTime() &&
      newResourceId === activeEvent.resourceId
    ) {
      return;
    }

    // Call the callback with the updated event info
    if (onEventDrop) {
      onEventDrop(activeEvent, newStart, newEnd);
    }
  };

  return {
    view,
    currentDate,
    isSidebarOpen,
    setIsSidebarOpen,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    modalInitialDate,
    events,
    handleViewChange,
    handleDateChange,
    handlePrev,
    handleNext,
    handleToday,
    handleDateClick,
    handleTimeSlotClick,
    handleEventClickInternal,
    handleCreateEvent,
    handleModalSave,
    handleModalDelete,
    handleDragEnd,
  };
};
