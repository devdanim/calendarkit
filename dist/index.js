'use strict';

var React13 = require('react');
var core = require('@dnd-kit/core');
var modifiers = require('@dnd-kit/modifiers');
var framerMotion = require('framer-motion');
var dateFns = require('date-fns');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var lucideReact = require('lucide-react');
var dateFnsTz = require('date-fns-tz');
var utilities = require('@dnd-kit/utilities');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React13__namespace = /*#__PURE__*/_interopNamespace(React13);

function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

// src/components/ui/button.tsx
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React13__namespace.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button";
    return /* @__PURE__ */ React13__namespace.createElement(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
var CalendarHeader = ({
  currentDate,
  onPrev,
  onNext,
  onToday,
  view,
  onViewChange,
  onMenuClick,
  isDarkMode,
  onThemeToggle,
  translations,
  hideViewSwitcher,
  language,
  onLanguageChange,
  locale
}) => {
  const viewConfig = [
    { key: "month", icon: lucideReact.CalendarDays },
    { key: "week", icon: lucideReact.CalendarRange },
    { key: "day", icon: lucideReact.Calendar },
    { key: "agenda", icon: lucideReact.ListTodo }
  ];
  return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col md:flex-row items-center justify-between px-3 md:px-5 py-3 border-b-[0px] border-border/50 bg-gradient-to-r from-background via-background to-muted/20 gap-3 md:gap-0 min-h-[64px]" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-2 w-full md:w-auto justify-between md:justify-start" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-2 md:gap-3" }, /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-xl h-10 w-10 hidden md:inline-flex transition-all duration-200",
      onClick: onMenuClick
    },
    /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Menu, { className: "h-5 w-5" })
  ), /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      variant: "outline",
      onClick: onToday,
      className: "h-9 px-5 rounded-xl text-sm font-medium hidden sm:inline-flex border-[0.5px] border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200"
    },
    translations.today
  ), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center bg-muted/40 rounded-xl p-0.5" }, /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: onPrev,
      className: "rounded-lg h-8 w-8 hover:bg-background/80 transition-all duration-200"
    },
    /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.ChevronLeft, { className: "h-4 w-4 text-muted-foreground" })
  ), /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: onNext,
      className: "rounded-lg h-8 w-8 hover:bg-background/80 transition-all duration-200"
    },
    /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
  )), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "ml-2 md:ml-4" }, /* @__PURE__ */ React13__namespace.default.createElement("h2", { className: "text-lg md:text-xl font-semibold text-foreground whitespace-nowrap capitalize tracking-tight" }, dateFns.format(currentDate, "MMMM yyyy", { locale }))))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end" }, onLanguageChange && language && /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "sm",
      onClick: () => onLanguageChange(language === "en" ? "fr" : "en"),
      className: "h-9 px-3 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 uppercase tracking-wider"
    },
    language
  ), onThemeToggle && /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "rounded-xl h-9 w-9 hover:bg-accent/80 transition-all duration-200",
      onClick: onThemeToggle
    },
    isDarkMode ? /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Sun, { className: "h-4 w-4 text-amber-500" }) : /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Moon, { className: "h-4 w-4 text-muted-foreground" })
  ), !hideViewSwitcher && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center bg-muted/50 backdrop-blur-sm rounded-xl p-1" }, viewConfig.map(({ key, icon: Icon }) => /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      key,
      variant: "ghost",
      size: "sm",
      onClick: () => onViewChange(key),
      className: cn(
        "h-8 px-3 text-xs rounded-lg transition-all duration-200 gap-1.5",
        view === key ? "bg-background shadow-sm text-foreground font-medium border-[0.5px] border-border/50" : "text-muted-foreground hover:text-foreground hover:bg-background/50"
      )
    },
    /* @__PURE__ */ React13__namespace.default.createElement(Icon, { className: "h-3.5 w-3.5" }),
    /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "hidden sm:inline" }, translations[key])
  )))));
};
var getMonthGrid = (date, weekStartOn = 0) => {
  const monthStart = dateFns.startOfMonth(date);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: weekStartOn });
  const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: weekStartOn });
  return dateFns.eachDayOfInterval({
    start: startDate,
    end: endDate
  });
};
var MiniCalendar = ({
  currentDate,
  onDateChange,
  onViewChange,
  className
}) => {
  const [viewDate, setViewDate] = React13__namespace.default.useState(currentDate);
  React13__namespace.default.useEffect(() => {
    setViewDate(currentDate);
  }, [currentDate]);
  const days = React13__namespace.default.useMemo(() => getMonthGrid(viewDate), [viewDate]);
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const handlePrev = () => {
    const newDate = dateFns.subMonths(viewDate, 1);
    setViewDate(newDate);
    onDateChange(newDate);
    if (onViewChange) onViewChange("month");
  };
  const handleNext = () => {
    const newDate = dateFns.addMonths(viewDate, 1);
    setViewDate(newDate);
    onDateChange(newDate);
    if (onViewChange) onViewChange("month");
  };
  const handleDateClick = (day) => {
    onDateChange(day);
    if (onViewChange) onViewChange("day");
  };
  return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: cn("px-4 w-[260px]", className) }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-sm font-semibold text-foreground capitalize" }, dateFns.format(viewDate, "MMMM yyyy")), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center bg-muted/40 rounded-lg p-0.5" }, /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "h-7 w-7 rounded-md hover:bg-background/80 transition-all",
      onClick: handlePrev,
      "aria-label": "Previous month"
    },
    /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.ChevronLeft, { className: "h-4 w-4" })
  ), /* @__PURE__ */ React13__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "h-7 w-7 rounded-md hover:bg-background/80 transition-all",
      onClick: handleNext,
      "aria-label": "Next month"
    },
    /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.ChevronRight, { className: "h-4 w-4" })
  ))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "grid grid-cols-7 gap-y-2 text-center mb-2" }, weekDays.map((day, i) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: `${day}-${i}`, className: "text-[10px] text-muted-foreground/70 font-semibold uppercase" }, day))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "grid grid-cols-7 gap-y-1 text-center" }, days.map((day) => {
    const isSelected = dateFns.isSameDay(day, currentDate);
    const isCurrentMonth = dateFns.isSameMonth(day, viewDate);
    const isTodayDate = dateFns.isToday(day);
    return /* @__PURE__ */ React13__namespace.default.createElement(
      "button",
      {
        key: day.toISOString(),
        onClick: () => handleDateClick(day),
        className: cn(
          "h-8 w-8 mx-auto flex items-center justify-center text-xs rounded-xl transition-all duration-200 font-medium",
          !isCurrentMonth && "text-muted-foreground/30",
          isCurrentMonth && !isSelected && !isTodayDate && "text-foreground hover:bg-accent/80",
          isSelected && "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105",
          !isSelected && isTodayDate && "bg-primary/10 text-primary ring-1 ring-primary/30"
        )
      },
      dateFns.format(day, "d")
    );
  })));
};
var Sidebar = ({
  currentDate,
  onDateChange,
  onViewChange,
  timezone,
  onTimezoneChange,
  className,
  readOnly,
  calendars,
  onCalendarToggle,
  translations
}) => {
  const [calendarsOpen, setCalendarsOpen] = React13.useState(true);
  const [timezoneOpen, setTimezoneOpen] = React13.useState(false);
  const [now, setNow] = React13.useState(null);
  const [hasMounted, setHasMounted] = React13.useState(false);
  React13.useEffect(() => {
    setHasMounted(true);
    setNow(/* @__PURE__ */ new Date());
    const timer = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(timer);
  }, []);
  const defaultCalendars = [
    { id: "1", label: "My Calendar", color: "#3b82f6", active: true },
    { id: "2", label: "Birthdays", color: "#10b981", active: true },
    { id: "3", label: "Tasks", color: "#6366f1", active: true }
  ];
  const displayCalendars = calendars || defaultCalendars;
  const getAcronym = (tz) => {
    if (!tz || !now) return "LOC";
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" }).formatToParts(now).find((part) => part.type === "timeZoneName")?.value || "";
    } catch (e) {
      return "";
    }
  };
  const timezones = [
    { value: "", label: "Local Time", acronym: "LOC" },
    { value: "UTC", label: "UTC", acronym: "UTC" },
    { value: "America/New_York", label: "New York", acronym: "EST" },
    { value: "America/Chicago", label: "Chicago", acronym: "CST" },
    { value: "America/Denver", label: "Denver", acronym: "MST" },
    { value: "America/Los_Angeles", label: "Los Angeles", acronym: "PST" },
    { value: "Europe/London", label: "London", acronym: "GMT" },
    { value: "Europe/Paris", label: "Paris", acronym: "CET" },
    { value: "Europe/Berlin", label: "Berlin", acronym: "CET" },
    { value: "Asia/Dubai", label: "Dubai", acronym: "GST" },
    { value: "Asia/Tokyo", label: "Tokyo", acronym: "JST" },
    { value: "Asia/Singapore", label: "Singapore", acronym: "SGT" },
    { value: "Australia/Sydney", label: "Sydney", acronym: "AEDT" }
  ];
  const formatTzLabel = (tz, showTime = true) => {
    if (!hasMounted || !now || !showTime) {
      return /* @__PURE__ */ React13__namespace.default.createElement("span", null, tz.label);
    }
    let time = "";
    let acronym = tz.acronym;
    try {
      if (!tz.value) {
        time = dateFns.format(now, "HH:mm");
        try {
          acronym = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(now).find((part) => part.type === "timeZoneName")?.value || "LOC";
        } catch (e) {
        }
      } else {
        const zDate = dateFnsTz.toZonedTime(now, tz.value);
        time = dateFns.format(zDate, "HH:mm");
        const dynAcronym = getAcronym(tz.value);
        if (dynAcronym && !dynAcronym.includes("GMT") && !dynAcronym.includes("Time")) {
          acronym = dynAcronym;
        }
      }
    } catch (e) {
      return /* @__PURE__ */ React13__namespace.default.createElement("span", null, tz.label);
    }
    return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex justify-between w-full" }, /* @__PURE__ */ React13__namespace.default.createElement("span", null, tz.label), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-muted-foreground ml-2 tabular-nums" }, time, " ", /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-xs opacity-75" }, "(", acronym, ")")));
  };
  const selectedTzObj = timezones.find((t) => t.value === (timezone || ""));
  const selectedTimezoneLabel = selectedTzObj ? formatTzLabel(selectedTzObj) : translations?.localTime || "Local Time";
  return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: cn("flex flex-col min-w-[256px] overflow-x-hidden h-full bg-gradient-to-b scrollbar-hide from-background via-background to-muted/10 pt-4 pb-4 overflow-y-auto", className) }, /* @__PURE__ */ React13__namespace.default.createElement(MiniCalendar, { currentDate, onDateChange, onViewChange }), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 px-4 space-y-5 mt-5" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "bg-muted/20 rounded-2xl p-3 border-[0px] border-border/30" }, /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      className: "flex items-center justify-between cursor-pointer hover:bg-accent/50 p-2 -m-1 rounded-xl mb-2 transition-all duration-200",
      onClick: () => setCalendarsOpen(!calendarsOpen)
    },
    /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-sm font-semibold text-foreground" }, translations?.calendars || "Calendars"),
    /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.ChevronDown, { className: cn("w-4 h-4 text-muted-foreground transition-transform duration-200", calendarsOpen && "rotate-180") })
  ), calendarsOpen && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "space-y-1" }, displayCalendars.map((cal) => /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      key: cal.id,
      className: "flex items-center gap-3 py-2 px-2 hover:bg-accent/60 rounded-xl cursor-pointer group transition-all duration-200",
      onClick: () => onCalendarToggle?.(cal.id, !(cal.active ?? true))
    },
    /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "relative flex items-center justify-center" }, /* @__PURE__ */ React13__namespace.default.createElement(
      "input",
      {
        type: "checkbox",
        checked: cal.active ?? true,
        onChange: (e) => {
          e.stopPropagation();
          onCalendarToggle?.(cal.id, e.target.checked);
        },
        className: "peer h-5 w-5 rounded-md border-2 border-border/60 cursor-pointer appearance-none checked:border-transparent transition-all duration-200",
        style: { "--primary-color": cal.color },
        "data-cal-id": cal.id
      }
    ), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" }, /* @__PURE__ */ React13__namespace.default.createElement("svg", { className: "w-3.5 h-3.5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 }, /* @__PURE__ */ React13__namespace.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }))), /* @__PURE__ */ React13__namespace.default.createElement("style", null, `
                      input[type="checkbox"][data-cal-id="${cal.id}"]:checked {
                        background-color: ${cal.color} !important;
                        border-color: ${cal.color} !important;
                      }
                      input[type="checkbox"][data-cal-id="${cal.id}"]:focus {
                        --tw-ring-color: ${cal.color}40 !important;
                      }
                    `)),
    /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-2 flex-1 min-w-0" }, /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-sm text-foreground/90 truncate font-medium" }, cal.label)),
    /* @__PURE__ */ React13__namespace.default.createElement(
      "div",
      {
        className: "w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity",
        style: { backgroundColor: cal.color }
      }
    )
  ))))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "mt-auto px-4 pt-5" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "bg-muted/20 rounded-2xl p-3" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "p-1.5 bg-primary/10 rounded-lg" }, /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Globe, { className: "w-4 h-4 text-primary" })), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-sm font-semibold text-foreground" }, translations?.timezone || "Timezone")), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "relative" }, /* @__PURE__ */ React13__namespace.default.createElement(
    "button",
    {
      onClick: () => setTimezoneOpen(!timezoneOpen),
      className: "w-full flex items-center justify-between bg-blue-200/40  hover:bg-blue-200/80 rounded-xl py-2.5 pl-4 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200 text-left"
    },
    /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 truncate mr-2 font-medium" }, selectedTimezoneLabel),
    /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.ChevronDown, { className: cn("w-4 h-4 text-muted-foreground transition-transform duration-200", timezoneOpen && "rotate-180") })
  ), timezoneOpen && /* @__PURE__ */ React13__namespace.default.createElement(React13__namespace.default.Fragment, null, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "fixed inset-0 z-40", onClick: () => setTimezoneOpen(false) }), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "absolute bottom-full left-0 w-full mb-2 bg-background rounded-xl shadow-2xl z-50 max-h-[260px] overflow-y-auto p-1.5 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-none" }, timezones.map((tz) => /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      key: tz.value,
      className: cn(
        "px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-all duration-200",
        (timezone || "") === tz.value ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-accent/80"
      ),
      onClick: () => {
        onTimezoneChange?.(tz.value);
        setTimezoneOpen(false);
      }
    },
    formatTzLabel(tz)
  ))))))));
};
var DraggableEvent = ({ event, children, className, style: propStyle, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = core.useDraggable({
    id: event.id,
    data: { event }
  });
  const style = {
    ...propStyle,
    transform: utilities.CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : propStyle?.zIndex,
    // When dragging, we want the ORIGINAL element to be almost invisible (or fully invisible)
    // so that the DragOverlay (the "ghost") is the only thing the user focuses on.
    // If we set opacity: 0, it disappears. If 0.1, it's a faint placeholder.
    // The user asked for "Make the entire dragged item transparent". 
    // Usually this means the original item should be faded out while the drag overlay is moving.
    opacity: isDragging ? 0 : propStyle?.opacity
    // Hiding original element completely
  };
  return /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      ref: setNodeRef,
      style,
      ...listeners,
      ...attributes,
      ...props,
      className: cn("touch-none", className)
    },
    children
  );
};
var DroppableCell = ({ id, date, resourceId, children, className, style, onClick }) => {
  const { isOver, setNodeRef } = core.useDroppable({
    id,
    data: { date, resourceId }
  });
  const minutes = date.getMinutes();
  const quarterClass = minutes === 0 ? "hover:bg-blue-50/50 dark:hover:bg-blue-900/10" : minutes === 15 ? "hover:bg-blue-50/80 dark:hover:bg-blue-900/20" : minutes === 30 ? "hover:bg-blue-100/50 dark:hover:bg-blue-900/30" : "hover:bg-blue-100/80 dark:hover:bg-blue-900/40";
  const activeQuarterClass = minutes === 0 ? "bg-blue-50/50 dark:bg-blue-900/10 ring-2 ring-primary ring-inset" : minutes === 15 ? "bg-blue-50/80 dark:bg-blue-900/20 ring-2 ring-primary ring-inset" : minutes === 30 ? "bg-blue-100/50 dark:bg-blue-900/30 ring-2 ring-primary ring-inset" : "bg-blue-100/80 dark:bg-blue-900/40 ring-2 ring-primary ring-inset";
  return /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      ref: setNodeRef,
      className: cn(
        className,
        quarterClass,
        isOver && activeQuarterClass
      ),
      style,
      onClick
    },
    children
  );
};

