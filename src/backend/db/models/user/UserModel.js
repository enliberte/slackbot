"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    channelId: String,
    stashDisplayName: String,
    stashSlug: String,
    commentsNotifications: Boolean,
    reviewNotifications: Boolean,
    subscribesNotifications: Boolean
});
var UserModel = mongoose_1.model('User', userSchema);
exports.UserModel = UserModel;
