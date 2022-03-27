"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPrintTable = void 0;
const easy_table_1 = __importDefault(require("easy-table"));
const ISOtoLocalDate_1 = require("../helpers/ISOtoLocalDate");
const setPrintTable = (ctx, next) => {
    ctx.printOrEditTable = async function (records, message_id) {
        const { timezone } = ctx.session;
        const t = new easy_table_1.default;
        let count = 0;
        for (const record of records) {
            const { time } = (0, ISOtoLocalDate_1.ISOtoLocalDate)(record.date, timezone ?? 0);
            t.cell('№', ++count, easy_table_1.default.number());
            t.cell('Time', time);
            t.cell('Position', record.position, positionPrinter);
            t.cell('Price', +record.price.toFixed(2), easy_table_1.default.number(2));
            t.newRow();
        }
        ctx.session.countPositions = count;
        t.total('Price', {
            printer: (sum, w) => easy_table_1.default.padLeft(`${Number(sum).toFixed(2)}`, w),
        });
        if (message_id) { // @ts-ignore
            return await ctx.api.editMessageText(ctx.user.id, message_id, `<pre>${t}</pre>`, { parse_mode: 'HTML' });
        }
        else {
            return await this.reply(`<pre>${t}</pre>`, { parse_mode: 'HTML' });
        }
    };
    return next();
};
exports.setPrintTable = setPrintTable;
function positionPrinter(position, width) {
    let result = '';
    if (position && position.length >= 17) {
        position = position.substring(0, 14) + '...';
    }
    else {
        while (width--)
            result += '.';
    }
    return position ?? result;
}
