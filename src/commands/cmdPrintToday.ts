import { CustomContext } from '../types';
import { User } from '../mongoose';

export const cmdPrintToday = async (ctx: CustomContext) => {
  const date = ctx.state.today;
  const { id } = ctx.user;
  const records = await User.getRecords(id, date);

  if (!records || !records.length) return ctx.reply('Сегодня покупок нету');
  const { message_id } = await ctx.printOrEditTable(records);
  ctx.session.lastMessageTable = message_id;
};