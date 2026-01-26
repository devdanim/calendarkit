'use strict';

var React12 = require('react');
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

var React12__namespace = /*#__PURE__*/_interopNamespace(React12);

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
var Button = React12__namespace.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return /* @__PURE__ */ React12__namespace.createElement("button", { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
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
  hideLanguageSelector,
  hideDarkModeToggle,
  language,
  onLanguageChange,
  locale,
  newEventButton
}) => {
  const viewConfig = [
    {
      key: "month",
      icon: lucideReact.CalendarDays
    },
    {
      key: "week",
      icon: lucideReact.CalendarRange
    },
    {
      key: "day",
      icon: lucideReact.Calendar
    },
    {
      key: "agenda",
      icon: lucideReact.ListTodo
    }
  ];
  return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex min-h-[64px] flex-col items-center justify-between gap-3 border-b-[0px] border-border/50 bg-gradient-to-r from-background via-background to-muted/20 px-3 py-3 md:flex-row md:gap-0 md:px-5" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex w-full items-center justify-between gap-2 md:w-auto md:justify-start" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center gap-2 md:gap-3" }, /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "hidden h-10 w-10 rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent/80 hover:text-foreground md:inline-flex",
      onClick: onMenuClick
    },
    /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Menu, { className: "h-5 w-5" })
  ), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "ml-2 md:ml-4" }, /* @__PURE__ */ React12__namespace.default.createElement("h2", { className: "whitespace-nowrap text-lg font-semibold capitalize tracking-tight text-foreground md:text-xl" }, dateFns.format(currentDate, "MMMM yyyy", { locale }))), /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "outline",
      onClick: onToday,
      className: "hidden h-9 rounded-xl border-[0.5px] border-border/60 bg-[#EEEFF5] px-5 text-sm font-medium transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:inline-flex"
    },
    translations.today
  ), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center rounded-xl bg-muted/40 p-0.5" }, /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: onPrev,
      className: "h-8 w-8 rounded-lg transition-all duration-200 hover:bg-background/80"
    },
    /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.ChevronLeft, { className: "h-4 w-4 text-muted-foreground" })
  ), /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: onNext,
      className: "h-8 w-8 rounded-lg transition-all duration-200 hover:bg-background/80"
    },
    /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
  )))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex w-full items-center justify-end gap-2 md:w-auto md:gap-3" }, !hideLanguageSelector && onLanguageChange && language && /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "sm",
      onClick: () => onLanguageChange(language === "en" ? "fr" : "en"),
      className: "h-9 rounded-xl px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:bg-accent/80 hover:text-foreground"
    },
    language
  ), !hideDarkModeToggle && onThemeToggle && /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "h-9 w-9 rounded-xl transition-all duration-200 hover:bg-accent/80",
      onClick: onThemeToggle
    },
    isDarkMode ? /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Sun, { className: "h-4 w-4 text-amber-500" }) : /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Moon, { className: "h-4 w-4 text-muted-foreground" })
  ), !hideViewSwitcher && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center rounded-xl bg-[#EEEFF5] p-1 backdrop-blur-sm" }, viewConfig.map(({ key, icon: Icon }) => /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      key,
      variant: "ghost",
      size: "sm",
      onClick: () => onViewChange(key),
      className: cn(
        "h-8 gap-1.5 rounded-lg px-3 text-xs transition-all duration-200",
        view === key ? "border-[0.5px] border-border/50 bg-background font-medium text-foreground shadow-sm" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
      )
    },
    /* @__PURE__ */ React12__namespace.default.createElement(Icon, { className: "h-3.5 w-3.5" }),
    /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "hidden sm:inline" }, translations[key])
  ))), newEventButton && /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "outline",
      size: "sm",
      className: "h-9 rounded-xl border-none bg-[#7FDDF0] px-5 text-sm font-medium transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:inline-flex",
      onClick: newEventButton.onClick
    },
    newEventButton.icon,
    newEventButton.label
  )));
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
  className,
  locale
}) => {
  const [viewDate, setViewDate] = React12__namespace.default.useState(currentDate);
  React12__namespace.default.useEffect(() => {
    setViewDate(currentDate);
  }, [currentDate]);
  const days = React12__namespace.default.useMemo(() => getMonthGrid(viewDate), [viewDate]);
  const weekDays = React12__namespace.default.useMemo(() => {
    const start = dateFns.startOfWeek(/* @__PURE__ */ new Date(), { locale });
    return Array.from(
      {
        length: 7
      },
      (_, i) => dateFns.format(dateFns.addDays(start, i), "EEEEE", { locale })
    );
  }, [locale]);
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
  return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: cn("w-[260px] px-4", className) }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mb-4 flex items-center justify-between" }, /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-sm font-semibold capitalize text-foreground" }, dateFns.format(viewDate, "MMMM yyyy", { locale })), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center rounded-lg bg-muted/40 p-0.5" }, /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "h-7 w-7 rounded-md transition-all hover:bg-background/80",
      onClick: handlePrev,
      "aria-label": "Previous month"
    },
    /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.ChevronLeft, { className: "h-4 w-4" })
  ), /* @__PURE__ */ React12__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "h-7 w-7 rounded-md transition-all hover:bg-background/80",
      onClick: handleNext,
      "aria-label": "Next month"
    },
    /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.ChevronRight, { className: "h-4 w-4" })
  ))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mb-2 grid grid-cols-7 gap-y-2 text-center" }, weekDays.map((day, i) => /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      key: `${day}-${i}`,
      className: "text-[10px] font-semibold uppercase text-muted-foreground/70"
    },
    day
  ))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "grid grid-cols-7 gap-y-1 text-center" }, days.map((day) => {
    const isSelected = dateFns.isSameDay(day, currentDate);
    const isCurrentMonth = dateFns.isSameMonth(day, viewDate);
    const isTodayDate = dateFns.isToday(day);
    return /* @__PURE__ */ React12__namespace.default.createElement(
      "button",
      {
        key: day.toISOString(),
        onClick: () => handleDateClick(day),
        className: cn(
          "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-200",
          !isCurrentMonth && "text-muted-foreground/30",
          isCurrentMonth && !isSelected && !isTodayDate && "text-foreground hover:bg-accent/80",
          isSelected && "scale-105 bg-primary text-primary-foreground shadow-md shadow-primary/30",
          !isSelected && isTodayDate && "bg-primary/10 text-primary ring-1 ring-primary/30"
        )
      },
      dateFns.format(day, "d", { locale })
    );
  })));
};
function isFilterSectionArray(calendars) {
  if (!calendars || calendars.length === 0) return false;
  return "items" in calendars[0];
}
function normalizeToSections(calendars, defaultTitle) {
  if (!calendars || calendars.length === 0) {
    return [
      {
        id: "default",
        title: defaultTitle,
        items: [
          { id: "1", label: "My Calendar", color: "#3b82f6", active: true },
          { id: "2", label: "Birthdays", color: "#10b981", active: true },
          { id: "3", label: "Tasks", color: "#6366f1", active: true }
        ]
      }
    ];
  }
  if (isFilterSectionArray(calendars)) {
    return calendars;
  }
  return [
    {
      id: "default",
      title: defaultTitle,
      items: calendars
    }
  ];
}
var Sidebar = ({
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
  locale
}) => {
  const [timezoneOpen, setTimezoneOpen] = React12.useState(false);
  const [now, setNow] = React12.useState(null);
  const [hasMounted, setHasMounted] = React12.useState(false);
  const filterSections = normalizeToSections(calendars, translations?.calendars || "Calendars");
  const [collapsedSections, setCollapsedSections] = React12.useState(() => {
    const initial = {};
    filterSections.forEach((section) => {
      initial[section.id] = section.collapsed ?? false;
    });
    return initial;
  });
  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  React12.useEffect(() => {
    const initializeTime = () => {
      setHasMounted(true);
      setNow(/* @__PURE__ */ new Date());
    };
    const initTimer = setTimeout(initializeTime, 0);
    const timer = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => {
      clearTimeout(initTimer);
      clearInterval(timer);
    };
  }, []);
  const getAcronym = (tz) => {
    if (!tz || !now) return "LOC";
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" }).formatToParts(now).find((part) => part.type === "timeZoneName")?.value || "";
    } catch {
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
      return /* @__PURE__ */ React12__namespace.default.createElement("span", null, tz.label);
    }
    let time = "";
    let acronym = tz.acronym;
    try {
      if (!tz.value) {
        time = dateFns.format(now, "HH:mm");
        try {
          acronym = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(now).find((part) => part.type === "timeZoneName")?.value || "LOC";
        } catch {
        }
      } else {
        const zDate = dateFnsTz.toZonedTime(now, tz.value);
        time = dateFns.format(zDate, "HH:mm");
        const dynAcronym = getAcronym(tz.value);
        if (dynAcronym && !dynAcronym.includes("GMT") && !dynAcronym.includes("Time")) {
          acronym = dynAcronym;
        }
      }
    } catch {
      return /* @__PURE__ */ React12__namespace.default.createElement("span", null, tz.label);
    }
    return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex w-full justify-between" }, /* @__PURE__ */ React12__namespace.default.createElement("span", null, tz.label), /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "ml-2 tabular-nums text-muted-foreground" }, time, " ", /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-xs opacity-75" }, "(", acronym, ")")));
  };
  const selectedTzObj = timezones.find((t) => t.value === (timezone || ""));
  const selectedTimezoneLabel = selectedTzObj ? formatTzLabel(selectedTzObj) : translations?.localTime || "Local Time";
  return /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      className: cn(
        "scrollbar-hide flex h-full min-w-[256px] flex-col overflow-y-auto overflow-x-hidden bg-gradient-to-b from-background via-background to-muted/10 pb-4 pt-4",
        className
      )
    },
    showMiniCalendar && /* @__PURE__ */ React12__namespace.default.createElement(
      MiniCalendar,
      {
        currentDate,
        onDateChange,
        onViewChange,
        locale
      }
    ),
    /* @__PURE__ */ React12__namespace.default.createElement("div", { className: cn("flex-1 space-y-4 px-4", showMiniCalendar ? "mt-5" : "mt-0") }, showCalendarFilters && filterSections.map((section) => {
      const isCollapsed = collapsedSections[section.id] ?? false;
      return /* @__PURE__ */ React12__namespace.default.createElement(
        "div",
        {
          key: section.id,
          className: "rounded-2xl border-[0px] border-border/30 bg-muted/20 p-3"
        },
        section.title && /* @__PURE__ */ React12__namespace.default.createElement(
          "div",
          {
            className: "-m-1 mb-2 flex cursor-pointer items-center justify-between rounded-xl p-2 transition-all duration-200 hover:bg-accent/50",
            onClick: () => toggleSection(section.id)
          },
          /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-sm font-semibold text-foreground" }, section.title),
          /* @__PURE__ */ React12__namespace.default.createElement(
            lucideReact.ChevronDown,
            {
              className: cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                !isCollapsed && "rotate-180"
              )
            }
          )
        ),
        !isCollapsed && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "space-y-1" }, section.items.map((item) => /* @__PURE__ */ React12__namespace.default.createElement(
          "div",
          {
            key: item.id,
            className: "group flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition-all duration-200 hover:bg-accent/60",
            onClick: () => onCalendarToggle?.(item.id, !(item.active ?? true))
          },
          /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex items-center justify-center" }, /* @__PURE__ */ React12__namespace.default.createElement(
            "input",
            {
              type: "checkbox",
              checked: item.active ?? true,
              onChange: (e) => {
                e.stopPropagation();
                onCalendarToggle?.(item.id, e.target.checked);
              },
              className: "peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-border/60 transition-all duration-200 checked:border-transparent",
              style: { "--primary-color": item.color },
              "data-cal-id": item.id
            }
          ), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity peer-checked:opacity-100" }, /* @__PURE__ */ React12__namespace.default.createElement(
            "svg",
            {
              className: "h-3.5 w-3.5 text-white",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 3
            },
            /* @__PURE__ */ React12__namespace.default.createElement(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M5 13l4 4L19 7"
              }
            )
          )), /* @__PURE__ */ React12__namespace.default.createElement("style", null, `
                          input[type="checkbox"][data-cal-id="${item.id}"]:checked {
                            background-color: ${item.color} !important;
                            border-color: ${item.color} !important;
                          }
                          input[type="checkbox"][data-cal-id="${item.id}"]:focus {
                            --tw-ring-color: ${item.color}40 !important;
                          }
                        `)),
          /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex min-w-0 flex-1 items-center gap-2" }, item.icon && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-4 w-4" }, item.icon), /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "truncate text-sm font-medium text-foreground/90" }, item.label))
        )))
      );
    })),
    showTimezoneSelector && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mt-auto px-4 pt-5" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "rounded-2xl bg-muted/20 p-3" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mb-3 flex items-center gap-2" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "rounded-lg bg-primary/10 p-1.5" }, /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Globe, { className: "h-4 w-4 text-primary" })), /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-sm font-semibold text-foreground" }, translations?.timezone || "Timezone")), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative" }, /* @__PURE__ */ React12__namespace.default.createElement(
      "button",
      {
        onClick: () => setTimezoneOpen(!timezoneOpen),
        className: "flex w-full items-center justify-between rounded-xl bg-blue-200/40 py-2.5 pl-4 pr-3 text-left text-sm text-foreground transition-all duration-200 hover:bg-blue-200/80 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      },
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mr-2 flex-1 truncate font-medium" }, selectedTimezoneLabel),
      /* @__PURE__ */ React12__namespace.default.createElement(
        lucideReact.ChevronDown,
        {
          className: cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            timezoneOpen && "rotate-180"
          )
        }
      )
    ), timezoneOpen && /* @__PURE__ */ React12__namespace.default.createElement(React12__namespace.default.Fragment, null, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "fixed inset-0 z-40", onClick: () => setTimezoneOpen(false) }), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "animate-in fade-in zoom-in-95 absolute bottom-full left-0 z-50 mb-2 max-h-[260px] w-full overflow-y-auto rounded-xl bg-background p-1.5 shadow-2xl backdrop-blur-none duration-200" }, timezones.map((tz) => /* @__PURE__ */ React12__namespace.default.createElement(
      "div",
      {
        key: tz.value,
        className: cn(
          "cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
          (timezone || "") === tz.value ? "bg-primary font-semibold text-primary-foreground" : "text-foreground hover:bg-accent/80"
        ),
        onClick: () => {
          onTimezoneChange?.(tz.value);
          setTimezoneOpen(false);
        }
      },
      formatTzLabel(tz)
    )))))))
  );
};
var DraggableEvent = ({
  event,
  children,
  className,
  style: propStyle,
  ...props
}) => {
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
  return /* @__PURE__ */ React12__namespace.default.createElement(
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
var DroppableCell = ({
  id,
  date,
  resourceId,
  children,
  className,
  style,
  onClick
}) => {
  const { isOver, setNodeRef } = core.useDroppable({
    id,
    data: { date, resourceId }
  });
  const minutes = date.getMinutes();
  const activeQuarterClass = minutes === 0 ? "bg-blue-50/50 dark:bg-blue-900/10 ring-2 ring-primary ring-inset" : minutes === 15 ? "bg-blue-50/80 dark:bg-blue-900/20 ring-2 ring-primary ring-inset" : minutes === 30 ? "bg-blue-100/50 dark:bg-blue-900/30 ring-2 ring-primary ring-inset" : "bg-blue-100/80 dark:bg-blue-900/40 ring-2 ring-primary ring-inset";
  return /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      ref: setNodeRef,
      className: cn(className, isOver && activeQuarterClass),
      style,
      onClick
    },
    children
  );
};

