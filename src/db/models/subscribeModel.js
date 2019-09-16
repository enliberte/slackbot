"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var subscribeSchema = new mongoose_1.Schema({
    channelId: String,
    followed: String,
    follower: String,
    reponame: String
});
var SubscribeModel = mongoose_1.model('Subscribe', subscribeSchema);
exports.SubscribeModel = SubscribeModel;
