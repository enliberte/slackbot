"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var favoriteRepositorySchema = new mongoose_1.Schema({
    channelId: String,
    addedByName: String,
    reponame: String,
    url: String
});
var FavoriteRepositoryModel = mongoose_1.model('Repo', favoriteRepositorySchema);
exports.FavoriteRepositoryModel = FavoriteRepositoryModel;
