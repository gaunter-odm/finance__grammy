import { NextFunction } from 'grammy';
import type { CustomContext } from '../types';
import { ISOData } from '../helpers/ISOData';
import { ISOtoLocalDate } from '../helpers/ISOtoLocalDate';

export const setState = (ctx: CustomContext, next: NextFunction): Promise<void> => {
  const UTC = ISOData();
  const { timezone } = ctx.session;
  const { date: today } = ISOtoLocalDate(UTC, timezone ?? 0);
  ctx.state = {
    UTC,
    today,
  };
  return next();
};