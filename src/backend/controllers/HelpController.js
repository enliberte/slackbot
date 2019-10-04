"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseController_1 = __importDefault(require("./BaseController"));
var MessageBuilder_1 = __importDefault(require("../services/slackbot/templates/builders/MessageBuilder"));
var auth_1 = require("../middlewares/auth");
var buildCommandsList_1 = __importDefault(require("../services/slackbot/templates/common/buildCommandsList"));
var HelpController = /** @class */ (function (_super) {
    __extends(HelpController, _super);
    function HelpController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelpController.prototype.postMsgWithSlashCommands = function (req, res) {
        var channelId = req.body.channel_id;
        var msg = buildCommandsList_1.default(new MessageBuilder_1.default());
        // this.postMessage(res, msg, channelId);
    };
    HelpController.prototype.makeRouter = function () {
        this.router.post('/help', auth_1.botAuth, this.postMsgWithSlashCommands.bind(this));
        return this.router;
    };
    return HelpController;
}(BaseController_1.default));
exports.default = HelpController;
