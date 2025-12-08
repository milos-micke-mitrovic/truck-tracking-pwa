import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export function formatDate(date: Date | string, formatStr = 'PPP'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return 'Invalid date';
  }

  return format(dateObj, formatStr);
}

export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return 'Invalid date';
  }

  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function formatTime(date: Date | string): string {
  return formatDate(date, 'HH:mm');
}

export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'PPP HH:mm');
}
