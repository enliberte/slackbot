"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var sessionSchema = new mongoose_1.Schema({
    channelId: String,
    sid: String
});
var SessionModel = mongoose_1.model('Session', sessionSchema);
exports.SessionModel = SessionModel;
