'use client';

import { useState, useMemo } from 'react';
import {
  Scheduler,
  CalendarEvent,
  ViewType,
  Resource,
  EventType,
  CalendarFilterSection,
} from '@/index';
import { addDays, startOfWeek, addHours } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { PlusIcon } from 'lucide-react';

// Generate demo events
const generateDemoEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const today = new Date();
  const weekStart = startOfWeek(today);

  const createEvent = (
    id: string,
    title: string,
    dayOffset: number,
    hourStart: number,
    duration: number,
    calendarId: string,
    color: string,
    resourceId?: string
  ): CalendarEvent => {
    const start = addHours(addDays(weekStart, dayOffset), hourStart);
    const end = addHours(start, duration);
    return {
      id,
      title,
      start,
      end,
      calendarId,
      color,
      resourceId,
    };
  };

  // Monday
  events.push(createEvent('1', 'Team Standup', 1, 9, 0.5, 'work', '#3b82f6', 'room-a'));
  events.push(createEvent('2', 'Project Review', 1, 10, 2, 'work', '#3b82f6', 'room-b'));
  events.push(createEvent('3', 'Lunch Meeting', 1, 12, 1, 'personal', '#10b981'));

  // Tuesday
  events.push(createEvent('4', 'Client Call', 2, 9, 1, 'work', '#3b82f6', 'room-a'));
  events.push(createEvent('5', 'Code Review', 2, 14, 1.5, 'work', '#3b82f6'));

  // Wednesday
  events.push(createEvent('6', 'Workshop', 3, 10, 3, 'work', '#3b82f6', 'room-c'));
  events.push(createEvent('7', 'Gym', 3, 17, 1, 'personal', '#10b981'));

  // Thursday
  events.push(createEvent('8', 'Sprint Planning', 4, 9, 2, 'work', '#3b82f6', 'room-b'));
  events.push(createEvent('9', '1:1 Meeting', 4, 14, 0.5, 'work', '#3b82f6', 'room-a'));

  // Friday
  events.push(createEvent('10', 'Demo Day', 5, 14, 2, 'work', '#3b82f6', 'room-c'));
  events.push(createEvent('11', 'Happy Hour', 5, 17, 2, 'personal', '#10b981'));

  return events;
};

// Demo resources
const demoResources: Resource[] = [
  {
    id: 'room-a',
    label: 'Conference Room A',
    color: '#3b82f6',
  },
  {
    id: 'room-b',
    label: 'Conference Room B',
    color: '#10b981',
  },
  {
    id: 'room-c',
    label: 'Meeting Room C',
    color: '#f59e0b',
  },
];

// Demo event types
const demoEventTypes: EventType[] = [
  {
    id: 'meeting',
    label: 'Meeting',
    color: '#3b82f6',
  },
  {
    id: 'focus',
    label: 'Focus Time',
    color: '#8b5cf6',
  },
  {
    id: 'personal',
    label: 'Personal',
    color: '#10b981',
  },
];

// Translations
const translations = {
  en: {
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
  },
  fr: {
    today: "Aujourd'hui",
    tomorrow: 'Demain',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    resource: 'Ressource',
    createEvent: 'Créer un évènement',
    editEvent: "Modifier l'évènement",
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    title: 'Titre',
    start: 'Début',
    end: 'Fin',
    allDay: 'Toute la journée',
    description: 'Description',
    repeat: 'Répéter',
    noRepeat: 'Ne se répète pas',
    selectCalendar: 'Sélectionner un calendrier',
    selectType: 'Sélectionner un type',
    daily: 'Quotidien',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    eventCount: 'évènement',
    eventsCount: 'évènements',
    guestCount: 'invité',
    guestsCount: 'invités',
  },
};

export default function Home() {
  const [events] = useState<CalendarEvent[]>(generateDemoEvents());
  const [view, setView] = useState<ViewType>('week');
  const [date, setDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [timezone, setTimezone] = useState('America/New_York');

  // Using the new section format for filters
  const [filterSections, setFilterSections] = useState<CalendarFilterSection[]>([
    {
      id: 'by-type',
      title: 'By Type',
      items: [
        {
          id: 'work',
          label: 'Work',
          color: '#3b82f6',
          active: true,
        },
        {
          id: 'personal',
          label: 'Personal',
          color: '#10b981',
          active: true,
        },
      ],
    },
    {
      id: 'by-priority',
      title: 'By Priority',
      items: [
        {
          id: 'high',
          label: 'High Priority',
          color: '#ef4444',
          active: true,
        },
        {
          id: 'medium',
          label: 'Medium Priority',
          color: '#f59e0b',
          active: true,
        },
        {
          id: 'low',
          label: 'Low Priority',
          color: '#6b7280',
          active: true,
        },
      ],
    },
  ]);

  // Handle toggle for section-based filters
  const handleCalendarToggle = (itemId: string, active: boolean) => {
    setFilterSections((sections) =>
      sections.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                active,
              }
            : item
        ),
      }))
    );
  };

  const filteredEvents = useMemo(() => {
    // Get all active filter IDs from all sections
    const activeIds = filterSections
      .flatMap((s) => s.items)
      .filter((i) => i.active)
      .map((i) => i.id);
    return events.filter((e) => !e.calendarId || activeIds.includes(e.calendarId));
  }, [events, filterSections]);

  return (
    <div>
      <Scheduler
        events={filteredEvents}
        view={view}
        onViewChange={setView}
        date={date}
        onDateChange={setDate}
        calendars={filterSections}
        onCalendarToggle={handleCalendarToggle}
        resources={demoResources}
        eventTypes={demoEventTypes}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        timezone={timezone}
        onTimezoneChange={setTimezone}
        language={language}
        onLanguageChange={(lang) => setLanguage(lang as 'en' | 'fr')}
        translations={translations[language]}
        sidebarConfig={{
          enabled: true,
          showMiniCalendar: true,
          showCalendarFilters: true,
          showTimezoneSelector: false,
        }}
        hideDarkModeToggle
        locale={language === 'fr' ? fr : enUS}
        newEventButton={{
          label: 'New Event',
          icon: <PlusIcon className="h-4 w-4" />,
          onClick: () => console.log('New Event'),
        }}
      />
    </div>
  );
}