// src/views/MonthView.tsx
var EventItem = React13__namespace.default.memo(({ event, onEventClick }) => /* @__PURE__ */ React13__namespace.default.createElement(DraggableEvent, { event }, /* @__PURE__ */ React13__namespace.default.createElement(
  "div",
  {
    className: cn(
      "text-xs px-2.5 py-1.5 rounded-lg truncate cursor-pointer shadow-sm transition-all duration-200",
      "hover:shadow-md hover:scale-[1.02] hover:z-10",
      !event.color && "bg-primary/10 text-primary hover:bg-primary/15 border-[0.5px] border-primary/20"
    ),
    style: event.color ? {
      backgroundColor: `${event.color}20`,
      color: event.color,
      borderLeft: `3px solid ${event.color}`
    } : void 0,
    onClick: (e) => {
      e.stopPropagation();
      onEventClick?.(event);
    }
  },
  /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "font-medium" }, event.title)
)));
EventItem.displayName = "EventItem";
var MonthView = ({
  currentDate,
  events,
  onEventClick,
  onDateClick,
  timezone,
  locale
}) => {
  const days = React13.useMemo(() => getMonthGrid(currentDate), [currentDate]);
  const weekDays = React13.useMemo(() => {
    const start = dateFns.startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = dateFns.endOfWeek(currentDate, { weekStartsOn: 1 });
    return dateFns.eachDayOfInterval({ start, end });
  }, [currentDate]);
  const getZonedDate = React13.useCallback((date) => {
    return timezone ? dateFnsTz.toZonedTime(date, timezone) : date;
  }, [timezone]);
  const eventsByDay = React13.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    events.forEach((event) => {
      const zonedStart = getZonedDate(event.start);
      const key = dateFns.format(zonedStart, "yyyy-MM-dd");
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(event);
    });
    return map;
  }, [events, getZonedDate]);
  return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col h-full bg-background border-[0.5px] scrollbar-hide border-border/50 rounded-2xl overflow-hidden min-w-[800px] md:min-w-0 shadow-sm" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "overflow-y-auto flex-1 relative" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "grid grid-cols-7 border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/30 via-muted/40 to-muted/30 sticky top-0 z-20 backdrop-blur-sm" }, weekDays.map((day) => /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      key: day.toISOString(),
      className: "py-3 text-center text-xs font-semibold text-muted-foreground border-r-[0.5px] border-border/30 last:border-r-0 uppercase tracking-wider"
    },
    dateFns.format(day, "EEE", { locale })
  ))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "grid grid-cols-7", style: { gridAutoRows: "130px" } }, days.map((day) => {
    const dayKey = dateFns.format(day, "yyyy-MM-dd");
    const dayEvents = eventsByDay.get(dayKey) || [];
    const isCurrentMonth = dateFns.isSameMonth(day, currentDate);
    const cellId = day.toISOString();
    return /* @__PURE__ */ React13__namespace.default.createElement(
      DroppableCell,
      {
        key: cellId,
        id: cellId,
        date: day,
        className: cn(
          "h-[130px] p-2 border-b-[0.5px] border-r-[0.5px] border-border/30 last:border-r-0 relative transition-all duration-200 hover:bg-accent/5 flex flex-col gap-1.5 overflow-hidden group",
          !isCurrentMonth && "bg-muted/5 text-muted-foreground/60",
          dateFns.isToday(day) && "bg-primary/5 ring-1 ring-inset ring-primary/20"
        ),
        onClick: () => onDateClick?.(day)
      },
      /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: cn(
        "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200",
        dateFns.isToday(day) ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "group-hover:bg-accent"
      ) }, dateFns.format(day, "d", { locale })), dayEvents.length > 0 && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-[10px] font-medium text-muted-foreground/60 bg-muted/50 px-1.5 py-0.5 rounded-full" }, dayEvents.length)),
      /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 flex flex-col gap-1 scrollbar-hide overflow-y-auto overflow-x-hidden" }, dayEvents.slice(0, 4).map((event) => /* @__PURE__ */ React13__namespace.default.createElement(EventItem, { key: `${event.id}-${dayKey}`, event, onEventClick })), dayEvents.length > 4 && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-[10px] text-primary font-semibold text-center py-1 px-2 rounded-md bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors" }, "+", dayEvents.length - 4, " more"))
    );
  }))));
};
var WeekView = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
  timezone,
  locale,
  readonly
}) => {
  const start = dateFns.startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = dateFns.endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = dateFns.eachDayOfInterval({ start, end });
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourHeight = 60;
  const scrollContainerRef = React13__namespace.default.useRef(null);
  const [now, setNow] = React13__namespace.default.useState(/* @__PURE__ */ new Date());
  React13__namespace.default.useEffect(() => {
    const interval = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(interval);
  }, []);
  React13__namespace.default.useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollToActualTime = () => {
        const currentHour = now.getHours();
        const offsetHour = 4;
        return (currentHour - offsetHour) * hourHeight;
      };
      scrollContainerRef.current.scrollTop = scrollToActualTime();
    }
  }, []);
  const getZonedDate = (date) => {
    return timezone ? dateFnsTz.toZonedTime(date, timezone) : date;
  };
  const zonedNow = getZonedDate(/* @__PURE__ */ new Date());
  const getTimezoneDisplay = (tz) => {
    const date = now;
    let displayTime = "";
    let acronym = "";
    if (!tz) {
      displayTime = dateFns.format(date, "HH:mm");
      try {
        acronym = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "";
      } catch (e) {
        acronym = "LOC";
      }
    } else {
      try {
        const zDate = dateFnsTz.toZonedTime(date, tz);
        displayTime = dateFns.format(zDate, "HH:mm");
        acronym = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "";
      } catch (e) {
        displayTime = dateFns.format(date, "HH:mm");
        acronym = tz;
      }
    }
    return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col items-center justify-center leading-tight" }, /* @__PURE__ */ React13__namespace.default.createElement("span", null, displayTime), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-[10px] opacity-75" }, "(", acronym, ")"));
  };
  const timeFormat = locale?.code === "fr" ? "H:mm" : "h a";
  const eventTimeFormat = locale?.code === "fr" ? "H:mm" : "h:mm a";
  const nowFormat = locale?.code === "fr" ? "H:mm" : "h:mm";
  return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col h-full bg-background border-[0.5px] border-border/50 rounded-2xl overflow-hidden min-w-[800px] md:min-w-0 shadow-sm" }, /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      ref: scrollContainerRef,
      className: "flex-1 overflow-y-auto scrollbar-hide relative bg-background scroll-smooth",
      style: { scrollbarGutter: "stable" }
    },
    /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/20 via-background to-muted/20 z-20 sticky top-0 backdrop-blur-sm" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-none p-3 text-center text-xs font-semibold text-muted-foreground w-16 flex items-center justify-center border-r-[0.5px] border-border/30 bg-muted/10" }, getTimezoneDisplay(timezone)), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-7" }, weekDays.map((day, index) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: day.toISOString(), className: cn("py-3 px-2 text-center", index > 0 && "border-l-[0.5px] border-border/30") }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5" }, dateFns.format(day, "EEE", { locale })), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: cn(
      "w-9 h-9 flex items-center justify-center rounded-xl mx-auto text-sm font-semibold transition-all duration-200",
      dateFns.isToday(day) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110" : "text-foreground hover:bg-accent/80"
    ) }, dateFns.format(day, "d", { locale })))))),
    /* @__PURE__ */ React13__namespace.default.createElement(
      "div",
      {
        className: "flex min-w-full relative",
        style: { height: hours.length * hourHeight }
      },
      /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-none w-16 border-r-[0.5px] border-border/30 relative bg-muted/5" }, hours.map((hour) => /* @__PURE__ */ React13__namespace.default.createElement(
        "div",
        {
          key: hour,
          className: "relative w-full text-[11px] text-muted-foreground/80 text-right pr-3 font-medium tabular-nums box-border",
          style: { height: hourHeight }
        },
        /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "block -translate-y-1/2" }, hour !== 0 && dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale }))
      ))),
      /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-7 relative" }, weekDays.map((day, dayIndex) => {
        const dayEvents = events.filter((e) => {
          const zonedStart = getZonedDate(e.start);
          return dateFns.isSameDay(zonedStart, day);
        });
        return /* @__PURE__ */ React13__namespace.default.createElement("div", { key: day.toISOString(), className: cn("relative h-full", dayIndex > 0 && "border-l-[0.5px] border-border/30") }, hours.map((hour) => {
          return /* @__PURE__ */ React13__namespace.default.createElement(
            "div",
            {
              key: hour,
              className: "w-full border-b-[0.5px] border-dashed border-border/20 box-border relative hover:bg-accent/5 transition-colors",
              style: { height: hourHeight }
            },
            [0, 15, 30, 45].map((minute) => {
              const cellDate = new Date(day);
              cellDate.setHours(hour, minute, 0, 0);
              const cellId = cellDate.toISOString();
              return /* @__PURE__ */ React13__namespace.default.createElement(
                DroppableCell,
                {
                  key: minute,
                  id: cellId,
                  date: cellDate,
                  className: "w-full absolute left-0 right-0 z-0 transition-colors",
                  style: {
                    height: "25%",
                    top: `${minute / 60 * 100}%`
                  }
                },
                /* @__PURE__ */ React13__namespace.default.createElement(
                  "div",
                  {
                    className: "w-full h-full bg-transparent cursor-pointer",
                    onClick: () => onTimeSlotClick?.(cellDate)
                  }
                )
              );
            })
          );
        }), dayEvents.map((event) => {
          const overlappingEvents = dayEvents.filter((e) => {
            if (e.id === event.id) return false;
            const s1 = getZonedDate(event.start).getTime();
            const e1 = getZonedDate(event.end).getTime();
            const s2 = getZonedDate(e.start).getTime();
            const e2 = getZonedDate(e.end).getTime();
            return s1 < e2 && e1 > s2;
          });
          const group = [event, ...overlappingEvents].sort(
            (a, b) => getZonedDate(a.start).getTime() - getZonedDate(b.start).getTime() || (a.id > b.id ? 1 : -1)
            // stable sort
          );
          const index = group.findIndex((e) => e.id === event.id);
          const count = group.length;
          const widthPercent = 100 / count;
          const leftPercent = index * widthPercent;
          const zonedEventStart = getZonedDate(event.start);
          const zonedEventEnd = getZonedDate(event.end);
          const startMinutes = zonedEventStart.getHours() * 60 + zonedEventStart.getMinutes();
          const durationMinutes = dateFns.differenceInMinutes(zonedEventEnd, zonedEventStart);
          const top = startMinutes / 60 * hourHeight;
          const height = durationMinutes / 60 * hourHeight;
          const isShortEvent = durationMinutes < 60;
          return /* @__PURE__ */ React13__namespace.default.createElement(
            DraggableEvent,
            {
              key: `${event.id}-${day.toISOString()}`,
              event,
              className: `absolute z-10 transition-all ${readonly ? "cursor-default" : ""}`,
              style: {
                top: `${top}px`,
                height: `${Math.max(height, 20)}px`,
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
                // Add minimal spacing between overlapping events
                paddingRight: count > 1 ? "2px" : "0"
              }
            },
            /* @__PURE__ */ React13__namespace.default.createElement(
              "div",
              {
                className: cn(
                  "rounded-md border shadow-sm transition-all hover:shadow-md group overflow-hidden relative",
                  "glass",
                  readonly ? "cursor-default" : "cursor-grab active:cursor-grabbing",
                  !event.color && "border-primary/20 bg-primary/10",
                  isShortEvent ? "px-1 flex items-center justify-center" : "p-2",
                  // Add active border for overlapped events to distinguish them
                  count > 1 && "border-l-4 border-l-primary/50"
                ),
                style: {
                  height: "100%",
                  backgroundColor: event.color ? `${event.color}15` : void 0,
                  borderColor: event.color ? `${event.color}40` : void 0,
                  borderLeftWidth: "3px",
                  borderLeftColor: event.color || "var(--primary)"
                },
                onClick: (e) => {
                  e.stopPropagation();
                  onEventClick?.(event);
                },
                title: count > 1 ? `${event.title} (${index + 1}/${count})` : void 0
              },
              /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col h-full overflow-hidden w-full" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: cn(
                "font-semibold truncate text-foreground/90 leading-tight",
                isShortEvent ? "text-xs text-center" : "text-xs"
              ) }, event.title), !isShortEvent && /* @__PURE__ */ React13__namespace.default.createElement(React13__namespace.default.Fragment, null, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-[10px] text-muted-foreground truncate mt-0.5 font-medium leading-tight" }, dateFns.format(zonedEventStart, eventTimeFormat, { locale }), " - ", dateFns.format(zonedEventEnd, eventTimeFormat, { locale })), event.description && height > 50 && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-[10px] text-muted-foreground/80 truncate mt-1 leading-tight opacity-80" }, event.description)), count > 1 && !isShortEvent && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "absolute top-1 right-1 bg-background/80 backdrop-blur-sm rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold text-muted-foreground border border-border shadow-sm" }, count))
            )
          );
        }), dateFns.isToday(day) && /* @__PURE__ */ React13__namespace.default.createElement(
          "div",
          {
            className: "absolute left-0 right-0 z-20 pointer-events-none flex items-center",
            style: {
              top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
            }
          },
          /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-[2px] w-full bg-gradient-to-r from-primary via-primary to-primary/50" }),
          /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "absolute -left-1.5 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40 ring-2 ring-background animate-pulse" })
        ));
      }))
    ),
    /* @__PURE__ */ React13__namespace.default.createElement(
      "div",
      {
        className: "absolute left-0 w-16 pointer-events-none z-30 flex justify-end pr-2",
        style: {
          top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight + 80}px`
        }
      },
      /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-[10px] font-bold text-primary-foreground bg-primary px-1.5 py-0.5 rounded-md shadow-md -translate-y-1/2 backdrop-blur-none" }, dateFns.format(zonedNow, nowFormat, { locale }))
    )
  ));
};
var DayView = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
  timezone,
  locale,
  readonly
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourHeight = 80;
  const scrollContainerRef = React13__namespace.default.useRef(null);
  const [now, setNow] = React13__namespace.default.useState(/* @__PURE__ */ new Date());
  React13__namespace.default.useEffect(() => {
    const interval = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(interval);
  }, []);
  React13__namespace.default.useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollToActualTime = () => {
        const currentHour = now.getHours();
        const offsetHour = 3;
        return (currentHour - offsetHour) * hourHeight;
      };
      scrollContainerRef.current.scrollTop = scrollToActualTime();
    }
  }, []);
  const getZonedDate = (date) => {
    return timezone ? dateFnsTz.toZonedTime(date, timezone) : date;
  };
  const zonedNow = getZonedDate(now);
  const dayEvents = events.filter((e) => {
    const zonedStart = getZonedDate(e.start);
    return dateFns.isSameDay(zonedStart, currentDate);
  });
  const timeFormat = locale?.code === "fr" ? "H:mm" : "h a";
  const eventTimeFormat = locale?.code === "fr" ? "H:mm" : "h:mm a";
  const nowFormat = locale?.code === "fr" ? "H:mm" : "h:mm a";
  return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col h-full bg-background border-[0.5px] border-border/50 rounded-2xl overflow-hidden shadow-sm" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "px-6 py-4 border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/20 via-background to-muted/20 text-center shrink-0" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center justify-center gap-3" }, /* @__PURE__ */ React13__namespace.default.createElement("h2", { className: "text-xl font-semibold capitalize text-foreground" }, dateFns.format(currentDate, "EEEE, MMMM d, yyyy", { locale })), dateFns.isToday(currentDate) && /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-xs font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-md shadow-primary/20" }, "Today"))), /* @__PURE__ */ React13__namespace.default.createElement("div", { ref: scrollContainerRef, className: "flex-1 overflow-y-auto relative" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex relative", style: { height: hours.length * hourHeight } }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-20 bg-muted/5 border-r-[0.5px] border-border/30 relative" }, hours.map((hour) => /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      key: hour,
      className: "relative w-full",
      style: { height: hourHeight }
    },
    hour !== 0 && /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "absolute w-full text-center -top-3 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground/80 font-medium tabular-nums bg-background px-1.5 py-0.5 rounded-md" }, dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale }))
  )), dateFns.isToday(currentDate) && /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      className: "absolute left-0 w-full pointer-events-none z-30 flex justify-end pr-2",
      style: {
        top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
      }
    },
    /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-[10px] font-bold text-white bg-primary px-2 py-1 rounded-lg shadow-md shadow-primary/30 -translate-y-1/2" }, dateFns.format(zonedNow, nowFormat, { locale }))
  )), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 relative" }, hours.map((hour) => {
    return /* @__PURE__ */ React13__namespace.default.createElement(
      "div",
      {
        key: hour,
        className: "border-b-[0.5px] border-dashed border-border/20 box-border relative hover:bg-accent/5 transition-colors",
        style: { height: hourHeight }
      },
      [0, 15, 30, 45].map((minute) => {
        const cellDate = new Date(currentDate);
        cellDate.setHours(hour, minute, 0, 0);
        const cellId = cellDate.toISOString();
        return /* @__PURE__ */ React13__namespace.default.createElement(
          DroppableCell,
          {
            key: minute,
            id: cellId,
            date: cellDate,
            className: "w-full absolute left-0 right-0 z-0 transition-colors",
            style: {
              height: "25%",
              top: `${minute / 60 * 100}%`
            }
          },
          /* @__PURE__ */ React13__namespace.default.createElement(
            "div",
            {
              className: "h-full w-full bg-transparent cursor-pointer",
              onClick: () => onTimeSlotClick?.(cellDate)
            }
          )
        );
      })
    );
  }), dayEvents.map((event) => {
    const overlappingEvents = dayEvents.filter((e) => {
      if (e.id === event.id) return false;
      const s1 = getZonedDate(event.start).getTime();
      const e1 = getZonedDate(event.end).getTime();
      const s2 = getZonedDate(e.start).getTime();
      const e2 = getZonedDate(e.end).getTime();
      return s1 < e2 && e1 > s2;
    });
    const group = [event, ...overlappingEvents].sort(
      (a, b) => getZonedDate(a.start).getTime() - getZonedDate(b.start).getTime() || (a.id > b.id ? 1 : -1)
    );
    const index = group.findIndex((e) => e.id === event.id);
    const count = group.length;
    const widthPercent = 100 / count;
    const leftPercent = index * widthPercent;
    const zonedStart = getZonedDate(event.start);
    const zonedEnd = getZonedDate(event.end);
    const startMinutes = zonedStart.getHours() * 60 + zonedStart.getMinutes();
    const durationMinutes = dateFns.differenceInMinutes(zonedEnd, zonedStart);
    const top = startMinutes / 60 * hourHeight;
    const height = durationMinutes / 60 * hourHeight;
    const isShortEvent = durationMinutes < 45;
    return /* @__PURE__ */ React13__namespace.default.createElement(
      DraggableEvent,
      {
        key: `${event.id}-${currentDate.toISOString()}`,
        event,
        className: `absolute z-10 transition-all ${readonly ? "cursor-default" : ""}`,
        style: {
          top: `${top}px`,
          height: `${Math.max(height, 28)}px`,
          left: `calc(${leftPercent}% + 4px)`,
          width: `calc(${widthPercent}% - 8px)`,
          paddingRight: count > 1 ? "2px" : "0"
        }
      },
      /* @__PURE__ */ React13__namespace.default.createElement(
        "div",
        {
          className: cn(
            "h-full rounded-lg border-[0.5px] shadow-sm overflow-hidden transition-all hover:shadow-lg hover:z-20 group",
            "glass backdrop-blur-sm",
            readonly ? "cursor-default" : "cursor-grab active:cursor-grabbing",
            !event.color && "bg-primary/10 border-primary/20",
            isShortEvent ? "px-2 flex items-center" : "px-3 py-2",
            count > 1 && "border-l-4"
          ),
          style: {
            backgroundColor: event.color ? `${event.color}15` : void 0,
            borderColor: event.color ? `${event.color}30` : void 0,
            borderLeftColor: event.color || "var(--primary)",
            borderLeftWidth: count > 1 ? "4px" : "3px"
          },
          onClick: (e) => {
            e.stopPropagation();
            onEventClick?.(event);
          },
          title: count > 1 ? `${event.title} (${index + 1}/${count})` : void 0
        },
        /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col h-full overflow-hidden w-full" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: cn(
          "font-semibold truncate leading-tight",
          isShortEvent ? "text-xs" : "text-sm",
          event.color ? "text-foreground" : "text-foreground/90"
        ) }, event.title), !isShortEvent && /* @__PURE__ */ React13__namespace.default.createElement(React13__namespace.default.Fragment, null, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-xs text-muted-foreground mt-0.5 font-medium" }, dateFns.format(zonedStart, eventTimeFormat, { locale }), " - ", dateFns.format(zonedEnd, eventTimeFormat, { locale })), event.description && height > 60 && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-xs text-muted-foreground/80 mt-1 line-clamp-2" }, event.description)), count > 1 && !isShortEvent && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "absolute top-1.5 right-1.5 bg-background/90 backdrop-blur-sm rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-muted-foreground border border-border shadow-sm" }, count))
      )
    );
  }), dateFns.isToday(currentDate) && /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      className: "absolute left-0 right-0 z-20 pointer-events-none flex items-center",
      style: {
        top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
      }
    },
    /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-[2px] w-full bg-gradient-to-r from-primary via-primary to-primary/50" }),
    /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "absolute -left-1.5 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40 ring-2 ring-background animate-pulse" })
  )))));
};
var AgendaEmptyState = ({ onCreateEvent, translations }) => /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col items-center justify-center h-full min-h-[400px] py-12" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "relative mb-8" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-3xl border border-border/30" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center" }, /* @__PURE__ */ React13__namespace.default.createElement("svg", { className: "w-6 h-6 text-green-600 dark:text-green-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, /* @__PURE__ */ React13__namespace.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-left" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "font-medium text-foreground" }, "All caught up!"), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-sm text-muted-foreground" }, "No events scheduled"))))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-center max-w-sm" }, /* @__PURE__ */ React13__namespace.default.createElement("h3", { className: "text-lg font-semibold text-foreground mb-2" }, translations?.noUpcoming || "Your schedule is clear"), /* @__PURE__ */ React13__namespace.default.createElement("p", { className: "text-sm text-muted-foreground mb-6" }, "No upcoming events to show. Create a new event to start planning."), onCreateEvent && /* @__PURE__ */ React13__namespace.default.createElement(
  "button",
  {
    onClick: onCreateEvent,
    className: "inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200"
  },
  /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Plus, { className: "w-4 h-4" }),
  translations?.createEvent || "Create Event"
)));
var formatDuration = (start, end) => {
  const minutes = dateFns.differenceInMinutes(end, start);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
};
var getDateLabel = (date) => {
  if (dateFns.isToday(date)) return "Today";
  if (dateFns.isTomorrow(date)) return "Tomorrow";
  return dateFns.format(date, "EEEE");
};
var AgendaView = ({
  currentDate,
  events,
  onEventClick,
  onCreateEvent
}) => {
  const groupedEvents = React13.useMemo(() => {
    const startDate = dateFns.startOfDay(currentDate);
    const groups = [];
    const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
    for (let i = 0; i < 30; i++) {
      const day = dateFns.addDays(startDate, i);
      const dayEvents = sortedEvents.filter((event) => dateFns.isSameDay(event.start, day));
      if (dayEvents.length > 0) {
        groups.push({ date: day, events: dayEvents });
      }
    }
    return groups;
  }, [currentDate, events]);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };
  return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col h-full bg-background overflow-y-auto" }, groupedEvents.length === 0 ? /* @__PURE__ */ React13__namespace.default.createElement(AgendaEmptyState, { onCreateEvent }) : /* @__PURE__ */ React13__namespace.default.createElement(
    framerMotion.motion.div,
    {
      className: "max-w-3xl mx-auto w-full pb-10 px-4 md:px-6",
      variants: container,
      initial: "hidden",
      animate: "show"
    },
    groupedEvents.map((group, groupIndex) => /* @__PURE__ */ React13__namespace.default.createElement(
      framerMotion.motion.div,
      {
        key: group.date.toISOString(),
        className: "relative",
        variants: item
      },
      /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "sticky top-0 bg-background/95 backdrop-blur-md py-4 z-10 border-b border-border/50" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: cn(
        "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all",
        dateFns.isToday(group.date) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-muted/50 text-foreground"
      ) }, /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-2xl font-bold leading-none" }, dateFns.format(group.date, "d")), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-xs font-medium uppercase tracking-wide opacity-80" }, dateFns.format(group.date, "MMM"))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React13__namespace.default.createElement("span", { className: cn(
        "text-lg font-semibold",
        dateFns.isToday(group.date) && "text-primary"
      ) }, getDateLabel(group.date)), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-sm text-muted-foreground" }, group.events.length, " event", group.events.length !== 1 ? "s" : "")))),
      /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "py-4 space-y-3" }, group.events.map((event, eventIndex) => /* @__PURE__ */ React13__namespace.default.createElement(
        framerMotion.motion.div,
        {
          key: event.id,
          onClick: () => onEventClick?.(event),
          className: cn(
            "group relative flex gap-4 p-4 rounded-2xl border border-border/40",
            "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
            "transition-all duration-200 cursor-pointer",
            "bg-gradient-to-br from-card via-card to-card/80"
          ),
          whileHover: { scale: 1.01, y: -2 },
          transition: { duration: 0.2 }
        },
        /* @__PURE__ */ React13__namespace.default.createElement(
          "div",
          {
            className: "absolute left-0 top-3 bottom-3 w-1 rounded-full",
            style: { backgroundColor: event.color || "var(--primary)" }
          }
        ),
        /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col items-center min-w-[70px] pl-2" }, event.allDay ? /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-xs font-semibold text-muted-foreground bg-muted/80 px-2.5 py-1 rounded-full" }, "All Day")) : /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-base font-semibold text-foreground" }, dateFns.format(event.start, "h:mm")), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-xs text-muted-foreground uppercase" }, dateFns.format(event.start, "a")), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-px h-3 bg-border my-1" }), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-xs text-muted-foreground/70 font-medium" }, formatDuration(event.start, event.end)))),
        /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 min-w-0 space-y-2" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React13__namespace.default.createElement("h4", { className: "text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1" }, event.title), /* @__PURE__ */ React13__namespace.default.createElement(
          "div",
          {
            className: "w-3 h-3 rounded-full shrink-0 mt-1.5",
            style: { backgroundColor: event.color || "var(--primary)" }
          }
        )), event.description && /* @__PURE__ */ React13__namespace.default.createElement("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed" }, event.description), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-wrap items-center gap-3 pt-1" }, !event.allDay && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Clock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React13__namespace.default.createElement("span", null, dateFns.format(event.start, "h:mm a"), " - ", dateFns.format(event.end, "h:mm a"))), event.guests && event.guests.length > 0 && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Users, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React13__namespace.default.createElement("span", null, event.guests.length, " guest", event.guests.length !== 1 ? "s" : "")), event.attachments && event.attachments.length > 0 && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Paperclip, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React13__namespace.default.createElement("span", null, event.attachments.length)), event.reminders && event.reminders.length > 0 && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Bell, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React13__namespace.default.createElement("span", null, event.reminders.length)))),
        /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" }, /* @__PURE__ */ React13__namespace.default.createElement("svg", { className: "w-5 h-5 text-muted-foreground", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React13__namespace.default.createElement("path", { d: "M9 18l6-6-6-6" })))
      )))
    ))
  ));
};
var ResourceView = ({
  currentDate,
  events,
  resources,
  onEventClick,
  onTimeSlotClick,
  locale
}) => {
  const containerRef = React13.useRef(null);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourWidth = 100;
  const timeFormat = locale?.code === "fr" ? "H:mm" : "h a";
  const getEventStyle = (event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const dayStart = dateFns.startOfDay(currentDate);
    const startMinutes = dateFns.differenceInMinutes(start, dayStart);
    const durationMinutes = dateFns.differenceInMinutes(end, start);
    const left = startMinutes / 60 * hourWidth;
    const width = durationMinutes / 60 * hourWidth;
    return {
      left: `${left}px`,
      width: `${Math.max(width, 4)}px`
      // Min width for visibility
    };
  };
  return /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col h-full bg-background overflow-hidden" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex border-b border-border bg-muted/20" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-48 shrink-0 border-r border-border p-4 font-semibold text-sm bg-background sticky left-0 z-20" }, "Resources"), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex overflow-hidden" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex relative", style: { width: hours.length * hourWidth } }, hours.map((hour) => /* @__PURE__ */ React13__namespace.default.createElement(
    "div",
    {
      key: hour,
      className: "border-r border-border/50 text-xs text-muted-foreground p-2 font-medium shrink-0",
      style: { width: hourWidth }
    },
    dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale })
  ))))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 overflow-auto relative", ref: containerRef }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "min-w-fit" }, resources.map((resource) => {
    const resourceEvents = events.filter(
      (e) => e.resourceId === resource.id && dateFns.isSameDay(new Date(e.start), currentDate)
    );
    return /* @__PURE__ */ React13__namespace.default.createElement("div", { key: resource.id, className: "flex border-b border-border min-h-[100px]" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-48 shrink-0 border-r border-border p-4 bg-background sticky left-0 z-10 flex items-center gap-3" }, resource.avatar ? /* @__PURE__ */ React13__namespace.default.createElement("img", { src: resource.avatar, alt: resource.label, className: "w-8 h-8 rounded-full object-cover" }) : /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary" }, resource.label.substring(0, 2).toUpperCase()), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-sm font-medium" }, resource.label), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-xs text-muted-foreground" }, "ID: ", resource.id))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "relative flex", style: { width: hours.length * hourWidth } }, hours.map((hour) => /* @__PURE__ */ React13__namespace.default.createElement(
      "div",
      {
        key: hour,
        className: "flex h-full shrink-0",
        style: { width: hourWidth }
      },
      [0, 15, 30, 45].map((minute) => {
        const slotDate = new Date(currentDate);
        slotDate.setHours(hour, minute, 0, 0);
        const slotId = `${resource.id}-${slotDate.toISOString()}`;
        return /* @__PURE__ */ React13__namespace.default.createElement(
          DroppableCell,
          {
            key: minute,
            id: slotId,
            date: slotDate,
            resourceId: resource.id,
            className: "h-full flex-1 border-r border-border/10 last:border-border/30 hover:bg-accent/10 transition-colors",
            onClick: () => {
              onTimeSlotClick?.(slotDate, resource.id);
            }
          }
        );
      })
    )), resourceEvents.map((event) => /* @__PURE__ */ React13__namespace.default.createElement(
      DraggableEvent,
      {
        key: event.id,
        event,
        onClick: (e) => {
          e.stopPropagation();
          onEventClick?.(event);
        },
        className: "absolute top-2 bottom-2 rounded-md px-2 py-1 text-xs font-medium border shadow-sm cursor-pointer overflow-hidden hover:brightness-95 transition-all z-10",
        style: {
          ...getEventStyle(event),
          backgroundColor: event.color || resource.color || "var(--primary)",
          borderColor: "rgba(0,0,0,0.1)",
          color: "#fff"
        }
      },
      /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "truncate" }, event.title)
    ))));
  }))));
};
var Skeleton = ({ className, style }) => /* @__PURE__ */ React13__namespace.default.createElement("div", { className: cn("animate-pulse bg-muted/40 rounded", className), style });
var MonthViewSkeleton = () => /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-full bg-background border border-border/50 rounded-2xl overflow-hidden" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "grid grid-cols-7 border-b border-border/50 bg-muted/10" }, Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: i, className: "py-3 px-2 text-center border-r border-border/30 last:border-r-0" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-4 w-8 mx-auto" })))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "grid grid-cols-7 flex-1" }, Array.from({ length: 35 }).map((_, i) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: i, className: "min-h-[120px] border-r border-b border-border/30 p-2" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-4 w-6 mb-2" }), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "space-y-1" }, Math.random() > 0.5 && /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-5 w-full rounded-md" }), Math.random() > 0.7 && /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-5 w-3/4 rounded-md" }))))));
var WeekViewSkeleton = () => /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-full bg-background border border-border/50 rounded-2xl overflow-hidden" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex border-b border-border/50 bg-muted/10" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-16 p-3 border-r border-border/30" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-8 w-10 mx-auto" })), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-7" }, Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: i, className: "py-3 px-2 text-center border-r border-border/30 last:border-r-0" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-3 w-8 mx-auto mb-1" }), /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-8 w-8 mx-auto rounded-xl" }))))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-1", style: { height: "600px" } }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-16 border-r border-border/30" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: i, className: "h-[60px] relative" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-4 w-10 absolute right-2 -translate-y-1/2" })))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-7 relative" }, Array.from({ length: 7 }).map((_, colIdx) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: colIdx, className: "relative border-r border-border/30 last:border-r-0" }, Array.from({ length: 10 }).map((_2, rowIdx) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: rowIdx, className: "h-[60px] border-b border-dashed border-border/20" })), Math.random() > 0.3 && /* @__PURE__ */ React13__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute rounded-md",
    style: {
      top: `${Math.floor(Math.random() * 400)}px`,
      left: "4px",
      right: "4px",
      height: `${60 + Math.floor(Math.random() * 120)}px`
    }
  }
))))));
var DayViewSkeleton = () => /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-full bg-background border border-border/50 rounded-2xl overflow-hidden" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "px-6 py-4 border-b border-border/50 bg-muted/10 text-center" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-7 w-64 mx-auto" })), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-1", style: { height: "600px" } }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "w-20 border-r border-border/30 bg-muted/5" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: i, className: "h-[80px] relative" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-4 w-12 absolute left-1/2 -translate-x-1/2 -translate-y-1/2" })))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 relative" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: i, className: "h-[80px] border-b border-dashed border-border/20" })), /* @__PURE__ */ React13__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute rounded-lg left-4 right-4",
    style: { top: "160px", height: "120px" }
  }
), /* @__PURE__ */ React13__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute rounded-lg left-4 right-4",
    style: { top: "400px", height: "80px" }
  }
))));
var AgendaViewSkeleton = () => /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-full bg-background border border-border/50 rounded-2xl overflow-hidden p-6" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "space-y-6" }, Array.from({ length: 4 }).map((_, dayIdx) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: dayIdx }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-5 w-40 mb-4" }), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "space-y-3" }, Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map((_2, eventIdx) => /* @__PURE__ */ React13__namespace.default.createElement("div", { key: eventIdx, className: "flex items-center gap-4 p-3 rounded-xl bg-muted/10" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-10 w-10 rounded-lg" }), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 space-y-2" }, /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-4 w-3/4" }), /* @__PURE__ */ React13__namespace.default.createElement(Skeleton, { className: "h-3 w-1/2" })))))))));
var EventContextMenu = ({
  event,
  position,
  onClose,
  onEdit,
  onDelete,
  onDuplicate,
  customActions = [],
  translations
}) => {
  const menuRef = React13.useRef(null);
  React13.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (position) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [position, onClose]);
  React13.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (position) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [position, onClose]);
  if (!event || !position) return null;
  const actions = [
    ...onEdit ? [{
      id: "edit",
      label: translations?.edit || "Edit",
      icon: /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Edit3, { className: "w-4 h-4" }),
      onClick: () => {
        onEdit(event);
        onClose();
      }
    }] : [],
    ...onDuplicate ? [{
      id: "duplicate",
      label: translations?.duplicate || "Duplicate",
      icon: /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Copy, { className: "w-4 h-4" }),
      onClick: () => {
        onDuplicate(event);
        onClose();
      }
    }] : [],
    ...customActions,
    ...onDelete ? [{
      id: "delete",
      label: translations?.delete || "Delete",
      icon: /* @__PURE__ */ React13__namespace.default.createElement(lucideReact.Trash2, { className: "w-4 h-4" }),
      onClick: () => {
        onDelete(event.id);
        onClose();
      },
      variant: "danger"
    }] : []
  ];
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 200),
    y: Math.min(position.y, window.innerHeight - (actions.length * 44 + 80))
  };
  return /* @__PURE__ */ React13__namespace.default.createElement(framerMotion.AnimatePresence, null, /* @__PURE__ */ React13__namespace.default.createElement(
    framerMotion.motion.div,
    {
      ref: menuRef,
      initial: { opacity: 0, scale: 0.95, y: -5 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: -5 },
      transition: { duration: 0.15, ease: "easeOut" },
      className: "fixed z-[100] min-w-[180px] bg-background border-[0.5px] border-border rounded-xl shadow-xl overflow-hidden",
      style: {
        left: adjustedPosition.x,
        top: adjustedPosition.y
      }
    },
    /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "px-3 py-2 border-b-[0.5px] border-border bg-muted/30" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React13__namespace.default.createElement(
      "div",
      {
        className: "w-2.5 h-2.5 rounded-full shrink-0",
        style: { backgroundColor: event.color || "var(--primary)" }
      }
    ), /* @__PURE__ */ React13__namespace.default.createElement("span", { className: "text-sm font-medium truncate text-foreground" }, event.title))),
    /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "py-1" }, actions.map((action, index) => /* @__PURE__ */ React13__namespace.default.createElement(React13__namespace.default.Fragment, { key: action.id }, index > 0 && action.variant === "danger" && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-px bg-border my-1" }), /* @__PURE__ */ React13__namespace.default.createElement(
      "button",
      {
        onClick: action.onClick,
        disabled: action.disabled,
        className: cn(
          "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
          action.disabled && "opacity-50 cursor-not-allowed",
          action.variant === "danger" ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" : "text-foreground hover:bg-accent"
        )
      },
      action.icon,
      /* @__PURE__ */ React13__namespace.default.createElement("span", null, action.label)
    ))))
  ));
};
var useEventContextMenu = () => {
  const [contextMenu, setContextMenu] = React13.useState({ event: null, position: null });
  const openContextMenu = React13.useCallback((event, e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      event,
      position: { x: e.clientX, y: e.clientY }
    });
  }, []);
  const closeContextMenu = React13.useCallback(() => {
    setContextMenu({ event: null, position: null });
  }, []);
  return {
    contextMenuEvent: contextMenu.event,
    contextMenuPosition: contextMenu.position,
    openContextMenu,
    closeContextMenu
  };
};

// src/lib/theme.ts
function colorToHsl(color) {
  let r = 0, g = 0, b = 0;
  if (color.startsWith("#") || /^[0-9a-fA-F]{3,6}$/.test(color)) {
    let c = color.replace(/^#/, "");
    if (c.length === 3) {
      c = c.split("").map((char) => char + char).join("");
    }
    if (c.length !== 6) return null;
    r = parseInt(c.substring(0, 2), 16) / 255;
    g = parseInt(c.substring(2, 4), 16) / 255;
    b = parseInt(c.substring(4, 6), 16) / 255;
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (!match || match.length < 3) return null;
    r = parseInt(match[0]) / 255;
    g = parseInt(match[1]) / 255;
    b = parseInt(match[2]) / 255;
  } else {
    return null;
  }
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);
  return `${hDeg} ${sPct}% ${lPct}%`;
}
function getThemeStyles(theme) {
  if (!theme) return {};
  const styles = {};
  if (theme.colors) {
    const mappings = {
      "--background": "background",
      "--foreground": "foreground",
      "--primary": "primary",
      "--secondary": "secondary",
      "--muted": "muted",
      "--accent": "accent",
      "--border": "border"
    };
    Object.entries(mappings).forEach(([cssVar, themeKey]) => {
      const colorValue = theme.colors?.[themeKey];
      if (colorValue) {
        const hsl = colorToHsl(colorValue);
        if (hsl) {
          styles[cssVar] = hsl;
        }
      }
    });
  }
  if (theme.borderRadius) {
    styles["--radius"] = theme.borderRadius;
  }
  if (theme.fontFamily) {
    styles["fontFamily"] = theme.fontFamily;
  }
  return styles;
}
var useCalendarLogic = ({
  events,
  view: controlledView,
  onViewChange: controlledOnViewChange,
  date: controlledDate,
  onDateChange: controlledOnDateChange,
  readOnly,
  timezone
}) => {
  const [internalView, setInternalView] = React13.useState("week");
  const [internalDate, setInternalDate] = React13.useState(/* @__PURE__ */ new Date());
  const [isSidebarOpen, setIsSidebarOpen] = React13.useState(true);
  const [isModalOpen, setIsModalOpen] = React13.useState(false);
  const [selectedEvent, setSelectedEvent] = React13.useState(null);
  const [modalInitialDate, setModalInitialDate] = React13.useState(void 0);
  const view = controlledView ?? internalView;
  const currentDate = controlledDate ?? internalDate;
  const handleViewChange = (newView) => {
    if (controlledOnViewChange) {
      controlledOnViewChange(newView);
    } else {
      setInternalView(newView);
    }
  };
  const handleDateChange = (newDate) => {
    if (controlledOnDateChange) {
      controlledOnDateChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  };
  const handlePrev = () => {
    switch (view) {
      case "month":
        handleDateChange(dateFns.subMonths(currentDate, 1));
        break;
      case "week":
        handleDateChange(dateFns.subWeeks(currentDate, 1));
        break;
      case "day":
      case "resource":
        handleDateChange(dateFns.subDays(currentDate, 1));
        break;
      case "agenda":
        handleDateChange(dateFns.subDays(currentDate, 7));
        break;
    }
  };
  const handleNext = () => {
    switch (view) {
      case "month":
        handleDateChange(dateFns.addMonths(currentDate, 1));
        break;
      case "week":
        handleDateChange(dateFns.addWeeks(currentDate, 1));
        break;
      case "day":
      case "resource":
        handleDateChange(dateFns.addDays(currentDate, 1));
        break;
      case "agenda":
        handleDateChange(dateFns.addDays(currentDate, 7));
        break;
    }
  };
  const handleToday = () => {
    handleDateChange(/* @__PURE__ */ new Date());
  };
  const handleDateClick = (date) => {
    handleDateChange(date);
    handleViewChange("day");
  };
  const handleTimeSlotClick = (date) => {
    if (readOnly) return;
    setSelectedEvent(null);
    setModalInitialDate(date);
    setIsModalOpen(true);
  };
  const handleEventClickInternal = (event) => {
    if (!readOnly) {
      setSelectedEvent(event);
      setModalInitialDate(void 0);
      setIsModalOpen(true);
    }
  };
  const handleCreateEvent = () => {
    if (readOnly) return;
    setSelectedEvent(null);
    setModalInitialDate(/* @__PURE__ */ new Date());
    setIsModalOpen(true);
  };
  const handleModalSave = (eventData) => {
    selectedEvent?.id;
  };
  const handleModalDelete = (eventId) => {
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeEvent = active.data.current?.event;
    const overDate = over.data.current?.date;
    if (!activeEvent || !overDate) return;
    const originalStart = new Date(activeEvent.start);
    const originalEnd = new Date(activeEvent.end);
    const duration = dateFns.differenceInMilliseconds(originalEnd, originalStart);
    let newStart;
    if (view === "month") {
      if (timezone) {
        const zonedOriginal = dateFnsTz.toZonedTime(originalStart, timezone);
        const zonedNew = new Date(overDate);
        zonedNew.setHours(zonedOriginal.getHours());
        zonedNew.setMinutes(zonedOriginal.getMinutes());
        zonedNew.setSeconds(zonedOriginal.getSeconds());
        zonedNew.setMilliseconds(zonedOriginal.getMilliseconds());
        newStart = dateFnsTz.fromZonedTime(zonedNew, timezone);
      } else {
        newStart = new Date(overDate);
        newStart.setHours(originalStart.getHours());
        newStart.setMinutes(originalStart.getMinutes());
        newStart.setSeconds(originalStart.getSeconds());
        newStart.setMilliseconds(originalStart.getMilliseconds());
      }
    } else {
      if (timezone) {
        newStart = dateFnsTz.fromZonedTime(overDate, timezone);
      } else {
        newStart = new Date(overDate);
      }
      newStart.setSeconds(0);
      newStart.setMilliseconds(0);
    }
    const newEnd = new Date(newStart.getTime() + duration);
    let newResourceId = activeEvent.resourceId;
    const overResourceId = over.data.current?.resourceId;
    if (overResourceId) {
      newResourceId = overResourceId;
    }
    if (newStart.getTime() === originalStart.getTime() && newEnd.getTime() === originalEnd.getTime() && newResourceId === activeEvent.resourceId) {
      return;
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
    handleDragEnd
  };
};
var useSwipeGesture = (options) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 100,
    restraint = 100,
    allowedTime = 500,
    enabled = true
  } = options;
  const touchInfoRef = React13.useRef(null);
  const elementRef = React13.useRef(null);
  const handleTouchStart = React13.useCallback((e) => {
    if (!enabled) return;
    const touch = e.touches[0];
    touchInfoRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now()
    };
  }, [enabled]);
  const handleTouchEnd = React13.useCallback((e) => {
    if (!enabled || !touchInfoRef.current) return;
    const touch = e.changedTouches[0];
    const { startX, startY, startTime } = touchInfoRef.current;
    const distX = touch.clientX - startX;
    const distY = touch.clientY - startY;
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        if (distY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }
    touchInfoRef.current = null;
  }, [enabled, threshold, restraint, allowedTime, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);
  React13.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
  return elementRef;
};
var useViewSwipe = (onPrev, onNext, enabled = true) => {
  return useSwipeGesture({
    onSwipeLeft: onNext,
    onSwipeRight: onPrev,
    threshold: 50,
    restraint: 100,
    allowedTime: 300,
    enabled
  });
};

// src/index.tsx
var Scheduler = ({
  events = [],
  view: controlledView,
  onViewChange: controlledOnViewChange,
  date: controlledDate,
  onDateChange: controlledOnDateChange,
  timezone,
  onTimezoneChange,
  className,
  theme,
  renderEventForm,
  readOnly,
  calendars,
  resources,
  eventTypes,
  onCalendarToggle,
  isLoading,
  isDarkMode,
  onThemeToggle,
  translations,
  // New Prop
  hideViewSwitcher,
  language,
  onLanguageChange,
  locale
  // Date-fns locale
}) => {
  const [activeDragEvent, setActiveDragEvent] = React13.useState(null);
  const {
    contextMenuEvent,
    contextMenuPosition,
    closeContextMenu
  } = useEventContextMenu();
  const {
    view,
    currentDate,
    isSidebarOpen,
    setIsSidebarOpen,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    modalInitialDate,
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
    events: calendarEvents
  } = useCalendarLogic({
    events,
    view: controlledView,
    onViewChange: controlledOnViewChange,
    date: controlledDate,
    onDateChange: controlledOnDateChange,
    readOnly,
    timezone
  });
  const sensors = core.useSensors(
    core.useSensor(core.PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );
  const gridSize = 15;
  const snapToGrid = modifiers.createSnapModifier(gridSize);
  const modifiers$1 = [snapToGrid, modifiers.restrictToWindowEdges];
  const dndSensors = readOnly ? [] : sensors;
  const id = React13.useId();
  const swipeRef = useViewSwipe(handlePrev, handleNext, true);
  const t = {
    today: "Today",
    month: "Month",
    week: "Week",
    day: "Day",
    agenda: "Agenda",
    resource: "Resource",
    createEvent: "Create Event",
    editEvent: "Edit Event",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    title: "Title",
    start: "Start",
    end: "End",
    allDay: "All Day",
    description: "Description",
    repeat: "Repeat",
    noRepeat: "Does not repeat",
    selectCalendar: "Select Calendar",
    selectType: "Select Type",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
    ...translations
  };
  const handleDragStart = (event) => {
    const { active } = event;
    const draggedEvent = calendarEvents.find((e) => e.id === active.id);
    if (draggedEvent) {
      setActiveDragEvent(draggedEvent);
    }
  };
  const onDragEndWrapper = (event) => {
    setActiveDragEvent(null);
    handleDragEnd(event);
  };
  const getDragHeight = () => {
    if (!activeDragEvent) return void 0;
    if (view === "resource") {
      return 80;
    }
    if (view !== "week" && view !== "day") return void 0;
    const duration = dateFns.differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
    const hourHeight = view === "day" ? 80 : 60;
    return duration / 60 * hourHeight;
  };
  const getDragWidth = () => {
    if (view === "month") return "100%";
    if (view === "resource" && activeDragEvent) {
      const duration = dateFns.differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
      const width = duration / 60 * 100;
      return `${Math.max(width, 4)}px`;
    }
    return "150px";
  };
  const filteredEvents = React13.useMemo(() => {
    if (!calendars) return calendarEvents;
    const activeCalendarIds = calendars.filter((c) => c.active !== false).map((c) => c.id);
    return calendarEvents.filter((e) => {
      if (!e.calendarId) return true;
      return activeCalendarIds.includes(e.calendarId);
    });
  }, [calendarEvents, calendars]);
  return /* @__PURE__ */ React13__namespace.default.createElement(
    core.DndContext,
    {
      id,
      sensors: dndSensors,
      onDragStart: handleDragStart,
      onDragEnd: onDragEndWrapper,
      modifiers: modifiers$1
    },
    /* @__PURE__ */ React13__namespace.default.createElement(
      "div",
      {
        className: cn("flex flex-col h-full bg-background text-foreground relative", className),
        style: getThemeStyles(theme)
      },
      /* @__PURE__ */ React13__namespace.default.createElement(
        CalendarHeader,
        {
          currentDate,
          onPrev: handlePrev,
          onNext: handleNext,
          onToday: handleToday,
          view,
          onViewChange: handleViewChange,
          onMenuClick: () => setIsSidebarOpen(!isSidebarOpen),
          isDarkMode,
          onThemeToggle,
          translations: t,
          hideViewSwitcher,
          language,
          onLanguageChange,
          locale
        }
      ),
      /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex flex-1 overflow-hidden" }, /* @__PURE__ */ React13__namespace.default.createElement(
        framerMotion.motion.div,
        {
          className: cn(
            "hidden md:flex flex-shrink-0 overflow-hidden"
          ),
          initial: false,
          animate: {
            width: isSidebarOpen ? 256 : 0,
            opacity: isSidebarOpen ? 1 : 0
          },
          transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }
        },
        /* @__PURE__ */ React13__namespace.default.createElement(
          Sidebar,
          {
            currentDate,
            onDateChange: handleDateChange,
            onViewChange: handleViewChange,
            timezone,
            onTimezoneChange,
            className: "w-full h-full",
            readOnly,
            calendars,
            onCalendarToggle,
            translations: t
          }
        )
      ), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 flex flex-col overflow-hidden relative" }, isLoading ? /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "flex-1 overflow-auto p-0 md:p-4" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-full min-w-full" }, view === "month" && /* @__PURE__ */ React13__namespace.default.createElement(MonthViewSkeleton, null), view === "week" && /* @__PURE__ */ React13__namespace.default.createElement(WeekViewSkeleton, null), view === "day" && /* @__PURE__ */ React13__namespace.default.createElement(DayViewSkeleton, null), view === "agenda" && /* @__PURE__ */ React13__namespace.default.createElement(AgendaViewSkeleton, null), view === "resource" && /* @__PURE__ */ React13__namespace.default.createElement(WeekViewSkeleton, null))) : /* @__PURE__ */ React13__namespace.default.createElement("div", { ref: swipeRef, className: "flex-1 overflow-auto p-0 md:p-4 touch-pan-y" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "h-full min-w-full" }, /* @__PURE__ */ React13__namespace.default.createElement(framerMotion.AnimatePresence, { mode: "wait", initial: false }, /* @__PURE__ */ React13__namespace.default.createElement(
        framerMotion.motion.div,
        {
          key: `${view}-${currentDate.toISOString()}-${timezone || "local"}`,
          initial: { opacity: 0, scale: 0.98, y: 15 },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 0.25,
              ease: [0.25, 0.1, 0.25, 1]
            }
          },
          exit: {
            opacity: 0,
            scale: 0.98,
            y: -10,
            transition: {
              duration: 0.15,
              ease: [0.25, 0.1, 0.25, 1]
            }
          },
          className: "h-full"
        },
        view === "month" && /* @__PURE__ */ React13__namespace.default.createElement(
          MonthView,
          {
            currentDate,
            events: filteredEvents,
            onEventClick: handleEventClickInternal,
            onDateClick: handleDateClick,
            timezone,
            locale
          }
        ),
        view === "week" && /* @__PURE__ */ React13__namespace.default.createElement(
          WeekView,
          {
            currentDate,
            events: filteredEvents,
            onEventClick: handleEventClickInternal,
            onTimeSlotClick: handleTimeSlotClick,
            timezone,
            locale,
            readonly: readOnly
          }
        ),
        view === "day" && /* @__PURE__ */ React13__namespace.default.createElement(
          DayView,
          {
            currentDate,
            events: filteredEvents,
            onEventClick: handleEventClickInternal,
            onTimeSlotClick: handleTimeSlotClick,
            timezone,
            locale,
            readonly: readOnly
          }
        ),
        view === "agenda" && /* @__PURE__ */ React13__namespace.default.createElement(
          AgendaView,
          {
            currentDate,
            events: filteredEvents,
            onEventClick: handleEventClickInternal,
            onCreateEvent: handleCreateEvent
          }
        ),
        view === "resource" && resources && /* @__PURE__ */ React13__namespace.default.createElement(
          ResourceView,
          {
            currentDate,
            events: filteredEvents,
            resources,
            onEventClick: handleEventClickInternal,
            onTimeSlotClick: (date, resourceId) => {
              if (readOnly) return;
              handleTimeSlotClick(date);
            },
            locale
          }
        )
      )))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "md:hidden absolute bottom-6 right-6 z-50" }, /* @__PURE__ */ React13__namespace.default.createElement(
        "button",
        {
          onClick: handleCreateEvent,
          className: "w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white active:scale-90 transition-transform"
        },
        /* @__PURE__ */ React13__namespace.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React13__namespace.default.createElement("path", { d: "M5 12h14" }), /* @__PURE__ */ React13__namespace.default.createElement("path", { d: "M12 5v14" }))
      )))),
      renderEventForm && renderEventForm({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        event: selectedEvent,
        initialDate: modalInitialDate,
        onSave: handleModalSave,
        onDelete: handleModalDelete
      }),
      /* @__PURE__ */ React13__namespace.default.createElement(
        EventContextMenu,
        {
          event: contextMenuEvent,
          position: contextMenuPosition,
          onClose: closeContextMenu,
          onEdit: (event) => {
            handleEventClickInternal(event);
            closeContextMenu();
          },
          onDelete: (eventId) => {
            closeContextMenu();
          },
          onDuplicate: (event) => {
            ({
              ...event,
              id: `${event.id}-copy-${Date.now()}`,
              title: `${event.title} (Copy)`,
              start: new Date(event.start.getTime() + 24 * 60 * 60 * 1e3),
              // +1 day
              end: new Date(event.end.getTime() + 24 * 60 * 60 * 1e3)
            });
            closeContextMenu();
          },
          translations: {
            edit: t.editEvent || "Edit",
            delete: t.delete || "Delete",
            duplicate: "Duplicate"
          }
        }
      ),
      /* @__PURE__ */ React13__namespace.default.createElement(core.DragOverlay, { dropAnimation: null }, activeDragEvent ? /* @__PURE__ */ React13__namespace.default.createElement(
        "div",
        {
          className: cn(
            "rounded-lg shadow-2xl border-2 overflow-hidden cursor-grabbing transition-transform",
            "backdrop-blur-sm",
            !activeDragEvent.color && "bg-primary/90 border-primary/60 text-primary-foreground"
          ),
          style: {
            backgroundColor: activeDragEvent.color ? `${activeDragEvent.color}e0` : void 0,
            borderColor: activeDragEvent.color ? `${activeDragEvent.color}80` : void 0,
            color: activeDragEvent.color ? "#fff" : void 0,
            width: getDragWidth(),
            height: getDragHeight() ? `${getDragHeight()}px` : void 0,
            boxShadow: `0 20px 40px -15px ${activeDragEvent.color || "var(--primary)"}40, 0 10px 20px -10px rgba(0,0,0,0.2)`,
            transform: "rotate(-2deg) scale(1.02)"
          }
        },
        /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "p-2.5 h-full flex flex-col" }, /* @__PURE__ */ React13__namespace.default.createElement(
          "div",
          {
            className: "absolute left-0 top-0 bottom-0 w-1 rounded-l-lg",
            style: { backgroundColor: activeDragEvent.color || "var(--primary)" }
          }
        ), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "pl-2" }, /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "font-semibold truncate text-sm" }, activeDragEvent.title), (view === "week" || view === "day") && getDragHeight() && getDragHeight() > 40 && /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "text-xs opacity-80 mt-0.5 flex items-center gap-1" }, /* @__PURE__ */ React13__namespace.default.createElement("svg", { className: "w-3 h-3", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React13__namespace.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React13__namespace.default.createElement("path", { d: "M12 6v6l4 2" })), dateFns.format(activeDragEvent.start, "h:mm a"), " - ", dateFns.format(activeDragEvent.end, "h:mm a"))), /* @__PURE__ */ React13__namespace.default.createElement("div", { className: "absolute bottom-1.5 right-1.5 opacity-60" }, /* @__PURE__ */ React13__namespace.default.createElement("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React13__namespace.default.createElement("circle", { cx: "9", cy: "5", r: "1.5" }), /* @__PURE__ */ React13__namespace.default.createElement("circle", { cx: "15", cy: "5", r: "1.5" }), /* @__PURE__ */ React13__namespace.default.createElement("circle", { cx: "9", cy: "12", r: "1.5" }), /* @__PURE__ */ React13__namespace.default.createElement("circle", { cx: "15", cy: "12", r: "1.5" }), /* @__PURE__ */ React13__namespace.default.createElement("circle", { cx: "9", cy: "19", r: "1.5" }), /* @__PURE__ */ React13__namespace.default.createElement("circle", { cx: "15", cy: "19", r: "1.5" }))))
      ) : null)
    )
  );
};

exports.Scheduler = Scheduler;
exports.cn = cn;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map