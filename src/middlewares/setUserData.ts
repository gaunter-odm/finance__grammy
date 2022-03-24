import { NextFunction } from 'grammy';
import { CustomContext } from '../types';

export const setUserData = (ctx: CustomContext, next: NextFunction): Promise<void> => {
  // @ts-ignore
  const { id, username, first_name: name } = ctx.chat;
  ctx.user = { id, username, name };
  return next();
};

