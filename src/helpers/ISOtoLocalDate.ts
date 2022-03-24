import { DateTime } from '../types';

export const ISOtoLocalDate = (iso: string, timezone: number): DateTime => {
  const [year, month, day, hour, minute, seconds] = iso
    .replace(/\..+/, '')
    .replace(/[-T:]/g, '*')
    .split('*').map(e => +e);

  const [date, time] = new Date(
    year,
    month - 1,
    day,
    hour + timezone,
    minute,
    seconds)
    .toLocaleDateString('ru', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).split(', ');
  return { date, time };
};