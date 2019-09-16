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
var subscribeController_1 = __importDefault(require("../db/controllers/subscribeController"));
var userController_1 = __importDefault(require("../db/controllers/userController"));
var director_1 = __importDefault(require("../templates/director"));
var MsgBuilder_1 = __importDefault(require("../templates/builders/MsgBuilder"));
var UserAPI = /** @class */ (function () {
    function UserAPI(channelId) {
        this.channelId = channelId;
        this.userDB = new userController_1.default();
        this.subscribeDB = new subscribeController_1.default();
    }
    UserAPI.prototype.getUsersWithFollowSign = function (users, channelId, reponame) {
        return __awaiter(this, void 0, void 0, function () {
            var followedUsers, followedUserNames, allUsersWithFollowSign, _i, users_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.subscribeDB.get({ channelId: channelId, reponame: reponame })];
                    case 1:
                        followedUsers = _a.sent();
                        followedUserNames = followedUsers.map(function (user) { return user.followed; });
                        allUsersWithFollowSign = [];
                        for (_i = 0, users_1 = users; _i < users_1.length; _i++) {
                            user = users_1[_i];
                            allUsersWithFollowSign.push(__assign(__assign({}, user), { isFollowed: followedUserNames.indexOf(user.username) !== -1 }));
                        }
                        return [2 /*return*/, allUsersWithFollowSign];
                }
            });
        });
    };
    UserAPI.prototype.list = function (reponame) {
        return __awaiter(this, void 0, void 0, function () {
            var builder, channelId, emptyUsersMsg, users, director, usersWithFollowSign;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        builder = new MsgBuilder_1.default();
                        channelId = this.channelId;
                        emptyUsersMsg = "You don't have added users yet. To add them please use command /add_user";
                        return [4 /*yield*/, this.userDB.get({ channelId: channelId })];
                    case 1:
                        users = _a.sent();
                        if (!(users.length === 0)) return [3 /*break*/, 2];
                        builder.buildSection(emptyUsersMsg);
                        return [3 /*break*/, 5];
                    case 2:
                        director = new director_1.default(builder);
                        if (!reponame) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getUsersWithFollowSign(users, channelId, reponame)];
                    case 3:
                        usersWithFollowSign = _a.sent();
                        director.buildUsersList(usersWithFollowSign, reponame);
                        return [3 /*break*/, 5];
                    case 4:
                        director.buildUsersList(users);
                        _a.label = 5;
                    case 5: return [2 /*return*/, builder.getMsg()];
                }
            });
        });
    };
    UserAPI.prototype.add = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var builder, username, channelId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        builder = new MsgBuilder_1.default();
                        username = obj.username;
                        if (!(username.length !== 0)) return [3 /*break*/, 2];
                        channelId = this.channelId;
                        return [4 /*yield*/, this.userDB.add(__assign(__assign({}, obj), { channelId: channelId }))];
                    case 1:
                        _a.sent();
                        builder.buildSection("You have added new user " + username);
                        return [3 /*break*/, 3];
                    case 2:
                        builder.buildSection("Incorrect username " + username);
                        _a.label = 3;
                    case 3: return [2 /*return*/, builder.getMsg()];
                }
            });
        });
    };
    UserAPI.prototype.delete = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var username, channelId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = obj.username;
                        channelId = this.channelId;
                        return [4 /*yield*/, this.userDB.remove({ username: username, channelId: channelId })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.subscribeDB.remove({ followed: username, channelId: channelId })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserAPI;
}());
exports.default = UserAPI;
