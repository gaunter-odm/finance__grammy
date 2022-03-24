import { CustomContext } from '../types';
import { rawStringToRecords } from '../helpers/rawStringToRecords';
import { User } from '../mongoose';

export const makeRecords = async (ctx: CustomContext) => {
  const { id } = ctx.user;
  const records = rawStringToRecords(ctx.msg?.text);
  const res = await User.pushRecords(id, records);
  const last = ctx.session.lastMessageTable;
  // @ts-ignore
  const { message_id } = await ctx.printOrEditTable(res, last);
  setTimeout(() => ctx.deleteMessage(), 1000)
  if (!last && message_id) ctx.session.lastMessageTable = message_id;
};