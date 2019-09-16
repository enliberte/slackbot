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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var interactive_messages_1 = require("@slack/interactive-messages");
var UserAPI_1 = __importDefault(require("../api/UserAPI"));
var RepoAPI_1 = __importDefault(require("../api/RepoAPI"));
var SubscribeAPI_1 = __importDefault(require("../api/SubscribeAPI"));
var InteractiveMessagesRouter = express_1.Router();
var SIGNING_SECRET = require('../../config').SIGNING_SECRET;
var slackInteractions = interactive_messages_1.createMessageAdapter(SIGNING_SECRET);
var getMsg = function (promise) { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            _a = [{}];
            return [4 /*yield*/, promise];
        case 1: return [2 /*return*/, (__assign.apply(void 0, [__assign.apply(void 0, _a.concat([_b.sent()])), { replace_original: true }]))];
    }
}); }); };
var processMessages = function (payload, respond) { return __awaiter(void 0, void 0, void 0, function () {
    var value, args, _a, _b, msg, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                value = payload.actions[0].value;
                args = value.split('_');
                _a = args[0];
                switch (_a) {
                    case 'close': return [3 /*break*/, 1];
                    case 'return': return [3 /*break*/, 2];
                    case 'select': return [3 /*break*/, 4];
                    case 'follow': return [3 /*break*/, 7];
                    case 'unfollow': return [3 /*break*/, 10];
                    case 'deleteRepo': return [3 /*break*/, 13];
                    case 'deleteUser': return [3 /*break*/, 16];
                }
                return [3 /*break*/, 19];
            case 1:
                respond({ text: 'See you later' });
                return [3 /*break*/, 19];
            case 2:
                _b = respond;
                return [4 /*yield*/, getMsg(new RepoAPI_1.default(payload.channel.id).list())];
            case 3:
                _b.apply(void 0, [_h.sent()]);
                return [3 /*break*/, 19];
            case 4: return [4 /*yield*/, new UserAPI_1.default(payload.channel.id).list(args[1])];
            case 5:
                msg = _h.sent();
                console.log('---------------------------------------------------');
                console.log(msg);
                console.log('---------------------------------------------------');
                _c = respond;
                return [4 /*yield*/, new UserAPI_1.default(payload.channel.id).list(args[1])];
            case 6:
                _c.apply(void 0, [_h.sent()]);
                return [3 /*break*/, 19];
            case 7: return [4 /*yield*/, new SubscribeAPI_1.default().subscribe({
                    channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
                })];
            case 8:
                _h.sent();
                _d = respond;
                return [4 /*yield*/, getMsg(new UserAPI_1.default(payload.channel.id).list(args[2]))];
            case 9:
                _d.apply(void 0, [_h.sent()]);
                return [3 /*break*/, 19];
            case 10: return [4 /*yield*/, new SubscribeAPI_1.default().unsubscribe({
                    channelId: payload.channel.id, followed: args[1], follower: payload.user.username, reponame: args[2]
                })];
            case 11:
                _h.sent();
                _e = respond;
                return [4 /*yield*/, getMsg(new UserAPI_1.default(payload.channel.id).list(args[2]))];
            case 12:
                _e.apply(void 0, [_h.sent()]);
                return [3 /*break*/, 19];
            case 13: return [4 /*yield*/, new RepoAPI_1.default(payload.channel.id).delete({ reponame: args[1] })];
            case 14:
                _h.sent();
                _f = respond;
                return [4 /*yield*/, getMsg(new RepoAPI_1.default(payload.channel.id).list('Delete', 'deleteRepo'))];
            case 15:
                _f.apply(void 0, [_h.sent()]);
                return [3 /*break*/, 19];
            case 16: return [4 /*yield*/, new UserAPI_1.default(payload.channel.id).delete({ username: args[1] })];
            case 17:
                _h.sent();
                _g = respond;
                return [4 /*yield*/, getMsg(new UserAPI_1.default(payload.channel.id).list())];
            case 18:
                _g.apply(void 0, [_h.sent()]);
                return [3 /*break*/, 19];
            case 19: return [2 /*return*/];
        }
    });
}); };
InteractiveMessagesRouter.use('/interactive-messages', slackInteractions.requestListener());
slackInteractions.action({ type: 'button' }, processMessages);
exports.default = InteractiveMessagesRouter;
