"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var favoriteRepositorySchema = new mongoose_1.Schema({
    channelId: { type: String, index: true },
    addedByName: { type: String, index: true },
    reponame: { type: String, index: true }
});
var FavoriteRepositoryModel = mongoose_1.model('Repo', favoriteRepositorySchema);
exports.FavoriteRepositoryModel = FavoriteRepositoryModel;
