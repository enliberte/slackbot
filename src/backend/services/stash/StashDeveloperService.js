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
var StashClient_1 = __importDefault(require("./StashClient"));
var query_string_1 = __importDefault(require("query-string"));
var StashDeveloperService = /** @class */ (function () {
    function StashDeveloperService(developerStorageService) {
        this.developerStorageService = developerStorageService;
    }
    StashDeveloperService.prototype.list = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var channelId, limit, filter, url, response, stashDevelopers, stashDevelopersWithFavoriteSign, _i, stashDevelopers_1, stashDeveloper, favoriteDevelopers, isFavorite, favoriteId, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = query.channelId, limit = query.limit, filter = query.filter;
                        url = "/users?" + query_string_1.default.stringify({ limit: limit, filter: filter });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, StashClient_1.default.get(url)];
                    case 2:
                        response = _a.sent();
                        stashDevelopers = response.data.values;
                        stashDevelopersWithFavoriteSign = [];
                        _i = 0, stashDevelopers_1 = stashDevelopers;
                        _a.label = 3;
                    case 3:
                        if (!(_i < stashDevelopers_1.length)) return [3 /*break*/, 6];
                        stashDeveloper = stashDevelopers_1[_i];
                        return [4 /*yield*/, this.developerStorageService.get({ channelId: channelId, username: stashDeveloper.displayName })];
                    case 4:
                        favoriteDevelopers = _a.sent();
                        isFavorite = favoriteDevelopers.length !== 0;
                        favoriteId = isFavorite ? favoriteDevelopers[0].id : '';
                        stashDevelopersWithFavoriteSign.push(__assign(__assign({}, stashDeveloper), { isFavorite: isFavorite, favoriteId: favoriteId }));
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, stashDevelopersWithFavoriteSign];
                    case 7:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return StashDeveloperService;
}());
exports.default = StashDeveloperService;
