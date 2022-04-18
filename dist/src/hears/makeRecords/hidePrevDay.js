"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hidePrevDay = void 0;
const mongoose_1 = require("../../mongoose");
const hidePrevDay = async (ctx, next) => {
    const date = ctx.state.today;
    const prevDate = ctx.session.lastPurchaseDate;
    const message_id = ctx.session.lastMessageTable;
    const chat_id = ctx.user.id;
    if (message_id && prevDate && prevDate !== date) {
        const sum = await mongoose_1.User.getSumFromDate(chat_id, prevDate);
        await ctx.api.editMessageText(chat_id, message_id, `${date} - ${sum}`);
        ctx.session.lastMessageTable = undefined;
    }
    return next();
};
exports.hidePrevDay = hidePrevDay;
