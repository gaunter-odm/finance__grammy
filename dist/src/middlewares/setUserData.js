"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserData = void 0;
const setUserData = (ctx, next) => {
    // @ts-ignore
    const { id, username, first_name: name } = ctx.chat;
    ctx.user = { id, username, name };
    return next();
};
exports.setUserData = setUserData;
