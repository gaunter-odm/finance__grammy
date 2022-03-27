"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const router_1 = require("@grammyjs/router");
const grammy_1 = require("grammy");
exports.router = new router_1.Router(ctx => ctx.session.route);
exports.router.route('k', ctx => {
    ctx.reply('keyboard', {
        reply_markup: new grammy_1.InlineKeyboard().text('btn', 'btn'),
    });
});
