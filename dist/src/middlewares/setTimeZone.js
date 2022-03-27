"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTimeZone = void 0;
const mongoose_1 = require("../mongoose");
const setTimeZone = async (ctx, next) => {
    if (!ctx.session.timezone)
        ctx.session.timezone = await mongoose_1.User.getTimeZone(ctx.user.id);
    return next();
};
exports.setTimeZone = setTimeZone;
