import { Context, SessionFlavor } from 'grammy';

export interface Record {
  date: string,
  position: string | undefined
  price: number,
  currency?: string
}

interface State {
  state: {
    iso: string,
    date :string
  };
}

export type CustomContext = Context & SessionFlavor<SessionData> & State;
console.log(CustomContext);