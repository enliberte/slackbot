"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var subscribeSchema = new mongoose_1.Schema({
    channelId: { type: String, index: true },
    followed: { type: String, index: true },
    follower: { type: String, index: true },
    reponame: { type: String, index: true }
});
var SubscribeModel = mongoose_1.model('Subscribe', subscribeSchema);
exports.SubscribeModel = SubscribeModel;
