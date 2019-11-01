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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var NotifyService = /** @class */ (function () {
    function NotifyService(webChatAdapter, subscribeStorageService, userStorageService) {
        this.webChatAdapter = webChatAdapter;
        this.subscribeStorageService = subscribeStorageService;
        this.userStorageService = userStorageService;
        this.PR = {};
    }
    NotifyService.prototype.addSubscribersChannelId = function (PRid, followed, repoUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var subscribes, subscribersChannelId, _i, subscribersChannelId_1, channelId, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.subscribeStorageService.get({ followed: followed, repoUrl: repoUrl })];
                    case 1:
                        subscribes = _a.sent();
                        subscribersChannelId = subscribes.map(function (subscribe) { return subscribe.channelId; });
                        _i = 0, subscribersChannelId_1 = subscribersChannelId;
                        _a.label = 2;
                    case 2:
                        if (!(_i < subscribersChannelId_1.length)) return [3 /*break*/, 5];
                        channelId = subscribersChannelId_1[_i];
                        return [4 /*yield*/, this.userStorageService.get({ channelId: channelId, subscribesNotifications: true })];
                    case 3:
                        users = _a.sent();
                        if (users.length !== 0) {
                            this.PR[PRid].add(channelId);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NotifyService.prototype.addMentionedAsReviewerChannelId = function (PRid, reviewersStashSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, reviewersStashSlug_1, stashSlug, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, reviewersStashSlug_1 = reviewersStashSlug;
                        _a.label = 1;
                    case 1:
                        if (!(_i < reviewersStashSlug_1.length)) return [3 /*break*/, 4];
                        stashSlug = reviewersStashSlug_1[_i];
                        return [4 /*yield*/, this.userStorageService.get({ stashSlug: stashSlug, reviewNotifications: true })];
                    case 2:
                        users = _a.sent();
                        if (users.length !== 0 && users[0].channelId) {
                            this.PR[PRid].add(users[0].channelId);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NotifyService.prototype.addMentionedInCommentChannelId = function (PRid, commentedStashSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, commentedStashSlug_1, stashSlug, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, commentedStashSlug_1 = commentedStashSlug;
                        _a.label = 1;
                    case 1:
                        if (!(_i < commentedStashSlug_1.length)) return [3 /*break*/, 4];
                        stashSlug = commentedStashSlug_1[_i];
                        return [4 /*yield*/, this.userStorageService.get({ stashSlug: stashSlug, commentsNotifications: true })];
                    case 2:
                        users = _a.sent();
                        if (users.length !== 0 && users[0].channelId) {
                            this.PR[PRid].add(users[0].channelId);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NotifyService.prototype.notify = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var PRid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        PRid = crypto_1.default.createHash('md5').update(JSON.stringify(data)).digest('hex');
                        if (!!this.PR[PRid]) return [3 /*break*/, 4];
                        this.PR[PRid] = new Set();
                        return [4 /*yield*/, this.formPRNotifyList(PRid, data)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.formReviewersNotifyList(PRid, data)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.formCommentsNotifyList(PRid, data)];
                    case 3:
                        _a.sent();
                        Array.from(this.PR[PRid]).map(function (channelId) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.webChatAdapter.post({ text: 'Look at pull request', msg: data, channelId: channelId })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NotifyService.prototype.formPRNotifyList = function (PRid, data) {
        return __awaiter(this, void 0, void 0, function () {
            var openedPattern, _a, fallback, followed, text, result, repoUrl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        openedPattern = 'opened pull request';
                        _a = data.attachments[0], fallback = _a.fallback, followed = _a.author_name, text = _a.text;
                        if (!(fallback && followed && text.includes(openedPattern))) return [3 /*break*/, 2];
                        result = fallback.match(/<(.*)\/pull-requests/);
                        if (!result) return [3 /*break*/, 2];
                        repoUrl = result[1] + "/browse";
                        return [4 /*yield*/, this.addSubscribersChannelId(PRid, followed, repoUrl)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ;
    NotifyService.prototype.formReviewersNotifyList = function (PRid, data) {
        return __awaiter(this, void 0, void 0, function () {
            var fields, reviewersField, reviewers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fields = data.attachments[0].fields;
                        if (!(fields && fields.length !== 0)) return [3 /*break*/, 2];
                        reviewersField = fields.find(function (field) { return field.title === 'Reviewers'; });
                        if (!reviewersField) return [3 /*break*/, 2];
                        reviewers = reviewersField.value.trim().split(' ').map(function (reviewer) { return reviewer.slice(1).toLowerCase(); });
                        return [4 /*yield*/, this.addMentionedAsReviewerChannelId(PRid, reviewers)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ;
    NotifyService.prototype.formCommentsNotifyList = function (PRid, data) {
        return __awaiter(this, void 0, void 0, function () {
            var commentPattern, text, commented;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commentPattern = 'commented on pull request';
                        text = data.attachments[0].text;
                        if (!(text && text.length !== 0 && text.includes(commentPattern))) return [3 /*break*/, 2];
                        commented = text.match(/@\w*/g);
                        if (!commented) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.addMentionedInCommentChannelId(PRid, commented.map(function (commented) { return commented.slice(1).toLowerCase(); }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ;
    return NotifyService;
}());
exports.default = NotifyService;
