"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const UserSchema_1 = require("./schemas/UserSchema");
exports.connect = mongoose_1.default.createConnection(config_1.mongoUrl);
exports.User = exports.connect.model('User', UserSchema_1.userSchema);
