"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBuilder = /** @class */ (function () {
    function MessageBuilder() {
        this.message = {
            blocks: []
        };
    }
    MessageBuilder.prototype.getMessage = function () {
        return this.message;
    };
    MessageBuilder.prototype.getSection = function (text) {
        return {
            type: "section",
            text: {
                type: "mrkdwn",
                text: text,
            }
        };
    };
    MessageBuilder.prototype.getButton = function (button) {
        var btnText = button.btnText, btnValue = button.btnValue;
        return {
            type: "button",
            text: {
                type: "plain_text",
                text: btnText,
            },
            value: btnValue
        };
    };
    MessageBuilder.prototype.getField = function (text) {
        return { type: "mrkdwn", text: text };
    };
    MessageBuilder.prototype.getSectionWithButton = function (text, button) {
        return __assign(__assign({}, this.getSection(text)), { accessory: this.getButton(button) });
    };
    MessageBuilder.prototype.getSectionWithFields = function (fields) {
        var _this = this;
        return {
            type: "section",
            fields: fields.map(function (field) { return _this.getField(field); })
        };
    };
    MessageBuilder.prototype.getActions = function (buttons) {
        var _this = this;
        return {
            type: "actions",
            elements: buttons.map(function (button) { return _this.getButton(button); })
        };
    };
    MessageBuilder.prototype.buildChannelId = function (channelId) {
        this.message.channel = channelId;
        return this;
    };
    MessageBuilder.prototype.buildSection = function (text) {
        this.message.blocks.push(this.getSection(text));
        return this;
    };
    MessageBuilder.prototype.buildDivider = function () {
        var msgPart = {
            "type": "divider"
        };
        this.message.blocks.push(msgPart);
        return this;
    };
    MessageBuilder.prototype.buildSectionWithButton = function (text, button) {
        this.message.blocks.push(this.getSectionWithButton(text, button));
        return this;
    };
    MessageBuilder.prototype.buildActions = function (buttons) {
        this.message.blocks.push(this.getActions(buttons));
        return this;
    };
    MessageBuilder.prototype.buildSectionWithFields = function (fields) {
        this.message.blocks.push(this.getSectionWithFields(fields));
        return this;
    };
    return MessageBuilder;
}());
exports.default = MessageBuilder;
