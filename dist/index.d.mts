import React$1 from 'react';
import { Locale } from 'date-fns';
import { ClassValue } from 'clsx';

type ViewType = 'month' | 'week' | 'day' | 'agenda' | 'resource';
interface EventAttachment {
    id: string;
    name: string;
    url?: string;
    type: 'file' | 'link' | 'image';
    size?: string;
}
interface EventReminder {
    id: string;
    type: 'notification' | 'email';
    time: number;
    label?: string;
}
interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description?: React.ReactNode;
    color?: string;
    allDay?: boolean;
    calendarId?: string;
    resourceId?: string;
    type?: string;
    icon?: string;
    attachments?: EventAttachment[];
    guests?: string[];
    reminders?: EventReminder[];
    [key: string]: any;
}
interface EventType {
    id: string;
    label: string;
    color?: string;
    icon?: React.ReactNode;
}
interface Resource {
    id: string;
    label: string;
    color?: string;
    avatar?: string;
}
interface ThemeColors {
    primary?: string;
    secondary?: string;
    background?: string;
    foreground?: string;
    border?: string;
    muted?: string;
    accent?: string;
}
interface CalendarTheme {
    colors?: ThemeColors;
    fontFamily?: string;
    borderRadius?: string;
}
interface CalendarTranslations {
    today: string;
    tomorrow: string;
    month: string;
    week: string;
    day: string;
    agenda: string;
    resource: string;
    createEvent: string;
    editEvent: string;
    delete: string;
    save: string;
    cancel: string;
    title: string;
    start: string;
    end: string;
    allDay: string;
    description: string;
    repeat: string;
    noRepeat: string;
    selectCalendar: string;
    selectType: string;
    daily: string;
    weekly: string;
    monthly: string;
    yearly: string;
    event: string;
    events: string;
    eventCount: string;
    eventsCount: string;
    task: string;
    appointmentSchedule: string;
    new: string;
    dateAndTime: string;
    timezone: string;
    whosJoining: string;
    suggestedTimes: string;
    viewSuggestions: string;
    whereWillItBe: string;
    location: string;
    descriptionAndAttachments: string;
    dragAndDrop: string;
    guests: string;
    guestCount: string;
    guestsCount: string;
    addAttachment: string;
    moreOptions: string;
    doesNotRepeat: string;
    locationHelpText: string;
    calendars: string;
}
interface SidebarConfig {
    /** Show/hide the entire sidebar (default: true) */
    enabled?: boolean;
    /** Show/hide the mini calendar (default: true) */
    showMiniCalendar?: boolean;
    /** Show/hide the calendar filters (default: true) */
    showCalendarFilters?: boolean;
    /** Show/hide the timezone selector (default: true) */
    showTimezoneSelector?: boolean;
}
/** Individual filter item (e.g., "Work", "Personal") */
interface CalendarFilterItem {
    id: string;
    label: string;
    color?: string;
    icon?: React.ReactNode;
    active?: boolean;
}
/** A section of filters with a title (e.g., "By Type", "By Category") */
interface CalendarFilterSection {
    id: string;
    title?: string;
    items: CalendarFilterItem[];
    /** Whether the section is collapsed (default: false) */
    collapsed?: boolean;
}
interface CalendarProps {
    events?: CalendarEvent[];
    translations?: Partial<CalendarTranslations>;
    view?: ViewType;
    onViewChange?: (view: ViewType) => void;
    date?: Date;
    onDateChange?: (date: Date) => void;
    onEventClick?: (event: CalendarEvent) => void;
    onEventDrop?: (event: CalendarEvent, start: Date, end: Date) => void;
    theme?: CalendarTheme;
    locale?: Locale;
    timezone?: string;
    onTimezoneChange?: (timezone: string) => void;
    className?: string;
    readOnly?: boolean;
    /**
     * Calendar filters - can be either:
     * - A simple array of items (legacy format, displayed in a single "Calendars" section)
     * - An array of sections, each with its own title and items
     */
    calendars?: CalendarFilterItem[] | CalendarFilterSection[];
    resources?: Resource[];
    eventTypes?: EventType[];
    onCalendarToggle?: (calendarId: string, active: boolean) => void;
    isLoading?: boolean;
    isDarkMode?: boolean;
    onThemeToggle?: () => void;
    /** @deprecated Use sidebarConfig.enabled instead */
    showSidebar?: boolean;
    onSidebarToggle?: (isOpen: boolean) => void;
    /** Fine-grained sidebar configuration */
    sidebarConfig?: SidebarConfig;
    hideViewSwitcher?: boolean;
    /** Hide the language selector in the header (default: false) */
    hideLanguageSelector?: boolean;
    /** Hide the dark mode toggle in the header (default: false) */
    hideDarkModeToggle?: boolean;
    language?: 'en' | 'fr';
    onLanguageChange?: (lang: 'en' | 'fr') => void;
    renderEventForm?: (props: {
        isOpen: boolean;
        onClose: () => void;
        event?: CalendarEvent | null;
        initialDate?: Date;
        onSave: (event: Partial<CalendarEvent>) => void;
        onDelete?: (eventId: string) => void;
    }) => React.ReactNode;
    newEventButton?: {
        label?: string;
        icon?: React.ReactNode;
        onClick?: () => void;
    };
}

declare function cn(...inputs: ClassValue[]): string;

declare const Scheduler: React$1.FC<CalendarProps>;

export { type CalendarEvent, type CalendarFilterItem, type CalendarFilterSection, type CalendarProps, type CalendarTheme, type CalendarTranslations, type EventAttachment, type EventReminder, type EventType, type Resource, Scheduler, type SidebarConfig, type ThemeColors, type ViewType, cn };
