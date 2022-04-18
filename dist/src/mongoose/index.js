"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagikLink = exports.User = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const UserSchema_1 = require("./schemas/UserSchema");
const MagikLinkSchema_1 = require("./schemas/MagikLinkSchema");
exports.connect = mongoose_1.default.createConnection(config_1.mongoUrl);
exports.User = exports.connect.model('User', UserSchema_1.userSchema);
exports.MagikLink = exports.connect.model('MagikLink', MagikLinkSchema_1.magikLinkSchema);
