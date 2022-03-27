"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmdStart = void 0;
const mongoose_1 = require("../mongoose");
const cmdStart = async (ctx) => {
    const { id, name, username } = ctx.user;
    const user = new mongoose_1.User({ id, name, username });
    try {
        await user.save();
        await ctx.reply('Добро пожаловать!');
    }
    catch (e) {
        const { id } = e.keyPattern;
        if (id)
            await ctx.reply('С возвращением!');
    }
};
exports.cmdStart = cmdStart;
