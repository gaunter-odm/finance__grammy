import { CustomContext } from '../../types';
import { NextFunction } from 'grammy';
import { User } from '../../mongoose';

export const hidePrevDay = async (ctx: CustomContext, next: NextFunction): Promise<void> => {
  const date = ctx.state.today;
  const prevDate = ctx.session.lastPurchaseDate;
  const message_id = ctx.session.lastMessageTable;
  const chat_id = ctx.user.id;

  if (message_id && prevDate && prevDate !== date) {
    const sum = await User.getSumFromDate(chat_id, date);
    await ctx.api.editMessageText(chat_id, message_id, `${date} - ${sum}`);
    ctx.session.lastMessageTable = undefined;
  }
  return next();
};