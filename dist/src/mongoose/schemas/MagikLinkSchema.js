"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.magikLinkSchema = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
exports.magikLinkSchema = new mongoose_1.Schema({
    user: mongoose_1.Types.ObjectId,
    magik: {
        type: String,
        default: (0, uuid_1.v4)(),
    },
}, { timestamps: true });
exports.magikLinkSchema.index({ createdAt: 1 }, { expires: '5m' });
