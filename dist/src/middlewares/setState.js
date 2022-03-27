"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setState = void 0;
const ISOData_1 = require("../helpers/ISOData");
const ISOtoLocalDate_1 = require("../helpers/ISOtoLocalDate");
const setState = (ctx, next) => {
    const UTC = (0, ISOData_1.ISOData)();
    const { timezone } = ctx.session;
    const { date: today } = (0, ISOtoLocalDate_1.ISOtoLocalDate)(UTC, timezone ?? 0);
    ctx.state = {
        UTC,
        today,
    };
    return next();
};
exports.setState = setState;
