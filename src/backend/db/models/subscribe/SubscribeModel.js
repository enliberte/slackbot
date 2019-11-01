"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var subscribeSchema = new mongoose_1.Schema({
    channelId: String,
    followed: String,
    followedEmail: String,
    follower: String,
    reponame: String,
    repoUrl: String
});
var SubscribeModel = mongoose_1.model('Subscribe', subscribeSchema);
exports.SubscribeModel = SubscribeModel;
