"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var purpose = "I can notify you about new pull requests " +
    "according to your subscriptions and pull requests where you was mentioned in comments or selected as reviewer";
var requestForStashName = "To do that could you please tell me your *name in stash* (for instance *I'm Sergey Popov*)";
var help = "To see whole list of commands you should write *help*";
var buildGreeting = function (builder, isAuth, name) {
    var greeting = isAuth ? "Welcome back, " + name + "!" : "Hi! I\'m *StashBot*";
    builder.buildDivider().buildSection(greeting).buildSection(purpose);
    if (!isAuth) {
        builder.buildSection(requestForStashName);
    }
    builder.buildSection(help);
    return builder.getMessage();
};
exports.default = buildGreeting;
