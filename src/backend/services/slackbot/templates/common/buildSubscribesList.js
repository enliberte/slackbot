"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildSubscribesList = function (builder, subscribes) {
    builder.buildDivider().buildSection("*Your subscribes:*").buildDivider();
    subscribes.forEach(function (subscribe) {
        builder.buildSectionWithFields([subscribe.reponame, subscribe.followed]).buildDivider();
    });
    return builder.getMessage();
};
exports.default = buildSubscribesList;
