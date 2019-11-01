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
var ServiceErrorMessages_1 = __importDefault(require("../ServiceErrorMessages"));
var SubscribeService = /** @class */ (function () {
    function SubscribeService(subscribeStorageService, repositoryStorageService, developerStorageService, repositoryService, developerService, stashDeveloperService, stashRepositoryService) {
        this.subscribeStorageService = subscribeStorageService;
        this.repositoryStorageService = repositoryStorageService;
        this.developerStorageService = developerStorageService;
        this.repositoryService = repositoryService;
        this.developerService = developerService;
        this.stashDeveloperService = stashDeveloperService;
        this.stashRepositoryService = stashRepositoryService;
    }
    SubscribeService.prototype.list = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, search, limit;
            return __generator(this, function (_a) {
                filter = query.filter, search = query.search, limit = query.limit;
                return [2 /*return*/, this.subscribeStorageService.get(filter, search, limit)];
            });
        });
    };
    SubscribeService.prototype.validateSubscribe = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var channelId, username, addedByName, reponame, stashDeveloper, stashRepository, developer, repository, subscribe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = obj.channelId, username = obj.followed, addedByName = obj.follower, reponame = obj.reponame;
                        return [4 /*yield*/, this.stashDeveloperService.getValidDeveloper(username)];
                    case 1:
                        stashDeveloper = _a.sent();
                        return [4 /*yield*/, this.stashRepositoryService.getValidRepository(reponame)];
                    case 2:
                        stashRepository = _a.sent();
                        developer = typeof stashDeveloper !== 'string' ?
                            { channelId: channelId, username: username, addedByName: addedByName, email: stashDeveloper.emailAddress } : stashDeveloper;
                        repository = typeof stashRepository !== 'string' ?
                            { channelId: channelId, reponame: reponame, addedByName: addedByName, url: stashRepository.links.self[0].href } : stashRepository;
                        subscribe = typeof developer !== 'string' && typeof repository !== 'string'
                            ? __assign(__assign({}, obj), { followedEmail: developer.email, repoUrl: repository.url }) : ServiceErrorMessages_1.default.INVALID_SUBSCRIBE;
                        return [2 /*return*/, { developer: developer, repository: repository, subscribe: subscribe }];
                }
            });
        });
    };
    SubscribeService.prototype.subscribe = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var validationResult, developer, repository, subscribe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateSubscribe(obj)];
                    case 1:
                        validationResult = _a.sent();
                        developer = validationResult.developer, repository = validationResult.repository, subscribe = validationResult.subscribe;
                        if (!(typeof subscribe !== 'string' && typeof developer !== 'string' && typeof repository !== 'string')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.developerStorageService.add(developer)];
                    case 2:
                        developer = (_a.sent()) ? developer : ServiceErrorMessages_1.default.DB;
                        return [4 /*yield*/, this.repositoryStorageService.add(repository)];
                    case 3:
                        repository = (_a.sent()) ? repository : ServiceErrorMessages_1.default.DB;
                        return [4 /*yield*/, this.subscribeStorageService.add(subscribe)];
                    case 4:
                        subscribe = (_a.sent()) ? subscribe : ServiceErrorMessages_1.default.DB;
                        _a.label = 5;
                    case 5: return [2 /*return*/, { developer: developer, repository: repository, subscribe: subscribe }];
                }
            });
        });
    };
    SubscribeService.prototype.unsubscribe = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.subscribeStorageService.remove(obj)];
            });
        });
    };
    ;
    SubscribeService.prototype.editSubscribe = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var validationResult, developer, repository, subscribe, editedSubscribe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateSubscribe(obj)];
                    case 1:
                        validationResult = _a.sent();
                        developer = validationResult.developer, repository = validationResult.repository, subscribe = validationResult.subscribe;
                        if (!(typeof subscribe !== 'string' && typeof developer !== 'string' && typeof repository !== 'string')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.developerStorageService.add(developer)];
                    case 2:
                        developer = (_a.sent()) ? developer : ServiceErrorMessages_1.default.DB;
                        return [4 /*yield*/, this.repositoryStorageService.add(repository)];
                    case 3:
                        repository = (_a.sent()) ? repository : ServiceErrorMessages_1.default.DB;
                        editedSubscribe = __assign(__assign({}, subscribe), { id: obj.id });
                        return [4 /*yield*/, this.subscribeStorageService.edit(editedSubscribe)];
                    case 4:
                        subscribe = (_a.sent()) ? subscribe : ServiceErrorMessages_1.default.DB;
                        _a.label = 5;
                    case 5: return [2 /*return*/, { developer: developer, repository: repository, subscribe: subscribe }];
                }
            });
        });
    };
    return SubscribeService;
}());
exports.default = SubscribeService;
