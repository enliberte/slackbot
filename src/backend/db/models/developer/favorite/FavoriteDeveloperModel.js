"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var favoriteDeveloperSchema = new mongoose_1.Schema({
    channelId: String,
    addedByName: String,
    username: String,
    email: String
});
var FavoriteDeveloperModel = mongoose_1.model('Developer', favoriteDeveloperSchema);
exports.FavoriteDeveloperModel = FavoriteDeveloperModel;
