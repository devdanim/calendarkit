# ProScheduler

A professional React calendar component with drag-and-drop, timezone support, internationalization, resource views, and recurring events.

## Features

- **Multiple Views**: Month, Week, Day, Agenda, and Resource views
- **Drag & Drop**: Move and resize events with smooth animations
- **Timezone Support**: Full timezone handling with automatic conversion
- **Internationalization**: Built-in i18n support (EN/FR included)
- **Dark Mode**: Toggle between light and dark themes
- **Resources**: Schedule across multiple resources (rooms, people, equipment)
- **Recurring Events**: Support for daily, weekly, monthly, and yearly recurrence
- **Event Types**: Categorize events with custom types and colors
- **Multiple Calendars**: Filter events by calendar with toggle visibility
- **Virtualized Rendering**: Smooth performance with many events
- **Custom Event Forms**: Override the default event form with your own
- **TypeScript Support**: Full type definitions included

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

### Production Build

```bash
npm run build
npm run start
```

## Usage

```tsx
import { Scheduler } from "@/components/pro-scheduler";
import { CalendarEvent, ViewType, Resource, EventType } from "@/components/pro-scheduler/types";
import { fr, enUS } from "date-fns/locale";

function MyCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<ViewType>("week");
  const [date, setDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [timezone, setTimezone] = useState("America/New_York");

  const calendars = [
    { id: "work", label: "Work", color: "#3b82f6", active: true },
    { id: "personal", label: "Personal", color: "#10b981", active: true },
  ];

  const resources: Resource[] = [
    { id: "room-a", label: "Conference Room A", color: "#3b82f6" },
    { id: "room-b", label: "Conference Room B", color: "#10b981" },
  ];

  const eventTypes: EventType[] = [
    { id: "meeting", label: "Meeting", color: "#3b82f6" },
    { id: "focus", label: "Focus Time", color: "#8b5cf6" },
  ];

  return (
    <Scheduler
      events={events}
      view={view}
      onViewChange={setView}
      date={date}
      onDateChange={setDate}
      calendars={calendars}
      onCalendarToggle={(id, active) => { /* toggle calendar */ }}
      onEventCreate={(event) => { /* create event */ }}
      onEventUpdate={(event) => { /* update event */ }}
      onEventDelete={(eventId) => { /* delete event */ }}
      resources={resources}
      eventTypes={eventTypes}
      isDarkMode={isDarkMode}
      onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      timezone={timezone}
      onTimezoneChange={setTimezone}
      language={language}
      onLanguageChange={(lang) => setLanguage(lang)}
      locale={language === "fr" ? fr : enUS}
    />
  );
}
```

## Props Reference

### Scheduler Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `events` | `CalendarEvent[]` | Yes | Array of events to display |
| `view` | `ViewType` | Yes | Current view: "month", "week", "day", "agenda", or "resource" |
| `onViewChange` | `(view: ViewType) => void` | Yes | Callback when view changes |
| `date` | `Date` | Yes | Currently focused date |
| `onDateChange` | `(date: Date) => void` | Yes | Callback when date changes |
| `calendars` | `Calendar[]` | No | Array of calendar definitions |
| `onCalendarToggle` | `(id: string, active: boolean) => void` | No | Toggle calendar visibility |
| `onEventCreate` | `(event: Partial<CalendarEvent>) => void` | No | Callback when creating an event |
| `onEventUpdate` | `(event: CalendarEvent) => void` | No | Callback when updating an event |
| `onEventDelete` | `(eventId: string) => void` | No | Callback when deleting an event |
| `resources` | `Resource[]` | No | Resources for Resource view |
| `eventTypes` | `EventType[]` | No | Predefined event types |
| `timezone` | `string` | No | IANA timezone (e.g., "America/New_York") |
| `onTimezoneChange` | `(tz: string) => void` | No | Callback when timezone changes |
| `isDarkMode` | `boolean` | No | Enable dark mode |
| `onThemeToggle` | `() => void` | No | Toggle dark mode |
| `language` | `"en" \| "fr"` | No | UI language |
| `onLanguageChange` | `(lang: string) => void` | No | Callback when language changes |
| `locale` | `Locale` | No | date-fns locale for formatting |
| `translations` | `Partial<CalendarTranslations>` | No | Custom translations |
| `theme` | `CalendarTheme` | No | Custom theme colors |
| `readOnly` | `boolean` | No | Disable editing |
| `isLoading` | `boolean` | No | Show loading overlay |
| `hideViewSwitcher` | `boolean` | No | Hide the view switcher |
| `renderEventForm` | `(props) => ReactNode` | No | Custom event form renderer |

