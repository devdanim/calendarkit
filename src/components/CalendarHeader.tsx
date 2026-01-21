import React from 'react';
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
  ListTodo,
} from 'lucide-react';
import { ViewType } from '../types';
import { cn } from '../utils';

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
}) => {
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
      key: 'agenda',
      icon: ListTodo,
    },
  ] as const;

  return (
    <div className="flex min-h-[64px] flex-col items-center justify-between gap-3 border-b-[0px] border-border/50 bg-gradient-to-r from-background via-background to-muted/20 px-3 py-3 md:flex-row md:gap-0 md:px-5">
      {/* Left Section: Menu, Navigation, Title */}
      <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-start">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-10 w-10 rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent/80 hover:text-foreground md:inline-flex"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Today Button */}
          <Button
            variant="outline"
            onClick={onToday}
            className="hidden h-9 rounded-xl border-[0.5px] border-border/60 px-5 text-sm font-medium transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:inline-flex"
          >
            {translations.today}
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

          {/* Current Date Display */}
          <div className="ml-2 md:ml-4">
            <h2 className="whitespace-nowrap text-lg font-semibold capitalize tracking-tight text-foreground md:text-xl">
              {format(currentDate, 'MMMM yyyy', { locale })}
            </h2>
          </div>
        </div>
      </div>

      {/* Right Section: View Switcher & Theme Toggle */}
      <div className="flex w-full items-center justify-end gap-2 md:w-auto md:gap-3">
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
          <div className="flex items-center rounded-xl bg-muted/50 p-1 backdrop-blur-sm">
            {viewConfig.map(({ key, icon: Icon }) => (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => onViewChange(key)}
                className={cn(
                  'h-8 gap-1.5 rounded-lg px-3 text-xs transition-all duration-200',
                  view === key
                    ? 'border-[0.5px] border-border/50 bg-background font-medium text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{translations[key]}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
