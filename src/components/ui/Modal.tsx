import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  hideHeader = false,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Render inside parent container (absolute positioning) instead of portal to document.body
  return (
    <div className="animate-in fade-in absolute inset-0 z-50 flex items-center justify-center bg-primary/40 p-4 backdrop-blur-md duration-300">
      <div ref={overlayRef} className="absolute inset-0" onClick={onClose} />
      <div
        className={cn(
          'animate-in zoom-in-95 slide-in-from-bottom-4 relative flex max-h-[70vh] w-full max-w-md flex-col rounded-2xl border border-border/50 bg-background shadow-2xl duration-300 sm:max-h-[80vh]',
          className
        )}
      >
        {!hideHeader && (
          <div className="flex shrink-0 items-center justify-between border-b border-border/50 bg-gradient-to-r from-muted/20 to-background px-6 py-4">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-9 w-9 rounded-xl p-0 transition-all duration-200 hover:bg-accent/80"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        )}
        <div className={cn('flex-1 overflow-y-auto', !hideHeader && 'p-6')}>{children}</div>
      </div>
    </div>
  );
};
