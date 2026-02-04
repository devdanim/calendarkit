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
}

export const DroppableCell: React.FC<DroppableCellProps> = ({
  id,
  date,
  resourceId,
  children,
  className,
  style,
  onClick,
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
          'cursor-not-allowed !bg-gray-100 dark:!bg-gray-700/90 text-muted-foreground/80 pointer-events-auto [&_*]:pointer-events-none'
      )}
      style={style}
      onClick={isPast ? undefined : onClick}
    >
      {children}
    </div>
  );
};
