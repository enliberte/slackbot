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
var ServiceErrorMessages_1 = __importDefault(require("../ServiceErrorMessages"));
var RepositoryService = /** @class */ (function () {
    function RepositoryService(repositoryStorageService, subscribeStorageService, repositoryStashService) {
        this.repositoryStorageService = repositoryStorageService;
        this.subscribeStorageService = subscribeStorageService;
        this.repositoryStashService = repositoryStashService;
    }
    RepositoryService.prototype.list = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, search, limit;
            return __generator(this, function (_a) {
                filter = query.filter, search = query.search, limit = query.limit;
                return [2 /*return*/, this.repositoryStorageService.get(filter, search, limit)];
            });
        });
    };
    RepositoryService.prototype.add = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var validRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(obj.reponame.length !== 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.repositoryStashService.getValidRepository(obj.reponame)];
                    case 1:
                        validRepository = _a.sent();
                        if (!(typeof validRepository !== 'string')) return [3 /*break*/, 3];
                        obj.url = validRepository.links.self[0].href;
                        return [4 /*yield*/, this.repositoryStorageService.add(obj)];
                    case 2: return [2 /*return*/, (_a.sent()) ? obj : ServiceErrorMessages_1.default.DB];
                    case 3: return [2 /*return*/, validRepository];
                    case 4: return [2 /*return*/, ServiceErrorMessages_1.default.DEVELOPER_NOT_GIVEN];
                }
            });
        });
    };
    RepositoryService.prototype.delete = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var repositories, _a, reponame, channelId, repoRemovingOperationResult, subscribeRemovingOperationResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.repositoryStorageService.get(obj)];
                    case 1:
                        repositories = _b.sent();
                        if (repositories.length === 0) {
                            return [2 /*return*/, false];
                        }
                        _a = repositories[0], reponame = _a.reponame, channelId = _a.channelId;
                        return [4 /*yield*/, this.repositoryStorageService.remove({ reponame: reponame, channelId: channelId })];
                    case 2:
                        repoRemovingOperationResult = _b.sent();
                        return [4 /*yield*/, this.subscribeStorageService.remove({ reponame: reponame, channelId: channelId })];
                    case 3:
                        subscribeRemovingOperationResult = _b.sent();
                        return [2 /*return*/, repoRemovingOperationResult && subscribeRemovingOperationResult];
                }
            });
        });
    };
    return RepositoryService;
}());
exports.default = RepositoryService;
