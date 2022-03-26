import { SessionData } from '../types';

export const initialSession = (): SessionData => ({
  route: '',
  lastMessageTable: undefined,
  lastPurchaseDate: null,
  timezone: null,
  countPositions: 0
});