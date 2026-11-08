import { business, type DayHours, type Weekday } from '../data/site';

const weekdayFormatter = new Intl.DateTimeFormat('en-CA', {
  weekday: 'long',
  timeZone: 'America/Toronto',
});

export function getTorontoWeekday(date: Date = new Date()): Weekday {
  return weekdayFormatter.format(date) as Weekday;
}

export function getTodayHours(date: Date = new Date()): DayHours {
  const today = getTorontoWeekday(date);
  return (
    business.hours.find((entry) => entry.day === today) ?? business.hours[0]
  );
}

export function formatTodayHours(date: Date = new Date()): string {
  const today = getTodayHours(date);
  return `${today.open} – ${today.close}`;
}

export function isToday(day: Weekday, date: Date = new Date()): boolean {
  return getTorontoWeekday(date) === day;
}
