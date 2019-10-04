"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var repositorySchema = new mongoose_1.Schema({
    channelId: { type: String, index: true },
    addedByName: { type: String, index: true },
    reponame: { type: String, index: true }
});
var RepositoryModel = mongoose_1.model('Repo', repositorySchema);
exports.RepositoryModel = RepositoryModel;
