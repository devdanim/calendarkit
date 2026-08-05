import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '../../utils';
import { isPastDate } from '../../lib/date';

interface DroppableCellProps {
  id: string; // usually ISO date string
  date: Date;
  resourceId?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  /**
   * Extra `data-*` attributes forwarded to the cell element. Lets a host app
   * anchor end-to-end tests on the cell without coupling them to internal
   * class names or to the cell's position in the grid.
   */
  dataAttributes?: Record<string, string>;
}

export const DroppableCell: React.FC<DroppableCellProps> = ({
  id,
  date,
  resourceId,
  children,
  className,
  style,
  onClick,
  dataAttributes,
}) => {
  const isPast = isPastDate(date);

  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { date, resourceId },
    disabled: isPast,
  });

  // Determine quarter based on minutes for graduated coloring (active drag state only)
  const minutes = date.getMinutes();
  const activeQuarterClass =
    minutes === 0
      ? 'bg-blue-50/50 dark:bg-blue-900/10 ring-2 ring-primary ring-inset'
      : minutes === 15
        ? 'bg-blue-50/80 dark:bg-blue-900/20 ring-2 ring-primary ring-inset'
        : minutes === 30
          ? 'bg-blue-100/50 dark:bg-blue-900/30 ring-2 ring-primary ring-inset'
          : 'bg-blue-100/80 dark:bg-blue-900/40 ring-2 ring-primary ring-inset';

  return (
    <div
      ref={setNodeRef}
      className={cn(
        className,
        isOver && !isPast && activeQuarterClass,
        isPast &&
          'pointer-events-auto cursor-not-allowed !bg-gray-100 text-muted-foreground/80 dark:!bg-gray-700/90 [&_*]:pointer-events-none'
      )}
      style={style}
      onClick={isPast ? undefined : onClick}
      {...dataAttributes}
    >
      {children}
    </div>
  );
};