### CalendarEvent Type

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
  allDay?: boolean;
  calendarId?: string;
  resourceId?: string;
  type?: string;
  recurrence?: {
    freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    interval?: number;
    count?: number;
    until?: Date;
    byweekday?: number[];
  };
}
```

### Resource Type

```typescript
interface Resource {
  id: string;
  label: string;
  color?: string;
  avatar?: string;
}
```

### EventType Type

```typescript
interface EventType {
  id: string;
  label: string;
  color?: string;
  icon?: React.ReactNode;
}
```

## Internationalization

ProScheduler supports full internationalization. Pass custom translations:

```tsx
const frenchTranslations = {
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  resource: "Ressource",
  createEvent: "Créer un événement",
  editEvent: "Modifier l'événement",
  delete: "Supprimer",
  save: "Enregistrer",
  cancel: "Annuler",
  // ... more translations
};

<Scheduler
  translations={frenchTranslations}
  locale={fr} // date-fns French locale
/>
```

## Timezone Support

ProScheduler handles timezones automatically. All events are displayed in the selected timezone:

```tsx
<Scheduler
  timezone="Europe/Paris"
  onTimezoneChange={(tz) => console.log("Timezone changed to", tz)}
/>
```

## Recurring Events

Create events that repeat on a schedule:

```tsx
const recurringEvent: CalendarEvent = {
  id: "1",
  title: "Weekly Meeting",
  start: new Date(),
  end: addHours(new Date(), 1),
  recurrence: {
    freq: "WEEKLY",
    interval: 1,
    count: 10, // Repeat 10 times
    // Or use: until: new Date("2025-12-31")
  },
};
```

## Theming

### CSS Variables

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode values */
}
```

### Theme Prop

```tsx
<Scheduler
  theme={{
    colors: {
      primary: "#3b82f6",
      background: "#ffffff",
      foreground: "#1a1a1a",
    },
    fontFamily: "Inter, sans-serif",
    borderRadius: "8px",
  }}
/>
```

## Custom Event Form

Override the default event form with your own:

```tsx
<Scheduler
  renderEventForm={({ isOpen, onClose, event, initialDate, onSave, onDelete }) => (
    <MyCustomEventForm
      open={isOpen}
      onClose={onClose}
      event={event}
      initialDate={initialDate}
      onSave={onSave}
      onDelete={onDelete}
    />
  )}
/>
```

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── pro-scheduler/
│       ├── index.tsx          # Main component
│       ├── types.ts           # TypeScript definitions
│       ├── utils.ts           # Utility functions
│       ├── components/
│       │   ├── CalendarHeader.tsx
│       │   ├── Sidebar.tsx
│       │   ├── MiniCalendar.tsx
│       │   ├── EventModal.tsx
│       │   ├── ui/
│       │   │   ├── Button.tsx
│       │   │   └── Modal.tsx
│       │   └── dnd/
│       │       ├── DraggableEvent.tsx
│       │       └── DroppableCell.tsx
│       ├── views/
│       │   ├── MonthView.tsx
│       │   ├── WeekView.tsx
│       │   ├── DayView.tsx
│       │   ├── AgendaView.tsx
│       │   └── ResourceView.tsx
│       ├── hooks/
│       │   └── useCalendarLogic.ts
│       ├── lib/
│       │   ├── date.ts
│       │   └── theme.ts
│       └── locales/
│           └── index.ts
└── lib/
    └── utils.ts
```

## License

This source code is licensed for use by the purchasing customer only. Redistribution or resale is prohibited.

## Support

For questions or issues, please contact support@schedulr.dev
