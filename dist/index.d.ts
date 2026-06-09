import React$1 from 'react';
import { Locale } from 'date-fns';
import { ClassValue } from 'clsx';

type ViewType = 'month' | 'week' | 'day' | 'list' | 'resource';
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
/**
 * A single column of the List view. The consuming app provides the cell
 * rendering via `render`, keeping the library agnostic of domain-specific
 * data (status, creator, social networks, etc.).
 */
interface ListColumn {
    /** Unique key for this column */
    key: string;
    /** Column header content (string or custom node) */
    header?: React.ReactNode;
    /** Renders the cell content for a given event. Falls back to event.title. */
    render?: (event: CalendarEvent) => React.ReactNode;
    /** Extra classes applied to the body cell (<td>) */
    className?: string;
    /** Extra classes applied to the header cell (<th>) */
    headerClassName?: string;
    /** Horizontal alignment of the cell content (default: 'left') */
    align?: 'left' | 'center' | 'right';
}
/** A sort option exposed in the "Sort by" dropdown of the List view. */
interface ListSortOption {
    /** Unique key for this sort option */
    key: string;
    /** Label shown in the dropdown */
    label: string;
    /** Comparator used to sort events for this option */
    comparator: (a: CalendarEvent, b: CalendarEvent) => number;
}
/** Configuration for the List view (render-props based). */
interface ListViewConfig {
    /** Columns to render. When omitted, default Title + Date columns are used. */
    columns?: ListColumn[];
    /** Sort options for the "Sort by" dropdown. Defaults to most recent / oldest. */
    sortOptions?: ListSortOption[];
    /** Key of the sort option selected by default. Defaults to the first option. */
    defaultSortKey?: string;
    /** Number of rows per page (default: 12). Set to 0 to disable pagination. */
    pageSize?: number;
    /** Show the "Sort by" dropdown (default: true) */
    showSort?: boolean;
    /** Show the pagination footer (default: true) */
    showPagination?: boolean;
    /** Custom renderer for the row actions cell (e.g. preview button, "…" menu) */
    renderActions?: (event: CalendarEvent) => React.ReactNode;
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
    list: string;
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
    /** Used in month view for "+N more" (e.g. "more", "de plus") */
    more: string;
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
    /** List view: label of the "Sort by" dropdown */
    sortBy: string;
    /** List view: default "most recent" sort option label */
    mostRecent: string;
    /** List view: "oldest" sort option label */
    oldest: string;
    /** List view: empty state label when there are no items */
    noEvents: string;
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
    /**
     * Breakpoint (in px) below which the sidebar switches to a full-screen modal.
     * Default: 900
     */
    mobileBreakpoint?: number;
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
    /** Configuration for the List view (columns, sorting, pagination). */
    listViewConfig?: ListViewConfig;
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
    /**
     * Visually blur the calendar content area (grid + events) without blurring
     * the header or sidebar. Useful as a paywall teaser. The blurred content is
     * also non-interactive (pointer-events/user-select disabled). Has no effect
     * on the `list` view, which stays sharp. Default: false.
     */
    blurContent?: boolean;
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

export { type CalendarEvent, type CalendarFilterItem, type CalendarFilterSection, type CalendarProps, type CalendarTheme, type CalendarTranslations, type EventAttachment, type EventReminder, type EventType, type ListColumn, type ListSortOption, type ListViewConfig, type Resource, Scheduler, type SidebarConfig, type ThemeColors, type ViewType, cn };
