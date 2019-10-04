"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("../../commands/commands");
var buildCommandsList = function (builder) {
    builder.buildDivider().buildSection('*I support the following commands:*').buildDivider();
    commands_1.commandsDescription.forEach(function (command, idx) {
        builder
            .buildSectionWithFields(["*" + (idx + 1) + ") " + command.name + "*", command.description])
            .buildSection(command.hint)
            .buildDivider();
    });
    return builder.getMessage();
};
exports.default = buildCommandsList;
