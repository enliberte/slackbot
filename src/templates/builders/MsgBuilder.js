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
var MsgBuilder = /** @class */ (function () {
    function MsgBuilder() {
        this.msg = {
            blocks: []
        };
    }
    MsgBuilder.prototype.getMsg = function () {
        return this.msg;
    };
    MsgBuilder.prototype.getSection = function (text) {
        return {
            type: "section",
            text: {
                type: "mrkdwn",
                text: text,
            }
        };
    };
    MsgBuilder.prototype.getButton = function (text, value) {
        return {
            type: "button",
            text: {
                type: "plain_text",
                text: text,
            },
            value: value
        };
    };
    MsgBuilder.prototype.getSectionWithButton = function (text, btnText, btnValue) {
        return __assign(__assign({}, this.getSection(text)), { accessory: this.getButton(btnText, btnValue) });
    };
    MsgBuilder.prototype.getActions = function (buttons) {
        var _this = this;
        return {
            type: "actions",
            elements: buttons.map(function (button) { return _this.getButton(button.btnText, button.btnValue); })
        };
    };
    MsgBuilder.prototype.buildChannelId = function (channelId) {
        this.msg.channel = channelId;
    };
    MsgBuilder.prototype.buildSection = function (text) {
        this.msg.blocks.push(this.getSection(text));
    };
    MsgBuilder.prototype.buildDivider = function () {
        var msgPart = {
            "type": "divider"
        };
        this.msg.blocks.push(msgPart);
    };
    MsgBuilder.prototype.buildSectionWithButton = function (text, btnText, btnValue) {
        this.msg.blocks.push(this.getSectionWithButton(text, btnText, btnValue));
    };
    MsgBuilder.prototype.buildActions = function (buttons) {
        this.msg.blocks.push(this.getActions(buttons));
    };
    return MsgBuilder;
}());
exports.default = MsgBuilder;
