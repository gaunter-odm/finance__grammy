"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmdAuth = void 0;
const mongoose_1 = require("../mongoose");
const grammy_1 = require("grammy");
const cmdAuth = async (ctx) => {
    const { id } = ctx.user;
    const getUser = await mongoose_1.User.findOne({ id });
    if (!getUser)
        return;
    const user = getUser._id;
    const magikLink = new mongoose_1.MagikLink({ user });
    await magikLink.save();
    const { magik } = magikLink;
    const { message_id } = await ctx.reply('Ссылка для авторизации действительна 5 минут', {
        reply_markup: new grammy_1.InlineKeyboard()
            .url('Авторизироваться', `www.google.com/${magik}`),
    });
    new Promise((resolve, reject) => {
        setTimeout(async function () {
            try {
                await ctx.deleteMessage();
                await ctx.api.deleteMessage(id, message_id);
            }
            catch (e) {
                reject(e);
            }
        }, 5 * 10000);
    }).catch(() => {
        console.log('Error deleting message, file: src/commands/cmdAuth.ts', new Date());
    });
};
exports.cmdAuth = cmdAuth;
