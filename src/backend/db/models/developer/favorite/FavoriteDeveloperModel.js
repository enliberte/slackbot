"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var favoriteDeveloperSchema = new mongoose_1.Schema({
    channelId: { type: String, index: true },
    addedByName: { type: String, index: true },
    username: { type: String, index: true }
});
var FavoriteDeveloperModel = mongoose_1.model('Developer', favoriteDeveloperSchema);
exports.FavoriteDeveloperModel = FavoriteDeveloperModel;