// src/views/MonthView.tsx
var EventItem = React12__namespace.default.memo(
  ({
    event,
    onEventClick
  }) => /* @__PURE__ */ React12__namespace.default.createElement(DraggableEvent, { event }, /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      className: cn(
        "cursor-pointer truncate rounded-lg px-2.5 py-1.5 text-xs shadow-sm transition-all duration-200",
        "hover:z-10 hover:scale-[1.02] hover:shadow-md",
        !event.color && "border-[0.5px] border-primary/20 bg-primary/10 text-primary hover:bg-primary/15"
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
    /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "font-medium" }, event.title)
  ))
);
EventItem.displayName = "EventItem";
var MonthView = ({
  currentDate,
  events,
  onEventClick,
  onDateClick,
  timezone,
  locale
}) => {
  const days = React12.useMemo(() => getMonthGrid(currentDate), [currentDate]);
  const weekDays = React12.useMemo(() => {
    const start = dateFns.startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = dateFns.endOfWeek(currentDate, { weekStartsOn: 1 });
    return dateFns.eachDayOfInterval({ start, end });
  }, [currentDate]);
  const getZonedDate = React12.useCallback(
    (date) => {
      return timezone ? dateFnsTz.toZonedTime(date, timezone) : date;
    },
    [timezone]
  );
  const eventsByDay = React12.useMemo(() => {
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
  return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "scrollbar-hide flex h-full min-w-[800px] flex-col overflow-hidden rounded-2xl border-[0.5px] border-border/50 bg-background shadow-sm md:min-w-0" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex-1 overflow-y-auto" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "sticky top-0 z-20 grid grid-cols-7 border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/30 via-muted/40 to-muted/30 backdrop-blur-sm" }, weekDays.map((day) => /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      key: day.toISOString(),
      className: "border-r-[0.5px] border-border/30 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground last:border-r-0"
    },
    dateFns.format(day, "EEE", { locale })
  ))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "grid grid-cols-7", style: { gridAutoRows: "130px" } }, days.map((day) => {
    const dayKey = dateFns.format(day, "yyyy-MM-dd");
    const dayEvents = eventsByDay.get(dayKey) || [];
    const isCurrentMonth = dateFns.isSameMonth(day, currentDate);
    const cellId = day.toISOString();
    return /* @__PURE__ */ React12__namespace.default.createElement(
      DroppableCell,
      {
        key: cellId,
        id: cellId,
        date: day,
        className: cn(
          "group relative flex h-[130px] flex-col gap-1.5 overflow-hidden border-b-[0.5px] border-r-[0.5px] border-border/30 p-2 transition-all duration-200 last:border-r-0",
          !isCurrentMonth && "bg-muted/5 text-muted-foreground/60",
          dateFns.isToday(day) && "bg-primary/5 ring-1 ring-inset ring-primary/20"
        ),
        onClick: () => onDateClick?.(day)
      },
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-start justify-between" }, /* @__PURE__ */ React12__namespace.default.createElement(
        "div",
        {
          className: cn(
            "flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
            dateFns.isToday(day) && "bg-primary text-primary-foreground shadow-md shadow-primary/30"
          )
        },
        dateFns.format(day, "d", { locale })
      ), dayEvents.length > 0 && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "rounded-full bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60" }, dayEvents.length)),
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "scrollbar-hide flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden" }, dayEvents.slice(0, 4).map((event) => /* @__PURE__ */ React12__namespace.default.createElement(
        EventItem,
        {
          key: `${event.id}-${dayKey}`,
          event,
          onEventClick
        }
      )), dayEvents.length > 4 && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "cursor-pointer rounded-md bg-primary/5 px-2 py-1 text-center text-[10px] font-semibold text-primary transition-colors hover:bg-primary/10" }, "+", dayEvents.length - 4, " more"))
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
  const scrollContainerRef = React12__namespace.default.useRef(null);
  const [now, setNow] = React12__namespace.default.useState(/* @__PURE__ */ new Date());
  React12__namespace.default.useEffect(() => {
    const interval = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(interval);
  }, []);
  React12__namespace.default.useEffect(() => {
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
      } catch {
        acronym = "LOC";
      }
    } else {
      try {
        const zDate = dateFnsTz.toZonedTime(date, tz);
        displayTime = dateFns.format(zDate, "HH:mm");
        acronym = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "";
      } catch {
        displayTime = dateFns.format(date, "HH:mm");
        acronym = tz;
      }
    }
    return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-col items-center justify-center leading-tight" }, /* @__PURE__ */ React12__namespace.default.createElement("span", null, displayTime), /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-[10px] opacity-75" }, "(", acronym, ")"));
  };
  const timeFormat = locale?.code === "fr" ? "H:mm" : "h a";
  const eventTimeFormat = locale?.code === "fr" ? "H:mm" : "h:mm a";
  const nowFormat = locale?.code === "fr" ? "H:mm" : "h:mm";
  return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex h-full min-w-[800px] flex-col overflow-hidden rounded-2xl border-[0.5px] border-border/50 bg-background shadow-sm md:min-w-0" }, /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      ref: scrollContainerRef,
      className: "scrollbar-hide relative flex-1 overflow-y-auto scroll-smooth bg-background",
      style: { scrollbarGutter: "stable" }
    },
    /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "sticky top-0 z-20 flex border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/20 via-background to-muted/20 backdrop-blur-sm" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex w-16 flex-none items-center justify-center border-r-[0.5px] border-border/30 bg-muted/10 p-3 text-center text-xs font-semibold text-muted-foreground" }, getTimezoneDisplay(timezone)), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "grid flex-1 grid-cols-7" }, weekDays.map((day, index) => /* @__PURE__ */ React12__namespace.default.createElement(
      "div",
      {
        key: day.toISOString(),
        className: cn(
          "px-2 py-3 text-center",
          index > 0 && "border-l-[0.5px] border-border/30"
        )
      },
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" }, dateFns.format(day, "EEE", { locale })),
      /* @__PURE__ */ React12__namespace.default.createElement(
        "div",
        {
          className: cn(
            "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200",
            dateFns.isToday(day) ? "scale-110 bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-foreground hover:bg-accent/80"
          )
        },
        dateFns.format(day, "d", { locale })
      )
    )))),
    /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex min-w-full", style: { height: hours.length * hourHeight } }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative w-16 flex-none border-r-[0.5px] border-border/30 bg-muted/5" }, hours.map((hour) => /* @__PURE__ */ React12__namespace.default.createElement(
      "div",
      {
        key: hour,
        className: "relative box-border w-full pr-3 text-right text-[11px] font-medium tabular-nums text-muted-foreground/80",
        style: { height: hourHeight }
      },
      /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "block -translate-y-1/2" }, hour !== 0 && dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale }))
    ))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative grid flex-1 grid-cols-7" }, weekDays.map((day, dayIndex) => {
      const dayEvents = events.filter((e) => {
        const zonedStart = getZonedDate(e.start);
        return dateFns.isSameDay(zonedStart, day);
      });
      return /* @__PURE__ */ React12__namespace.default.createElement(
        "div",
        {
          key: day.toISOString(),
          className: cn(
            "relative h-full",
            dayIndex > 0 && "border-l-[0.5px] border-border/30"
          )
        },
        hours.map((hour) => {
          return /* @__PURE__ */ React12__namespace.default.createElement(
            "div",
            {
              key: hour,
              className: "relative box-border w-full border-b-[0.5px] border-dashed border-border/20",
              style: { height: hourHeight }
            },
            [0, 15, 30, 45].map((minute) => {
              const cellDate = new Date(day);
              cellDate.setHours(hour, minute, 0, 0);
              const cellId = cellDate.toISOString();
              return /* @__PURE__ */ React12__namespace.default.createElement(
                DroppableCell,
                {
                  key: minute,
                  id: cellId,
                  date: cellDate,
                  className: "absolute left-0 right-0 z-0 w-full transition-colors",
                  style: {
                    height: "25%",
                    top: `${minute / 60 * 100}%`
                  }
                },
                /* @__PURE__ */ React12__namespace.default.createElement(
                  "div",
                  {
                    className: "h-full w-full cursor-pointer bg-transparent",
                    onClick: () => onTimeSlotClick?.(cellDate)
                  }
                )
              );
            })
          );
        }),
        dayEvents.map((event) => {
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
          return /* @__PURE__ */ React12__namespace.default.createElement(
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
            /* @__PURE__ */ React12__namespace.default.createElement(
              "div",
              {
                className: cn(
                  "group relative overflow-hidden rounded-md border shadow-sm transition-all hover:shadow-md",
                  "glass",
                  readonly ? "cursor-default" : "cursor-grab active:cursor-grabbing",
                  !event.color && "border-primary/20 bg-primary/10",
                  isShortEvent ? "flex items-center justify-center px-1" : "p-2",
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
              /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex h-full w-full flex-col overflow-hidden" }, /* @__PURE__ */ React12__namespace.default.createElement(
                "div",
                {
                  className: cn(
                    "truncate font-semibold leading-tight text-foreground/90",
                    isShortEvent ? "text-center text-xs" : "text-xs"
                  )
                },
                event.title
              ), !isShortEvent && /* @__PURE__ */ React12__namespace.default.createElement(React12__namespace.default.Fragment, null, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mt-0.5 truncate text-[10px] font-medium leading-tight text-muted-foreground" }, dateFns.format(zonedEventStart, eventTimeFormat, { locale })), event.description && height > 50 && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mt-1 truncate text-[10px] font-normal text-[#4C4C56] opacity-80" }, event.description)), count > 1 && !isShortEvent && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background/80 text-[9px] font-bold text-muted-foreground shadow-sm backdrop-blur-sm" }, count))
            )
          );
        }),
        dateFns.isToday(day) && /* @__PURE__ */ React12__namespace.default.createElement(
          "div",
          {
            className: "pointer-events-none absolute left-0 right-0 z-20 flex items-center",
            style: {
              top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
            }
          },
          /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-[2px] w-full bg-gradient-to-r from-primary via-primary to-primary/50" }),
          /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "absolute -left-1.5 h-3 w-3 animate-pulse rounded-full bg-primary shadow-lg shadow-primary/40 ring-2 ring-background" })
        )
      );
    }))),
    /* @__PURE__ */ React12__namespace.default.createElement(
      "div",
      {
        className: "pointer-events-none absolute left-0 z-30 flex w-16 justify-end pr-2",
        style: {
          top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight + 80}px`
        }
      },
      /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "-translate-y-1/2 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground shadow-md backdrop-blur-none" }, dateFns.format(zonedNow, nowFormat, { locale }))
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
  readonly,
  translations
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourHeight = 80;
  const scrollContainerRef = React12__namespace.default.useRef(null);
  const [now, setNow] = React12__namespace.default.useState(/* @__PURE__ */ new Date());
  React12__namespace.default.useEffect(() => {
    const interval = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(interval);
  }, []);
  React12__namespace.default.useEffect(() => {
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
  return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex h-full flex-col overflow-hidden rounded-2xl border-[0.5px] border-border/50 bg-background shadow-sm" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "shrink-0 border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/20 via-background to-muted/20 px-6 py-4 text-center" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center justify-center gap-3" }, /* @__PURE__ */ React12__namespace.default.createElement("h2", { className: "text-xl font-semibold capitalize text-foreground" }, dateFns.format(currentDate, "EEEE, MMMM d, yyyy", { locale })), dateFns.isToday(currentDate) && /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20" }, translations?.today || "Today"))), /* @__PURE__ */ React12__namespace.default.createElement("div", { ref: scrollContainerRef, className: "relative flex-1 overflow-y-auto" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex", style: { height: hours.length * hourHeight } }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative w-20 border-r-[0.5px] border-border/30 bg-muted/5" }, hours.map((hour) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: hour, className: "relative w-full", style: { height: hourHeight } }, hour !== 0 && /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "absolute -top-3 left-1/2 w-full -translate-x-1/2 rounded-md bg-background px-1.5 py-0.5 text-center text-[11px] font-medium tabular-nums text-muted-foreground/80" }, dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale })))), dateFns.isToday(currentDate) && /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      className: "pointer-events-none absolute left-0 z-30 flex w-full justify-end pr-2",
      style: {
        top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
      }
    },
    /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "-translate-y-1/2 rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white shadow-md shadow-primary/30" }, dateFns.format(zonedNow, nowFormat, { locale }))
  )), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex-1" }, hours.map((hour) => {
    return /* @__PURE__ */ React12__namespace.default.createElement(
      "div",
      {
        key: hour,
        className: "relative box-border border-b-[0.5px] border-dashed border-border/20",
        style: { height: hourHeight }
      },
      [0, 15, 30, 45].map((minute) => {
        const cellDate = new Date(currentDate);
        cellDate.setHours(hour, minute, 0, 0);
        const cellId = cellDate.toISOString();
        return /* @__PURE__ */ React12__namespace.default.createElement(
          DroppableCell,
          {
            key: minute,
            id: cellId,
            date: cellDate,
            className: "absolute left-0 right-0 z-0 w-full transition-colors",
            style: {
              height: "25%",
              top: `${minute / 60 * 100}%`
            }
          },
          /* @__PURE__ */ React12__namespace.default.createElement(
            "div",
            {
              className: "h-full w-full cursor-pointer bg-transparent",
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
    return /* @__PURE__ */ React12__namespace.default.createElement(
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
      /* @__PURE__ */ React12__namespace.default.createElement(
        "div",
        {
          className: cn(
            "group h-full overflow-hidden rounded-lg border-[0.5px] shadow-sm transition-all hover:z-20 hover:shadow-lg",
            "glass backdrop-blur-sm",
            readonly ? "cursor-default" : "cursor-grab active:cursor-grabbing",
            !event.color && "border-primary/20 bg-primary/10",
            isShortEvent ? "flex items-center px-2" : "px-3 py-2",
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
        /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex h-full w-full flex-col overflow-hidden" }, /* @__PURE__ */ React12__namespace.default.createElement(
          "div",
          {
            className: cn(
              "truncate font-semibold leading-tight",
              isShortEvent ? "text-xs" : "text-sm",
              event.color ? "text-foreground" : "text-foreground/90"
            )
          },
          event.title
        ), !isShortEvent && /* @__PURE__ */ React12__namespace.default.createElement(React12__namespace.default.Fragment, null, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mt-0.5 text-xs font-medium text-muted-foreground" }, dateFns.format(zonedStart, eventTimeFormat, { locale })), event.description && height > 60 && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground/80" }, event.description)), count > 1 && !isShortEvent && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background/90 text-[10px] font-bold text-muted-foreground shadow-sm backdrop-blur-sm" }, count))
      )
    );
  }), dateFns.isToday(currentDate) && /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      className: "pointer-events-none absolute left-0 right-0 z-20 flex items-center",
      style: {
        top: `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
      }
    },
    /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-[2px] w-full bg-gradient-to-r from-primary via-primary to-primary/50" }),
    /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "absolute -left-1.5 h-3 w-3 animate-pulse rounded-full bg-primary shadow-lg shadow-primary/40 ring-2 ring-background" })
  )))));
};
var formatDuration = (start, end) => {
  const minutes = dateFns.differenceInMinutes(end, start);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
};
var AgendaView = ({
  currentDate,
  events,
  onEventClick,
  locale,
  translations
}) => {
  const getDateLabel = (date) => {
    if (dateFns.isToday(date)) return translations?.today || "Today";
    if (dateFns.isTomorrow(date)) return translations?.tomorrow || "Tomorrow";
    return dateFns.format(date, "EEEE", { locale });
  };
  const getEventCountLabel = (count) => {
    if (count === 1) {
      return `1 ${translations?.eventCount || "event"}`;
    }
    return `${count} ${translations?.eventsCount || "events"}`;
  };
  const getGuestCountLabel = (count) => {
    if (count === 1) {
      return `1 ${translations?.guestCount || "guest"}`;
    }
    return `${count} ${translations?.guestsCount || "guests"}`;
  };
  const groupedEvents = React12.useMemo(() => {
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
  return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex h-full flex-col overflow-y-auto bg-background" }, /* @__PURE__ */ React12__namespace.default.createElement(
    framerMotion.motion.div,
    {
      className: "mx-auto w-full max-w-3xl px-4 pb-10 md:px-6",
      variants: container,
      initial: "hidden",
      animate: "show"
    },
    groupedEvents.map((group) => /* @__PURE__ */ React12__namespace.default.createElement(framerMotion.motion.div, { key: group.date.toISOString(), className: "relative", variants: item }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "sticky top-0 z-10 border-b border-border/50 bg-background/95 py-4 backdrop-blur-md" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React12__namespace.default.createElement(
      "div",
      {
        className: cn(
          "flex h-16 w-16 flex-col items-center justify-center rounded-2xl transition-all",
          dateFns.isToday(group.date) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-muted/50 text-foreground"
        )
      },
      /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-2xl font-bold leading-none" }, dateFns.format(group.date, "d", { locale })),
      /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-xs font-medium uppercase tracking-wide opacity-80" }, dateFns.format(group.date, "MMM", { locale }))
    ), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React12__namespace.default.createElement(
      "span",
      {
        className: cn("text-lg font-semibold", dateFns.isToday(group.date) && "text-primary")
      },
      getDateLabel(group.date)
    ), /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-sm text-muted-foreground" }, getEventCountLabel(group.events.length))))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "space-y-3 py-4" }, group.events.map((event) => /* @__PURE__ */ React12__namespace.default.createElement(
      framerMotion.motion.div,
      {
        key: event.id,
        onClick: () => onEventClick?.(event),
        className: cn(
          "group relative flex gap-4 rounded-2xl border border-border/40 p-4",
          "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
          "cursor-pointer transition-all duration-200",
          "from-card via-card to-card/80 bg-gradient-to-br"
        ),
        whileHover: { scale: 1.01, y: -2 },
        transition: { duration: 0.2 }
      },
      /* @__PURE__ */ React12__namespace.default.createElement(
        "div",
        {
          className: "absolute bottom-3 left-0 top-3 w-1 rounded-full",
          style: { backgroundColor: event.color || "var(--primary)" }
        }
      ),
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex min-w-[70px] flex-col items-center pl-2" }, event.allDay ? /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "rounded-full bg-muted/80 px-2.5 py-1 text-xs font-semibold text-muted-foreground" }, translations?.allDay || "All Day")) : /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-base font-semibold text-foreground" }, dateFns.format(event.start, locale?.code === "fr" ? "H:mm" : "h:mm", {
        locale
      })), locale?.code !== "fr" && /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-xs uppercase text-muted-foreground" }, dateFns.format(event.start, "a", { locale })), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "my-1 h-3 w-px bg-border" }), /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-xs font-medium text-muted-foreground/70" }, formatDuration(event.start, event.end)))),
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "min-w-0 flex-1 space-y-2" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React12__namespace.default.createElement("h4", { className: "line-clamp-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary" }, event.title), /* @__PURE__ */ React12__namespace.default.createElement(
        "div",
        {
          className: "mt-1.5 h-3 w-3 shrink-0 rounded-full",
          style: { backgroundColor: event.color || "var(--primary)" }
        }
      )), event.description && /* @__PURE__ */ React12__namespace.default.createElement("p", { className: "line-clamp-2 text-sm leading-relaxed text-muted-foreground" }, event.description), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-wrap items-center gap-3 pt-1" }, !event.allDay && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Clock, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ React12__namespace.default.createElement("span", null, dateFns.format(event.start, locale?.code === "fr" ? "H:mm" : "h:mm a", {
        locale
      }))), event.guests && event.guests.length > 0 && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Users, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ React12__namespace.default.createElement("span", null, getGuestCountLabel(event.guests.length))), event.attachments && event.attachments.length > 0 && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Paperclip, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ React12__namespace.default.createElement("span", null, event.attachments.length)), event.reminders && event.reminders.length > 0 && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Bell, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ React12__namespace.default.createElement("span", null, event.reminders.length)))),
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" }, /* @__PURE__ */ React12__namespace.default.createElement(
        "svg",
        {
          className: "h-5 w-5 text-muted-foreground",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2"
        },
        /* @__PURE__ */ React12__namespace.default.createElement("path", { d: "M9 18l6-6-6-6" })
      ))
    )))))
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
  const containerRef = React12.useRef(null);
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
  return /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex h-full flex-col overflow-hidden bg-background" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex border-b border-border bg-muted/20" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "sticky left-0 z-20 w-48 shrink-0 border-r border-border bg-background p-4 text-sm font-semibold" }, "Resources"), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex overflow-hidden" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex", style: { width: hours.length * hourWidth } }, hours.map((hour) => /* @__PURE__ */ React12__namespace.default.createElement(
    "div",
    {
      key: hour,
      className: "shrink-0 border-r border-border/50 p-2 text-xs font-medium text-muted-foreground",
      style: { width: hourWidth }
    },
    dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale })
  ))))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex-1 overflow-auto", ref: containerRef }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "min-w-fit" }, resources.map((resource) => {
    const resourceEvents = events.filter(
      (e) => e.resourceId === resource.id && dateFns.isSameDay(new Date(e.start), currentDate)
    );
    return /* @__PURE__ */ React12__namespace.default.createElement("div", { key: resource.id, className: "flex min-h-[100px] border-b border-border" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "sticky left-0 z-10 flex w-48 shrink-0 items-center gap-3 border-r border-border bg-background p-4" }, resource.avatar ? (
      // eslint-disable-next-line @next/next/no-img-element
      /* @__PURE__ */ React12__namespace.default.createElement(
        "img",
        {
          src: resource.avatar,
          alt: resource.label,
          className: "h-8 w-8 rounded-full object-cover"
        }
      )
    ) : /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary" }, resource.label.substring(0, 2).toUpperCase()), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-sm font-medium" }, resource.label), /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "text-xs text-muted-foreground" }, "ID: ", resource.id))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex", style: { width: hours.length * hourWidth } }, hours.map((hour) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: hour, className: "flex h-full shrink-0", style: { width: hourWidth } }, [0, 15, 30, 45].map((minute) => {
      const slotDate = new Date(currentDate);
      slotDate.setHours(hour, minute, 0, 0);
      const slotId = `${resource.id}-${slotDate.toISOString()}`;
      return /* @__PURE__ */ React12__namespace.default.createElement(
        DroppableCell,
        {
          key: minute,
          id: slotId,
          date: slotDate,
          resourceId: resource.id,
          className: "h-full flex-1 border-r border-border/10 last:border-border/30",
          onClick: () => {
            onTimeSlotClick?.(slotDate, resource.id);
          }
        }
      );
    }))), resourceEvents.map((event) => /* @__PURE__ */ React12__namespace.default.createElement(
      DraggableEvent,
      {
        key: event.id,
        event,
        onClick: (e) => {
          e.stopPropagation();
          onEventClick?.(event);
        },
        className: "absolute bottom-2 top-2 z-10 cursor-pointer overflow-hidden rounded-md border px-2 py-1 text-xs font-medium shadow-sm transition-all hover:brightness-95",
        style: {
          ...getEventStyle(event),
          backgroundColor: event.color || resource.color || "var(--primary)",
          borderColor: "rgba(0,0,0,0.1)",
          color: "#fff"
        }
      },
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "truncate" }, event.title)
    ))));
  }))));
};
var Skeleton = ({
  className,
  style
}) => /* @__PURE__ */ React12__namespace.default.createElement("div", { className: cn("animate-pulse rounded bg-muted/40", className), style });
var MonthViewSkeleton = () => /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-full overflow-hidden rounded-2xl border border-border/50 bg-background" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "grid grid-cols-7 border-b border-border/50 bg-muted/10" }, Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: i, className: "border-r border-border/30 px-2 py-3 text-center last:border-r-0" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "mx-auto h-4 w-8" })))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "grid flex-1 grid-cols-7" }, Array.from({ length: 35 }).map((_, i) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: i, className: "min-h-[120px] border-b border-r border-border/30 p-2" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "mb-2 h-4 w-6" }), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "space-y-1" }, i % 2 === 0 && /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "h-5 w-full rounded-md" }), i % 3 === 0 && /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "h-5 w-3/4 rounded-md" }))))));
var WeekViewSkeleton = () => /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-full overflow-hidden rounded-2xl border border-border/50 bg-background" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex border-b border-border/50 bg-muted/10" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "w-16 border-r border-border/30 p-3" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "mx-auto h-8 w-10" })), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "grid flex-1 grid-cols-7" }, Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: i, className: "border-r border-border/30 px-2 py-3 text-center last:border-r-0" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "mx-auto mb-1 h-3 w-8" }), /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "mx-auto h-8 w-8 rounded-xl" }))))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-1", style: { height: "600px" } }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "w-16 border-r border-border/30" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: i, className: "relative h-[60px]" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "absolute right-2 h-4 w-10 -translate-y-1/2" })))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative grid flex-1 grid-cols-7" }, Array.from({ length: 7 }).map((_, colIdx) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: colIdx, className: "relative border-r border-border/30 last:border-r-0" }, Array.from({ length: 10 }).map((_2, rowIdx) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: rowIdx, className: "h-[60px] border-b border-dashed border-border/20" })), colIdx % 2 === 0 && /* @__PURE__ */ React12__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute rounded-md",
    style: {
      top: `${colIdx * 50 % 400}px`,
      left: "4px",
      right: "4px",
      height: `${60 + colIdx * 30 % 120}px`
    }
  }
))))));
var DayViewSkeleton = () => /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-full overflow-hidden rounded-2xl border border-border/50 bg-background" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "border-b border-border/50 bg-muted/10 px-6 py-4 text-center" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "mx-auto h-7 w-64" })), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-1", style: { height: "600px" } }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "w-20 border-r border-border/30 bg-muted/5" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: i, className: "relative h-[80px]" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "absolute left-1/2 h-4 w-12 -translate-x-1/2 -translate-y-1/2" })))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex-1" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: i, className: "h-[80px] border-b border-dashed border-border/20" })), /* @__PURE__ */ React12__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute left-4 right-4 rounded-lg",
    style: { top: "160px", height: "120px" }
  }
), /* @__PURE__ */ React12__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute left-4 right-4 rounded-lg",
    style: { top: "400px", height: "80px" }
  }
))));
var AgendaViewSkeleton = () => /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-full overflow-hidden rounded-2xl border border-border/50 bg-background p-6" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "space-y-6" }, Array.from({ length: 4 }).map((_, dayIdx) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: dayIdx }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "mb-4 h-5 w-40" }), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "space-y-3" }, Array.from({ length: 2 + dayIdx % 3 }).map((_2, eventIdx) => /* @__PURE__ */ React12__namespace.default.createElement("div", { key: eventIdx, className: "flex items-center gap-4 rounded-xl bg-muted/10 p-3" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "h-10 w-10 rounded-lg" }), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex-1 space-y-2" }, /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "h-4 w-3/4" }), /* @__PURE__ */ React12__namespace.default.createElement(Skeleton, { className: "h-3 w-1/2" })))))))));
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
  const menuRef = React12.useRef(null);
  React12.useEffect(() => {
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
  React12.useEffect(() => {
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
    ...onEdit ? [
      {
        id: "edit",
        label: translations?.edit || "Edit",
        icon: /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Edit3, { className: "h-4 w-4" }),
        onClick: () => {
          onEdit(event);
          onClose();
        }
      }
    ] : [],
    ...onDuplicate ? [
      {
        id: "duplicate",
        label: translations?.duplicate || "Duplicate",
        icon: /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Copy, { className: "h-4 w-4" }),
        onClick: () => {
          onDuplicate(event);
          onClose();
        }
      }
    ] : [],
    ...customActions,
    ...onDelete ? [
      {
        id: "delete",
        label: translations?.delete || "Delete",
        icon: /* @__PURE__ */ React12__namespace.default.createElement(lucideReact.Trash2, { className: "h-4 w-4" }),
        onClick: () => {
          onDelete(event.id);
          onClose();
        },
        variant: "danger"
      }
    ] : []
  ];
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 200),
    y: Math.min(position.y, window.innerHeight - (actions.length * 44 + 80))
  };
  return /* @__PURE__ */ React12__namespace.default.createElement(framerMotion.AnimatePresence, null, /* @__PURE__ */ React12__namespace.default.createElement(
    framerMotion.motion.div,
    {
      ref: menuRef,
      initial: { opacity: 0, scale: 0.95, y: -5 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: -5 },
      transition: { duration: 0.15, ease: "easeOut" },
      className: "fixed z-[100] min-w-[180px] overflow-hidden rounded-xl border-[0.5px] border-border bg-background shadow-xl",
      style: {
        left: adjustedPosition.x,
        top: adjustedPosition.y
      }
    },
    /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "border-b-[0.5px] border-border bg-muted/30 px-3 py-2" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React12__namespace.default.createElement(
      "div",
      {
        className: "h-2.5 w-2.5 shrink-0 rounded-full",
        style: { backgroundColor: event.color || "var(--primary)" }
      }
    ), /* @__PURE__ */ React12__namespace.default.createElement("span", { className: "truncate text-sm font-medium text-foreground" }, event.title))),
    /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "py-1" }, actions.map((action, index) => /* @__PURE__ */ React12__namespace.default.createElement(React12__namespace.default.Fragment, { key: action.id }, index > 0 && action.variant === "danger" && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "my-1 h-px bg-border" }), /* @__PURE__ */ React12__namespace.default.createElement(
      "button",
      {
        onClick: action.onClick,
        disabled: action.disabled,
        className: cn(
          "flex w-full items-center gap-3 px-3 py-2 text-sm transition-colors",
          action.disabled && "cursor-not-allowed opacity-50",
          action.variant === "danger" ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" : "text-foreground hover:bg-accent"
        )
      },
      action.icon,
      /* @__PURE__ */ React12__namespace.default.createElement("span", null, action.label)
    ))))
  ));
};
var useEventContextMenu = () => {
  const [contextMenu, setContextMenu] = React12.useState({ event: null, position: null });
  const openContextMenu = React12.useCallback((event, e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      event,
      position: { x: e.clientX, y: e.clientY }
    });
  }, []);
  const closeContextMenu = React12.useCallback(() => {
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
  const l = (max + min) / 2;
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
  onEventClick,
  onEventDrop,
  readOnly,
  timezone
}) => {
  const [internalView, setInternalView] = React12.useState("week");
  const [internalDate, setInternalDate] = React12.useState(/* @__PURE__ */ new Date());
  const [isSidebarOpen, setIsSidebarOpen] = React12.useState(true);
  const [isModalOpen, setIsModalOpen] = React12.useState(false);
  const [selectedEvent, setSelectedEvent] = React12.useState(null);
  const [modalInitialDate, setModalInitialDate] = React12.useState(void 0);
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
    if (onEventClick) {
      onEventClick(event);
    }
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
  const handleModalSave = () => {
  };
  const handleModalDelete = () => {
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
  const touchInfoRef = React12.useRef(null);
  const elementRef = React12.useRef(null);
  const handleTouchStart = React12.useCallback(
    (e) => {
      if (!enabled) return;
      const touch = e.touches[0];
      touchInfoRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now()
      };
    },
    [enabled]
  );
  const handleTouchEnd = React12.useCallback(
    (e) => {
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
    },
    [enabled, threshold, restraint, allowedTime, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]
  );
  React12.useEffect(() => {
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
  locale,
  // Date-fns locale
  newEventButton
}) => {
  const [activeDragEvent, setActiveDragEvent] = React12.useState(null);
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
    handleDragEnd
  } = useCalendarLogic({
    events,
    view: controlledView,
    onViewChange: controlledOnViewChange,
    date: controlledDate,
    onDateChange: controlledOnDateChange,
    onEventClick,
    onEventDrop,
    readOnly,
    timezone
  });
  const sidebarFeatureEnabled = sidebarConfig?.enabled ?? true;
  const sidebarVisible = controlledShowSidebar ?? internalSidebarOpen;
  const sidebarEnabled = sidebarFeatureEnabled && sidebarVisible;
  const handleSidebarToggle = React12.useCallback(() => {
    if (!sidebarFeatureEnabled) return;
    const newValue = !sidebarVisible;
    if (onSidebarToggle) {
      onSidebarToggle(newValue);
    } else {
      setInternalSidebarOpen(newValue);
    }
  }, [sidebarFeatureEnabled, sidebarVisible, onSidebarToggle, setInternalSidebarOpen]);
  const showMiniCalendar = sidebarConfig?.showMiniCalendar ?? true;
  const showCalendarFilters = sidebarConfig?.showCalendarFilters ?? true;
  const showTimezoneSelector = sidebarConfig?.showTimezoneSelector ?? true;
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
  const id = React12.useId();
  const swipeRef = useViewSwipe(handlePrev, handleNext, true);
  const t = {
    today: "Today",
    tomorrow: "Tomorrow",
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
    eventCount: "event",
    eventsCount: "events",
    guestCount: "guest",
    guestsCount: "guests",
    ...translations
  };
  const handleDragStart = (event) => {
    const { active } = event;
    const draggedEvent = expandedEvents.find((e) => e.id === String(active.id));
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
  const filteredEvents = React12.useMemo(() => {
    if (!calendars || calendars.length === 0) return expandedEvents;
    let activeCalendarIds;
    if ("items" in calendars[0]) {
      const sections = calendars;
      activeCalendarIds = sections.flatMap((section) => section.items).filter((item) => item.active !== false).map((item) => item.id);
    } else {
      const items = calendars;
      activeCalendarIds = items.filter((c) => c.active !== false).map((c) => c.id);
    }
    return expandedEvents.filter((e) => {
      if (!e.calendarId) return true;
      return activeCalendarIds.includes(e.calendarId);
    });
  }, [expandedEvents, calendars]);
  return /* @__PURE__ */ React12__namespace.default.createElement(
    core.DndContext,
    {
      id,
      sensors: dndSensors,
      onDragStart: handleDragStart,
      onDragEnd: onDragEndWrapper,
      modifiers: modifiers$1
    },
    /* @__PURE__ */ React12__namespace.default.createElement(
      "div",
      {
        className: cn("relative flex h-full bg-background text-foreground", className),
        style: getThemeStyles(theme)
      },
      sidebarEnabled && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex w-64 flex-shrink-0 border-r border-border/30" }, /* @__PURE__ */ React12__namespace.default.createElement(
        Sidebar,
        {
          currentDate,
          onDateChange: handleDateChange,
          onViewChange: handleViewChange,
          timezone,
          onTimezoneChange,
          className: "h-full w-full",
          calendars,
          onCalendarToggle,
          translations: t,
          showMiniCalendar,
          showCalendarFilters,
          showTimezoneSelector,
          locale
        }
      )),
      /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex flex-1 flex-col overflow-hidden" }, /* @__PURE__ */ React12__namespace.default.createElement(
        CalendarHeader,
        {
          currentDate,
          onPrev: handlePrev,
          onNext: handleNext,
          onToday: handleToday,
          view,
          onViewChange: handleViewChange,
          onMenuClick: handleSidebarToggle,
          isDarkMode,
          onThemeToggle,
          translations: t,
          hideViewSwitcher,
          hideLanguageSelector,
          hideDarkModeToggle,
          language,
          onLanguageChange,
          locale,
          newEventButton
        }
      ), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "relative flex flex-1 flex-col overflow-hidden" }, isLoading ? /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex-1 overflow-auto p-0 md:p-4" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-full min-w-full" }, view === "month" && /* @__PURE__ */ React12__namespace.default.createElement(MonthViewSkeleton, null), view === "week" && /* @__PURE__ */ React12__namespace.default.createElement(WeekViewSkeleton, null), view === "day" && /* @__PURE__ */ React12__namespace.default.createElement(DayViewSkeleton, null), view === "agenda" && /* @__PURE__ */ React12__namespace.default.createElement(AgendaViewSkeleton, null), view === "resource" && /* @__PURE__ */ React12__namespace.default.createElement(WeekViewSkeleton, null))) : /* @__PURE__ */ React12__namespace.default.createElement("div", { ref: swipeRef, className: "flex-1 touch-pan-y overflow-auto p-0 md:p-4" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "h-full min-w-full" }, /* @__PURE__ */ React12__namespace.default.createElement(framerMotion.AnimatePresence, { mode: "wait", initial: false }, /* @__PURE__ */ React12__namespace.default.createElement(
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
        view === "month" && /* @__PURE__ */ React12__namespace.default.createElement(
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
        view === "week" && /* @__PURE__ */ React12__namespace.default.createElement(
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
        view === "day" && /* @__PURE__ */ React12__namespace.default.createElement(
          DayView,
          {
            currentDate,
            events: filteredEvents,
            onEventClick: handleEventClickInternal,
            onTimeSlotClick: handleTimeSlotClick,
            timezone,
            locale,
            readonly: readOnly,
            translations: { today: t.today }
          }
        ),
        view === "agenda" && /* @__PURE__ */ React12__namespace.default.createElement(
          AgendaView,
          {
            currentDate,
            events: filteredEvents,
            onEventClick: handleEventClickInternal,
            locale,
            translations: {
              today: t.today,
              tomorrow: t.tomorrow,
              allDay: t.allDay,
              eventCount: t.eventCount,
              eventsCount: t.eventsCount,
              guestCount: t.guestCount,
              guestsCount: t.guestsCount
            }
          }
        ),
        view === "resource" && resources && /* @__PURE__ */ React12__namespace.default.createElement(
          ResourceView,
          {
            currentDate,
            events: filteredEvents,
            resources,
            onEventClick: handleEventClickInternal,
            onTimeSlotClick: (date) => {
              if (readOnly) return;
              handleTimeSlotClick(date);
            },
            locale
          }
        )
      )))))),
      /* @__PURE__ */ React12__namespace.default.createElement(
        EventContextMenu,
        {
          event: contextMenuEvent,
          position: contextMenuPosition,
          onClose: closeContextMenu,
          onEdit: (event) => {
            handleEventClickInternal(event);
            closeContextMenu();
          },
          onDelete: () => {
            closeContextMenu();
          },
          onDuplicate: () => {
            closeContextMenu();
          },
          translations: {
            edit: t.editEvent || "Edit",
            delete: t.delete || "Delete",
            duplicate: "Duplicate"
          }
        }
      ),
      /* @__PURE__ */ React12__namespace.default.createElement(core.DragOverlay, { dropAnimation: null }, activeDragEvent ? /* @__PURE__ */ React12__namespace.default.createElement(
        "div",
        {
          className: cn(
            "cursor-grabbing overflow-hidden rounded-lg border-2 shadow-2xl transition-transform",
            "backdrop-blur-sm",
            !activeDragEvent.color && "border-primary/60 bg-primary/90 text-primary-foreground"
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
        /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "flex h-full flex-col p-2.5" }, /* @__PURE__ */ React12__namespace.default.createElement(
          "div",
          {
            className: "absolute bottom-0 left-0 top-0 w-1 rounded-l-lg",
            style: { backgroundColor: activeDragEvent.color || "var(--primary)" }
          }
        ), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "pl-2" }, /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "truncate text-sm font-semibold" }, activeDragEvent.title), (view === "week" || view === "day") && getDragHeight() && getDragHeight() > 40 && /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "mt-0.5 flex items-center gap-1 text-xs opacity-80" }, /* @__PURE__ */ React12__namespace.default.createElement(
          "svg",
          {
            className: "h-3 w-3",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2"
          },
          /* @__PURE__ */ React12__namespace.default.createElement("circle", { cx: "12", cy: "12", r: "10" }),
          /* @__PURE__ */ React12__namespace.default.createElement("path", { d: "M12 6v6l4 2" })
        ), dateFns.format(activeDragEvent.start, "h:mm a"))), /* @__PURE__ */ React12__namespace.default.createElement("div", { className: "absolute bottom-1.5 right-1.5 opacity-60" }, /* @__PURE__ */ React12__namespace.default.createElement("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React12__namespace.default.createElement("circle", { cx: "9", cy: "5", r: "1.5" }), /* @__PURE__ */ React12__namespace.default.createElement("circle", { cx: "15", cy: "5", r: "1.5" }), /* @__PURE__ */ React12__namespace.default.createElement("circle", { cx: "9", cy: "12", r: "1.5" }), /* @__PURE__ */ React12__namespace.default.createElement("circle", { cx: "15", cy: "12", r: "1.5" }), /* @__PURE__ */ React12__namespace.default.createElement("circle", { cx: "9", cy: "19", r: "1.5" }), /* @__PURE__ */ React12__namespace.default.createElement("circle", { cx: "15", cy: "19", r: "1.5" }))))
      ) : null)
    )
  );
};

exports.Scheduler = Scheduler;
exports.cn = cn;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map