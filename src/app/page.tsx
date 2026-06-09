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
import { addDays, startOfWeek, addHours, format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { PlusIcon, Eye, MoreHorizontal, Facebook, Instagram, Linkedin, Music2 } from 'lucide-react';
import type { ListViewConfig } from '@/index';

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
    const statuses = ['draft', 'scheduled', 'published', 'error'] as const;
    const allNetworks = ['facebook', 'instagram', 'linkedin', 'tiktok'];
    const n = Number(id);
    return {
      id,
      title,
      start,
      end,
      calendarId,
      color,
      resourceId,
      // Publication-specific demo fields (consumed by listViewConfig below)
      status: statuses[n % statuses.length],
      creator: ['Alex M.', 'Jordan U.', 'Sam R.'][n % 3],
      networks: allNetworks.slice(0, (n % 3) + 1),
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

// --- List view (publications) demo config ---
const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  draft: { label: 'Brouillon', className: 'bg-gray-100 text-gray-700' },
  scheduled: { label: 'Programmée', className: 'bg-blue-100 text-blue-700' },
  published: { label: 'Publiée', className: 'bg-green-100 text-green-700' },
  error: { label: 'Erreur', className: 'bg-red-100 text-red-700' },
};

const NETWORK_ICONS: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-4 w-4 text-[#1877F2]" />,
  instagram: <Instagram className="h-4 w-4 text-[#E4405F]" />,
  linkedin: <Linkedin className="h-4 w-4 text-[#0A66C2]" />,
  tiktok: <Music2 className="h-4 w-4 text-foreground" />,
};

const publicationsListConfig: ListViewConfig = {
  pageSize: 8,
  columns: [
    {
      key: 'title',
      header: 'Nom de la publication',
      render: (event) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 rounded-md bg-gradient-to-br from-violet-400 to-blue-400" />
          <span className="truncate font-medium text-foreground">{event.title}</span>
        </div>
      ),
    },
    {
      key: 'creator',
      header: 'Créateur',
      render: (event) => <span className="text-muted-foreground">{event.creator || '—'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (event) => {
        const status = STATUS_STYLES[event.status as string];
        if (!status) return null;
        return (
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
          >
            {status.label}
          </span>
        );
      },
    },
    {
      key: 'date',
      header: 'Date de publication',
      render: (event) =>
        event.status === 'draft' ? (
          <span className="text-muted-foreground">-</span>
        ) : (
          <span className="text-muted-foreground">{format(event.start, 'dd/MM/yyyy')}</span>
        ),
    },
    {
      key: 'networks',
      header: 'Réseaux',
      render: (event) => (
        <div className="flex items-center gap-1.5">
          {(event.networks as string[] | undefined)?.map((net) => (
            <span key={net}>{NETWORK_ICONS[net]}</span>
          ))}
        </div>
      ),
    },
  ],
  renderActions: (event) => (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => console.log('Aperçu', event.id)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-white px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/40"
      >
        <Eye className="h-3.5 w-3.5" />
        Aperçu
      </button>
      <button
        type="button"
        onClick={() => console.log('More', event.id)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/40"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  ),
};

// Translations
const translations = {
  en: {
    today: 'Today',
    tomorrow: 'Tomorrow',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    list: 'List',
    resource: 'Resource',
    sortBy: 'Sort by',
    mostRecent: 'Most recent',
    oldest: 'Oldest',
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
    list: 'Liste',
    resource: 'Ressource',
    sortBy: 'Trier par',
    mostRecent: 'Plus récent',
    oldest: 'Plus ancien',
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
        listViewConfig={publicationsListConfig}
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
