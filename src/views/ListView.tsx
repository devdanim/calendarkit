import React, { useMemo, useState } from 'react';
import { format, Locale } from 'date-fns';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { CalendarEvent, ListColumn, ListSortOption, ListViewConfig } from '../types';
import { cn } from '../utils';

interface ListViewProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  locale?: Locale;
  readonly?: boolean;
  config?: ListViewConfig;
  translations?: {
    sortBy?: string;
    mostRecent?: string;
    oldest?: string;
    noEvents?: string;
    title?: string;
    date?: string;
  };
}

const DEFAULT_PAGE_SIZE = 12;

const alignClass = (align?: ListColumn['align']) =>
  align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

export const ListView: React.FC<ListViewProps> = ({
  events,
  onEventClick,
  locale,
  readonly,
  config,
  translations,
}) => {
  const showSort = config?.showSort ?? true;
  const showPagination = config?.showPagination ?? true;
  const pageSize = config?.pageSize ?? DEFAULT_PAGE_SIZE;

  // Extract sub-values into locals so memo dependencies stay precise.
  const providedColumns = config?.columns;
  const providedSortOptions = config?.sortOptions;
  const titleLabel = translations?.title;
  const dateLabel = translations?.date;
  const mostRecentLabel = translations?.mostRecent;
  const oldestLabel = translations?.oldest;

  // Default columns when the consumer doesn't provide any — keeps the library
  // usable out of the box, while real apps inject domain-specific columns.
  const columns: ListColumn[] = useMemo(() => {
    if (providedColumns && providedColumns.length > 0) return providedColumns;
    return [
      {
        key: 'title',
        header: titleLabel || 'Title',
        render: (event) => (
          <span className="truncate font-medium text-foreground">{event.title}</span>
        ),
      },
      {
        key: 'date',
        header: dateLabel || 'Date',
        render: (event) => (
          <span className="text-muted-foreground">{format(event.start, 'P', { locale })}</span>
        ),
      },
    ];
  }, [providedColumns, titleLabel, dateLabel, locale]);

  // Default sort options: most recent first, then oldest.
  const sortOptions: ListSortOption[] = useMemo(() => {
    if (providedSortOptions && providedSortOptions.length > 0) return providedSortOptions;
    return [
      {
        key: 'recent',
        label: mostRecentLabel || 'Most recent',
        comparator: (a, b) => b.start.getTime() - a.start.getTime(),
      },
      {
        key: 'oldest',
        label: oldestLabel || 'Oldest',
        comparator: (a, b) => a.start.getTime() - b.start.getTime(),
      },
    ];
  }, [providedSortOptions, mostRecentLabel, oldestLabel]);

  const [sortKey, setSortKey] = useState<string>(
    config?.defaultSortKey || sortOptions[0]?.key || 'recent'
  );
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(0);

  const activeSort = sortOptions.find((option) => option.key === sortKey) || sortOptions[0];

  const sortedEvents = useMemo(() => {
    const list = [...events];
    if (activeSort?.comparator) list.sort(activeSort.comparator);
    return list;
  }, [events, activeSort]);

  const usePagination = showPagination && pageSize > 0;
  const pageCount = usePagination ? Math.max(1, Math.ceil(sortedEvents.length / pageSize)) : 1;
  const safePage = Math.min(page, pageCount - 1);
  const pagedEvents = usePagination
    ? sortedEvents.slice(safePage * pageSize, safePage * pageSize + pageSize)
    : sortedEvents;

  const goToPage = (next: number) => {
    setPage(Math.max(0, Math.min(next, pageCount - 1)));
  };

  const hasActions = Boolean(config?.renderActions);
  const columnCount = columns.length + (hasActions ? 1 : 0);

  return (
    <div className="flex h-full min-w-0 flex-col gap-4 overflow-y-auto overflow-x-hidden bg-[#F9F9FB] px-2 pb-6 md:px-4">
      {/* Sort bar */}
      {showSort && (
        <div className="relative w-full">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            className="flex w-full items-center justify-between rounded-2xl border border-border/60 bg-white px-4 py-2.5 text-left transition-all duration-200 hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <span className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                {translations?.sortBy || 'Sort by'}
              </span>
              <span className="text-sm font-medium text-foreground">{activeSort?.label}</span>
            </span>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-muted-foreground transition-transform duration-200',
                sortOpen && 'rotate-180'
              )}
            />
          </button>

          {sortOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
              <div className="animate-in fade-in zoom-in-95 absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border/60 bg-white p-1.5 shadow-2xl duration-200">
                {sortOptions.map((option) => (
                  <div
                    key={option.key}
                    className={cn(
                      'cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
                      option.key === sortKey
                        ? 'bg-primary font-semibold text-primary-foreground'
                        : 'text-foreground hover:bg-accent/80'
                    )}
                    onClick={() => {
                      setSortKey(option.key);
                      setSortOpen(false);
                      setPage(0);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Table */}
      <div className="min-w-0 flex-1 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                    alignClass(column.align),
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
              {hasActions && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody>
            {pagedEvents.length === 0 ? (
              <tr>
                <td
                  colSpan={columnCount}
                  className="px-4 py-16 text-center text-sm text-muted-foreground"
                >
                  {translations?.noEvents || 'No events'}
                </td>
              </tr>
            ) : (
              pagedEvents.map((event) => (
                <tr
                  key={event.id}
                  onClick={() => {
                    if (readonly) return;
                    onEventClick?.(event);
                  }}
                  className={cn(
                    'border-b border-border/40 bg-white transition-colors',
                    readonly ? 'cursor-default' : onEventClick && 'cursor-pointer hover:bg-muted/30'
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'border-b border-border/40 px-4 py-3 text-sm text-foreground',
                        alignClass(column.align),
                        column.className
                      )}
                    >
                      {column.render ? column.render(event) : event.title}
                    </td>
                  ))}
                  {hasActions && (
                    <td
                      className="border-b border-border/40 px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {config?.renderActions?.(event)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {usePagination && pageCount > 1 && (
        <div className="flex items-center justify-center gap-1">
          <PaginationButton
            onClick={() => goToPage(0)}
            disabled={safePage === 0}
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationButton>
          <PaginationButton
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 0}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>

          {Array.from({ length: pageCount }).map((_, index) => (
            <PaginationButton
              key={index}
              onClick={() => goToPage(index)}
              active={index === safePage}
            >
              {index + 1}
            </PaginationButton>
          ))}

          <PaginationButton
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === pageCount - 1}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
          <PaginationButton
            onClick={() => goToPage(pageCount - 1)}
            disabled={safePage === pageCount - 1}
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationButton>
        </div>
      )}
    </div>
  );
};

const PaginationButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
> = ({ active, className, children, ...props }) => (
  <button
    type="button"
    className={cn(
      'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition-all duration-200',
      active
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground',
      'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
      className
    )}
    {...props}
  >
    {children}
  </button>
);
