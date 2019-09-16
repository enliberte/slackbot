"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var repoSchema = new mongoose_1.Schema({
    channelId: String,
    addedByName: String,
    reponame: String
});
var RepoModel = mongoose_1.model('Repo', repoSchema);
exports.RepoModel = RepoModel;
