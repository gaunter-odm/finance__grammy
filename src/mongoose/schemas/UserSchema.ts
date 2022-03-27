import { Schema } from 'mongoose';
import { Record, User as UModel, UserStatic } from '../../types';
import { ISOData } from '../../helpers/ISOData';
import { recordSchema } from './RecordSchema';
import { ISOtoLocalDate } from '../../helpers/ISOtoLocalDate';

export const userSchema = new Schema<UModel, UserStatic>({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  username: String,
  currency: String,
  timezone: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: String,
    default: ISOData(),
  },
  records: {
    type: [recordSchema],
    default: [],
  },
});

userSchema.static('pushRecords', async function(id: number, records: Record[] | null): Promise<Record[] | void> {
    if (!records) return;
    const user = await this.findOne({ id });
    if (!user) return;
    for (const record of records) { // @ts-ignore
      user.records.push(record);
    }
    await user.save();
    const timezone = user.timezone ?? 0;
    const { date: today } = ISOtoLocalDate(ISOData(), timezone);
    return user.records.filter(({ date }) => ISOtoLocalDate(date, timezone).date === today);
  },
);

userSchema.static('getTimeZone', async function(id: number): Promise<number | undefined> {
  const user = await this.findOne({ id });
  return user?.timezone;
});

userSchema.static('getRecords', async function(id: number, date?: string): Promise<Record[] | undefined> {
  const user = await this.findOne({ id });
  if (date) {
    const timezone = user?.timezone ?? 0;
    return user?.records?.filter(record => {
      const { date: rDate } = ISOtoLocalDate(record.date, timezone);
      return rDate === date;
    });
  } else {
    return user?.records;
  }
});


userSchema.static('getSumFromDate', async function(id: number, date: string): Promise<number> {
  let sum = 0;
  const user = await this.findOne({ id });
  user?.records.forEach(record => {
    if (ISOtoLocalDate(record.date, user.timezone ?? 0)?.date === date) {
      sum += record.price;
    }
  });
  return sum;
});