"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildAddUserResult = function (builder, addUserResult) {
    builder.buildSection(addUserResult);
    return builder.getMessage();
};
exports.default = buildAddUserResult;
