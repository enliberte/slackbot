"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildRepositoriesList = function (builder, repos) {
    builder.buildDivider().buildSection('*Added repositories:*').buildDivider();
    repos.forEach(function (repo) {
        builder.buildSection(repo.reponame).buildDivider();
    });
    return builder.getMessage();
};
exports.default = buildRepositoriesList;
