import { CalendarEvent } from '../types';
import { format } from 'date-fns';

// Format date for ICS (YYYYMMDDTHHMMSSZ)
const formatDateForICS = (date: Date): string => {
  return format(date, "yyyyMMdd'T'HHmmss'Z'");
};

// Format date for all-day events (YYYYMMDD)
const formatDateForICSAllDay = (date: Date): string => {
  return format(date, 'yyyyMMdd');
};

// Escape special characters in ICS text fields
const escapeICSText = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
};

// Fold lines longer than 75 characters (ICS spec)
const foldLine = (line: string): string => {
  const maxLength = 75;
  if (line.length <= maxLength) return line;

  let result = '';
  let currentLine = line;

  while (currentLine.length > maxLength) {
    result += currentLine.substring(0, maxLength) + '\r\n ';
    currentLine = currentLine.substring(maxLength);
  }
  result += currentLine;

  return result;
};

// Generate ICS content from events
export const generateICS = (
  events: CalendarEvent[],
  calendarName: string = 'Scheduler Pro'
): string => {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Scheduler Pro//EN',
    `X-WR-CALNAME:${escapeICSText(calendarName)}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  events.forEach((event) => {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.id}@schedulerpro`);
    lines.push(`DTSTAMP:${formatDateForICS(new Date())}`);

    if (event.allDay) {
      lines.push(`DTSTART;VALUE=DATE:${formatDateForICSAllDay(event.start)}`);
      lines.push(`DTEND;VALUE=DATE:${formatDateForICSAllDay(event.end)}`);
    } else {
      lines.push(`DTSTART:${formatDateForICS(event.start)}`);
      lines.push(`DTEND:${formatDateForICS(event.end)}`);
    }

    lines.push(`SUMMARY:${escapeICSText(event.title)}`);

    if (event.description) {
      lines.push(`DESCRIPTION:${escapeICSText(event.description)}`);
    }

    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  // Fold long lines and join
  return lines.map(foldLine).join('\r\n');
};

// Download ICS file
export const downloadICS = (events: CalendarEvent[], filename: string = 'calendar.ics'): void => {
  const icsContent = generateICS(events);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Parse ICS content into events
export const parseICS = (icsContent: string): Partial<CalendarEvent>[] => {
  const events: Partial<CalendarEvent>[] = [];
  const lines = icsContent.split(/\r?\n/);

  // Unfold lines (lines starting with space/tab are continuations)
  const unfoldedLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(' ') || lines[i].startsWith('\t')) {
      if (unfoldedLines.length > 0) {
        unfoldedLines[unfoldedLines.length - 1] += lines[i].substring(1);
      }
    } else {
      unfoldedLines.push(lines[i]);
    }
  }

  let currentEvent: Partial<CalendarEvent> | null = null;

  for (const line of unfoldedLines) {
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {
        id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
    } else if (line === 'END:VEVENT' && currentEvent) {
      if (currentEvent.title && currentEvent.start) {
        // Set default end time if not provided
        if (!currentEvent.end) {
          currentEvent.end = new Date(currentEvent.start.getTime() + 60 * 60 * 1000); // 1 hour default
        }
        events.push(currentEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;

      const key = line.substring(0, colonIndex);
      const value = line.substring(colonIndex + 1);
      const unescapedValue = value
        .replace(/\\n/g, '\n')
        .replace(/\\,/g, ',')
        .replace(/\\;/g, ';')
        .replace(/\\\\/g, '\\');

      // Handle different properties
      if (key === 'SUMMARY') {
        currentEvent.title = unescapedValue;
      } else if (key === 'DESCRIPTION') {
        currentEvent.description = unescapedValue;
      } else if (key === 'UID') {
        // Use UID as part of the id for deduplication
        currentEvent.id = `imported-${unescapedValue.replace(/[^a-zA-Z0-9-_]/g, '')}`;
      } else if (key.startsWith('DTSTART')) {
        currentEvent.start = parseICSDate(key, value);
        if (key.includes('VALUE=DATE')) {
          currentEvent.allDay = true;
        }
      } else if (key.startsWith('DTEND')) {
        currentEvent.end = parseICSDate(key, value);
      }
    }
  }

  return events;
};

// Parse ICS date string
const parseICSDate = (key: string, value: string): Date => {
  // Remove any parameters from the value
  const dateStr = value.replace(/[^0-9TZ]/g, '');

  // Check if it's an all-day event (YYYYMMDD format)
  if (key.includes('VALUE=DATE') || dateStr.length === 8) {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
  }

  // Full datetime format (YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ)
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));
  const hour = parseInt(dateStr.substring(9, 11)) || 0;
  const minute = parseInt(dateStr.substring(11, 13)) || 0;
  const second = parseInt(dateStr.substring(13, 15)) || 0;

  if (dateStr.endsWith('Z')) {
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }

  return new Date(year, month, day, hour, minute, second);
};

// Read file and parse ICS
export const importICSFile = (file: File): Promise<Partial<CalendarEvent>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const events = parseICS(content);
        resolve(events);
      } catch {
        reject(new Error('Failed to parse ICS file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};
