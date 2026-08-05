import React, { useRef } from 'react';
import { format, Locale } from 'date-fns';
import { Button } from './ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Moon,
  Sun,
  CalendarDays,
  CalendarRange,
  Calendar,
  List,
  CalendarCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { ViewType } from '../types';
import { cn } from '../utils';
import { useIsWideHeader } from '../hooks/useMediaQuery';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
  onMenuClick?: () => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  translations: Record<string, string>;
  hideViewSwitcher?: boolean;
  hideLanguageSelector?: boolean;
  hideDarkModeToggle?: boolean;
  language?: 'en' | 'fr';
  onLanguageChange?: (lang: 'en' | 'fr') => void;
  locale?: Locale;
  newEventButton?: {
    label?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  showMobileSidebarCta?: boolean;
  mobileSidebarCtaLabel?: string;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
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
  newEventButton,
  showMobileSidebarCta,
  mobileSidebarCtaLabel,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isWide = useIsWideHeader(headerRef);
  // `handlePrev`/`handleNext` have no branch for the List view: it shows every
  // event regardless of `currentDate`. Same reasoning as the mini calendar,
  // which the Scheduler already hides for that view.
  const isDateNavigable = view !== 'list';

  const viewConfig = [
    {
      key: 'month',
      icon: CalendarDays,
    },
    {
      key: 'week',
      icon: CalendarRange,
    },
    {
      key: 'day',
      icon: Calendar,
    },
    {
      key: 'list',
      icon: List,
    },
  ] as const;
  const showIdeasCta = Boolean(showMobileSidebarCta && onMenuClick && !isWide);

  return (
    <div
      ref={headerRef}
      className="flex min-h-[64px] flex-col items-center justify-between gap-3 border-b-[0px] border-border/50 bg-[#F9F9FB] px-3 py-3 md:flex-row md:gap-0 md:px-5"
    >
      {/* Left Section: Menu, Navigation, Title */}
      <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-start">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Menu Button - hidden in reduced view (sidebar hidden) and when no menu action is provided */}
          {isWide && onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent/80 hover:text-foreground"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Current Date Display - the List view spans every event, so labelling
              it with a single month would describe a period it does not show. */}
          <div className="ml-2 md:ml-4">
            <h2 className="whitespace-nowrap text-lg font-semibold capitalize tracking-tight text-foreground md:text-xl">
              {isDateNavigable
                ? format(currentDate, 'MMMM yyyy', { locale })
                : translations.list}
            </h2>
          </div>

          {/* Today Button and Navigation Arrows - hidden in the List view, where
              they would render as controls that move nothing. */}
          {isDateNavigable && (
            <>
              {/* Today Button - icon only in reduced view, label when wide */}
              <Button
                variant="outline"
                size="icon"
                onClick={onToday}
                title={translations.today}
                className={cn(
                  'h-9 w-9 shrink-0 rounded-xl border-[0.5px] border-border/60 bg-[#EEEFF5] text-sm font-medium transition-all duration-200 hover:bg-[#E3E4EC]',
                  isWide && 'w-auto gap-2 px-4 pl-3'
                )}
              >
                <CalendarCheck className="h-4 w-4" />
                {isWide && <span>{translations.today}</span>}
              </Button>

              {/* Navigation Arrows */}
              <div className="flex items-center rounded-xl bg-muted/40 p-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrev}
                  className="h-8 w-8 rounded-lg transition-all duration-200 hover:bg-background/80"
                >
                  <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  className="h-8 w-8 rounded-lg transition-all duration-200 hover:bg-background/80"
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </>
          )}
        </div>

        {showIdeasCta && (
          <Button
            variant="outline"
            size="icon"
            onClick={onMenuClick}
            title={mobileSidebarCtaLabel || "Plus d'idées"}
            aria-label={mobileSidebarCtaLabel || "Plus d'idées"}
            className="h-10 w-10 shrink-0 rounded-xl border-none bg-[#EEEFF5] text-foreground transition-all duration-200 hover:bg-[#E3E4EC]"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Right Section: View Switcher & Theme Toggle — wrap when space is tight so CTA stays visible */}
      <div className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto md:gap-3">
        {/* Language Toggle */}
        {!hideLanguageSelector && onLanguageChange && language && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
            className="h-9 rounded-xl px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:bg-accent/80 hover:text-foreground"
          >
            {language}
          </Button>
        )}

        {/* Theme Toggle */}
        {!hideDarkModeToggle && onThemeToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl transition-all duration-200 hover:bg-accent/80"
            onClick={onThemeToggle}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        )}

        {/* View Switcher */}
        {!hideViewSwitcher && (
          <div className="flex items-center rounded-xl bg-[#EEEFF5] p-1 backdrop-blur-sm">
            {viewConfig.map(({ key, icon: Icon }) => (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => onViewChange(key)}
                title={translations[key]}
                className={cn(
                  'h-8 gap-1.5 rounded-lg px-2 text-xs transition-all duration-200',
                  isWide && 'px-3',
                  view === key
                    ? 'bg-white font-medium text-black shadow-sm'
                    : 'text-[#4C4C56] hover:bg-[#EEEFF5] hover:text-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {isWide && <span>{translations[key]}</span>}
              </Button>
            ))}
          </div>
        )}

        {/* New Event Button - icon only in reduced view, label when wide */}
        {newEventButton && (
          <Button
            variant="outline"
            size="icon"
            title={newEventButton.label}
            className={cn(
              'h-9 w-9 shrink-0 rounded-xl border-none bg-gradient-to-br from-[#7FDDF0] to-[#4FC3DE] text-sm font-medium text-foreground transition-all duration-200 hover:brightness-95',
              isWide && 'w-auto gap-2 px-5'
            )}
            onClick={newEventButton.onClick}
          >
            {newEventButton.icon}
            {isWide && <span>{newEventButton.label}</span>}
          </Button>
        )}
      </div>
    </div>
  );
};
