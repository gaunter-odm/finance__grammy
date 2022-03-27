import { Context, SessionFlavor } from 'grammy';
import { Model } from 'mongoose';

export interface Record {
  date: string,
  position: string | undefined
  price: number,
  currency?: string
}

export interface User {
  id: number,
  name?: string,
  username?: string,
  currency?: string,
  created_at: string,
  timezone: number,
  records: Record[] | [],
}

export interface UserStatic extends Model<User> {
  pushRecords(id: number, records: Record[] | null): Promise<Record[] | void>;

  getTimeZone(id: number): Promise<number>;

  getRecords(id: number, date?: string): Promise<Record[] | undefined>;

  getSumFromDate(id: number, date: string): Promise<number>;
}

export interface SessionData {
  route: string;
  lastMessageTable: number | undefined;
  lastPurchaseDate: string | null;
  timezone: number | null;
  countPositions: number;
}

interface State {
  state: {
    UTC: string,
    today: string
  };
}

interface UserData {
  user: {
    id: number,
    name?: string,
    username?: string
  };
}

export interface DateTime {
  date: string,
  time: string
}

interface PrintTable {
  printOrEditTable(records: Record[], message_id?: number): Promise<Message.TextMessage>;
}

export type CustomContext = Context & SessionFlavor<SessionData> & State & UserData & PrintTable;