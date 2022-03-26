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
      t.cell('Price', +record.price.toFixed(2), Table.number(2));
      t.newRow();
    }
    ctx.session.countPositions = count;

    t.total('Price', {
      printer: (sum, w) => Table.padLeft(`${Number(sum).toFixed(2)}`, w),
    });

    if (message_id) { // @ts-ignore
      return await ctx.api.editMessageText(ctx.user.id, message_id, `<pre>${t}</pre>`, { parse_mode: 'HTML' });
    } else {
      return await this.reply(`<pre>${t}</pre>`, { parse_mode: 'HTML' });
    }
  };
  return next();
};

function positionPrinter(position: string | undefined, width: number): string {
  let result = '';
  if (position && position.length >= 17) {
    position = position.substring(0, 14) + '...';
  } else {
    while (width--)
      result += '.';
  }
  return position ?? result;
}