"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildDevelopersList = function (builder, developers) {
    builder.buildDivider().buildSection("*Added developers:*").buildDivider();
    developers.forEach(function (developer) {
        builder.buildSection(developer.username).buildDivider();
    });
    return builder.getMessage();
};
exports.default = buildDevelopersList;
