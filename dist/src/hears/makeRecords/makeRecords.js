"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRecords = void 0;
const rawStringToRecords_1 = require("../../helpers/rawStringToRecords");
const mongoose_1 = require("../../mongoose");
const makeRecords = async (ctx) => {
    const last = ctx.session.lastMessageTable;
    const { id } = ctx.user;
    const records = await mongoose_1.User.pushRecords(id, (0, rawStringToRecords_1.rawStringToRecords)(ctx.msg?.text));
    if (!records)
        return;
    const { message_id } = await ctx.printOrEditTable(records, last);
    setTimeout(() => ctx.deleteMessage(), 500);
    if (!last && message_id)
        ctx.session.lastMessageTable = message_id;
    ctx.session.lastPurchaseDate = ctx.state.today;
};
exports.makeRecords = makeRecords;
