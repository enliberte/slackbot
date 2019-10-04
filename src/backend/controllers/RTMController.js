"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rtm_api_1 = require("@slack/rtm-api");
var events_1 = require("events");
var MessageBuilder_1 = __importDefault(require("../services/slackbot/templates/builders/MessageBuilder"));
var WebChatAdapter_1 = __importDefault(require("../services/slackbot/adapters/WebChatAdapter"));
var buildCommandsList_1 = __importDefault(require("../services/slackbot/templates/common/buildCommandsList"));
var commands_1 = require("../services/slackbot/commands/commands");
var BOT_TOKEN = require('../../../config').BOT_TOKEN;
var RTMController = /** @class */ (function () {
    function RTMController(services) {
        this.services = services;
        this.rtm = new rtm_api_1.RTMClient(BOT_TOKEN);
        this.ee = new events_1.EventEmitter();
    }
    RTMController.prototype.postMessage = function (msg, channelId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new WebChatAdapter_1.default().post({ text: '', msg: msg, channelId: channelId })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RTMController.prototype.postMsgWithDeveloperAdditionResult = function (channelId, addedByName, username) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.services.developerMessageAdapter.getAddResultMsg(new MessageBuilder_1.default(), { channelId: channelId, username: username, addedByName: addedByName })];
                    case 1:
                        msg = _a.sent();
                        this.postMessage(msg, channelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTMController.prototype.postMsgWithRepositoryAdditionResult = function (channelId, addedByName, reponame) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.services.repositoryMessageAdapter.getAddResultMsg(new MessageBuilder_1.default(), { channelId: channelId, reponame: reponame, addedByName: addedByName })];
                    case 1:
                        msg = _a.sent();
                        this.postMessage(msg, channelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTMController.prototype.postMsgWithDevelopersList = function (channelId) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.services.developerMessageAdapter.getDevelopersListMsg(new MessageBuilder_1.default(), channelId)];
                    case 1:
                        msg = _a.sent();
                        this.postMessage(msg, channelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTMController.prototype.postMsgWithRepositoryList = function (channelId) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.services.repositoryMessageAdapter.getReposListMsg(new MessageBuilder_1.default(), channelId)];
                    case 1:
                        msg = _a.sent();
                        this.postMessage(msg, channelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTMController.prototype.postMsgWithSubscribesList = function (channelId) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.services.subscribeToMessageAdapter.getSubscribesListMsg(new MessageBuilder_1.default(), channelId)];
                    case 1:
                        msg = _a.sent();
                        this.postMessage(msg, channelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTMController.prototype.postMsgWithAuthLink = function (channelId, username) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                msg = this.services.authToMessageAdapter.getCreateAuthLinkMsg(new MessageBuilder_1.default(), { channelId: channelId, username: username });
                this.postMessage(msg, channelId);
                return [2 /*return*/];
            });
        });
    };
    RTMController.prototype.postMsgWithSubscribeAdditionResult = function (channelId, follower, reponame, followed) {
        return __awaiter(this, void 0, void 0, function () {
            var subscribe, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subscribe = { follower: follower, reponame: reponame, channelId: channelId, followed: followed };
                        return [4 /*yield*/, this.services.subscribeToMessageAdapter.getAddResultMsg(new MessageBuilder_1.default(), subscribe)];
                    case 1:
                        msg = _a.sent();
                        this.postMessage(msg, channelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTMController.prototype.postMsgWithSubscribeRemoveResult = function (channelId, follower, reponame, followed) {
        return __awaiter(this, void 0, void 0, function () {
            var subscribe, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subscribe = { follower: follower, reponame: reponame, channelId: channelId, followed: followed };
                        return [4 /*yield*/, this.services.subscribeToMessageAdapter.getDeleteResultMsg(new MessageBuilder_1.default(), subscribe)];
                    case 1:
                        msg = _a.sent();
                        this.postMessage(msg, channelId);
                        return [2 /*return*/];
                }
            });
        });
    };
    RTMController.prototype.postMsgWithCommands = function (channelId) {
        var msg = buildCommandsList_1.default(new MessageBuilder_1.default());
        this.postMessage(msg, channelId);
    };
    RTMController.prototype.processMessages = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, command, args;
            var _b;
            return __generator(this, function (_c) {
                _a = event.text.split(' '), command = _a[0], args = _a.slice(1);
                (_b = this.ee).emit.apply(_b, __spreadArrays([command, event.channel, event.user], args));
                return [2 /*return*/];
            });
        });
    };
    RTMController.prototype.start = function () {
        this.ee.on(commands_1.commands.ADD_DEVELOPER, this.postMsgWithDeveloperAdditionResult.bind(this));
        this.ee.on(commands_1.commands.ADD_REPOSITORY, this.postMsgWithRepositoryAdditionResult.bind(this));
        this.ee.on(commands_1.commands.DEVELOPERS, this.postMsgWithDevelopersList.bind(this));
        this.ee.on(commands_1.commands.REPOSITORIES, this.postMsgWithRepositoryList.bind(this));
        this.ee.on(commands_1.commands.SIGNUP, this.postMsgWithAuthLink.bind(this));
        this.ee.on(commands_1.commands.SUBSCRIBES, this.postMsgWithSubscribesList.bind(this));
        this.ee.on(commands_1.commands.SUBSCRIBE, this.postMsgWithSubscribeAdditionResult.bind(this));
        this.ee.on(commands_1.commands.UNSUBSCRIBE, this.postMsgWithSubscribeRemoveResult.bind(this));
        this.ee.on(commands_1.commands.HELP, this.postMsgWithCommands.bind(this));
        this.rtm.on('message', this.processMessages.bind(this));
        this.rtm.start();
    };
    return RTMController;
}());
exports.default = RTMController;
