"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUrl = exports.token = exports.isDev = void 0;
exports.isDev = process.env.NODE_ENV === 'development';
exports.token = process.env[exports.isDev ? 'BOT_TOKEN_DEV' : 'BOT_TOKEN'] || '';
exports.mongoUrl = process.env[exports.isDev ? 'MONGO_DEV' : 'MONGO'] || '';
