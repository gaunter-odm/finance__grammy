"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const ISOData_1 = require("../../helpers/ISOData");
const RecordSchema_1 = require("./RecordSchema");
const ISOtoLocalDate_1 = require("../../helpers/ISOtoLocalDate");
exports.userSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: String,
    username: String,
    currency: String,
    timezone: {
        type: Number,
        default: 1,
    },
    created_at: {
        type: String,
        default: (0, ISOData_1.ISOData)(),
    },
    records: {
        type: [RecordSchema_1.recordSchema],
        default: [],
    },
});
exports.userSchema.static('pushRecords', async function (id, records) {
    if (!records)
        return;
    const user = await this.findOne({ id });
    if (!user)
        return;
    for (const record of records) { // @ts-ignore
        user.records.push(record);
    }
    await user.save();
    const timezone = user.timezone ?? 0;
    const { date: today } = (0, ISOtoLocalDate_1.ISOtoLocalDate)((0, ISOData_1.ISOData)(), timezone);
    return user.records.filter(({ date }) => (0, ISOtoLocalDate_1.ISOtoLocalDate)(date, timezone).date === today);
});
exports.userSchema.static('getTimeZone', async function (id) {
    const user = await this.findOne({ id });
    return user?.timezone;
});
exports.userSchema.static('getRecords', async function (id, date) {
    const user = await this.findOne({ id });
    if (date) {
        const timezone = user?.timezone ?? 0;
        return user?.records?.filter(record => {
            const { date: rDate } = (0, ISOtoLocalDate_1.ISOtoLocalDate)(record.date, timezone);
            return rDate === date;
        });
    }
    else {
        return user?.records;
    }
});
exports.userSchema.static('getSumFromDate', async function (id, date) {
    let sum = 0;
    const user = await this.findOne({ id });
    user?.records.forEach(record => {
        if ((0, ISOtoLocalDate_1.ISOtoLocalDate)(record.date, user.timezone ?? 0)?.date === date) {
            sum += record.price;
        }
    });
    return sum;
});
