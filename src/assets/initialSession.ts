import { SessionData } from '../types';

export const initialSession = (): SessionData => ({
  route: '',
  lastMessageTable: undefined,
  timezone: null,
  countPositions: 0
});