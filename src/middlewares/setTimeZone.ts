import { CustomContext } from '../types';
import { NextFunction } from 'grammy';
import { User } from '../mongoose';

export const setTimeZone = async (ctx: CustomContext, next: NextFunction): Promise<void> => {
  if (!ctx.session.timezone)
    ctx.session.timezone = await User.getTimeZone(ctx.user.id);
  return next();
};