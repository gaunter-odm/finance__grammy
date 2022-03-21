import { Context } from 'vm';
import { NextFunction } from 'grammy';
import { ISOData } from '../helpers/ISOData';

export const setState = (ctx: Context, next: NextFunction): Promise<void> => {
  ctx.state = {};
  ctx.state.iso = ISOData();
  ctx.state.today = new Date().toLocaleDateString('ru');
  return next();
};