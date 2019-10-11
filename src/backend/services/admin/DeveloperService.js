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
Object.defineProperty(exports, "__esModule", { value: true });
var DeveloperService = /** @class */ (function () {
    function DeveloperService(developerStorageService, subscribeStorageService) {
        this.developerStorageService = developerStorageService;
        this.subscribeStorageService = subscribeStorageService;
    }
    DeveloperService.prototype.list = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var search, limit, filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        search = query.search, limit = query.limit, filter = query.filter;
                        return [4 /*yield*/, this.developerStorageService.get(filter, search, limit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeveloperService.prototype.add = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (obj.username.length !== 0) {
                    return [2 /*return*/, this.developerStorageService.add(obj)];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    DeveloperService.prototype.delete = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var developers, _a, username, channelId, developerRemovingOperationResult, subscribeRemovingOperationResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.developerStorageService.get(obj)];
                    case 1:
                        developers = _b.sent();
                        if (developers.length === 0) {
                            return [2 /*return*/, false];
                        }
                        _a = developers[0], username = _a.username, channelId = _a.channelId;
                        return [4 /*yield*/, this.developerStorageService.remove({ username: username, channelId: channelId })];
                    case 2:
                        developerRemovingOperationResult = _b.sent();
                        return [4 /*yield*/, this.subscribeStorageService.remove({ followed: username, channelId: channelId })];
                    case 3:
                        subscribeRemovingOperationResult = _b.sent();
                        return [2 /*return*/, developerRemovingOperationResult && subscribeRemovingOperationResult];
                }
            });
        });
    };
    return DeveloperService;
}());
exports.default = DeveloperService;
