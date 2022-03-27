"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmdPrintToday = void 0;
const mongoose_1 = require("../mongoose");
const cmdPrintToday = async (ctx) => {
    const date = ctx.state.today;
    const { id } = ctx.user;
    const records = await mongoose_1.User.getRecords(id, date);
    if (!records || !records.length)
        return ctx.reply('Сегодня покупок нету');
    const { message_id } = await ctx.printOrEditTable(records);
    ctx.session.lastMessageTable = message_id;
};
exports.cmdPrintToday = cmdPrintToday;
