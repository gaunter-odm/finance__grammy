import { CustomContext } from '../types';
import { NextFunction } from 'grammy';
import Table from 'easy-table';
import { ISOtoLocalDate } from '../helpers/ISOtoLocalDate';

export const setPrintTable = (ctx: CustomContext, next: NextFunction): Promise<void> => {
  ctx.printOrEditTable = async function(records, message_id) {
    const { timezone } = ctx.session;
    const t = new Table;
    let count = 0;

    for (const record of records) {
      const { time } = ISOtoLocalDate(record.date, timezone ?? 0);
      t.cell('№', ++count, Table.number());
      t.cell('Time', time);
      t.cell('Position', record.position, positionPrinter);
      t.cell('Price', +record.price.toFixed(2), Table.number());
      t.newRow();
    }
    ctx.session.countPositions = count;

    t.total('Price');

    if (message_id) { // @ts-ignore
      return await ctx.api.editMessageText(ctx.user.id, message_id, `<pre>${t}</pre>`, { parse_mode: 'HTML' });
    } else {
      return await this.reply(`<pre>${t}</pre>`, { parse_mode: 'HTML' });
    }
  };
  return next();
};

function positionPrinter(val: string | undefined, width: number): string {
  let result = '';
  while (!val && width--)
    result += '.';
  return val ?? result;
}