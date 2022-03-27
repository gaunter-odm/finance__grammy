"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawStringToRecords = void 0;
const regexp_1 = require("../regexp");
const ISOData_1 = require("./ISOData");
const rawStringToRecords = (raw) => {
    if (!raw)
        return null;
    const rawRecords = raw.split('\n').map(str => str.replace(/\s+/g, ' '));
    const records = [];
    const date = (0, ISOData_1.ISOData)();
    for (const str of rawRecords) {
        const result = regexp_1.name_and_price.exec(str);
        if (result) {
            // @ts-ignore
            const { position, price } = result.groups;
            records.push({ position: position?.trim(), price: Number(price), date });
        }
    }
    return records;
};
exports.rawStringToRecords = rawStringToRecords;
