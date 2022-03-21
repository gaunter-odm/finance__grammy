import { Record } from '../types';
import { name_and_price } from '../regexp';
import { ISOData } from './ISOData';

export const rawStringToRecords = (raw: string | undefined): Record[] | null => {
  if (!raw) return null;
  // @ts-ignore
  const rawRecords: Array<string> = raw.split('\n').map(str => str.replace(/\s+/g, ' '));
  const records: Record[] = [];
  const date = ISOData();

  for (const str of rawRecords) {
    console.log(str);
    const result = name_and_price.exec(str);
    if (result) {
      // @ts-ignore
      const { position, price } = result.groups;
      records.push({ position, price, date });
    }
  }
  return records;
};