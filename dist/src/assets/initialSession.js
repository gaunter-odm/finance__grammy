"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialSession = void 0;
const initialSession = () => ({
    route: '',
    lastMessageTable: undefined,
    lastPurchaseDate: null,
    timezone: null,
    countPositions: 0
});
exports.initialSession = initialSession;
