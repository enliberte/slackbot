"use strict";
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
var effects_1 = require("redux-saga/effects");
var fetchingActionCreators_1 = require("../../action_creators/fetching/fetchingActionCreators");
var repositoriesActionCreators_1 = require("../../action_creators/repositories/repositoriesActionCreators");
var repositoriesAPI_1 = require("../../../API/repositoriesAPI");
var auth_1 = require("../../selectors/auth");
var repositories_1 = require("../../selectors/repositories");
function getFavoriteRepositories(action) {
    var channelId, search, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, 7, 9]);
                return [4 /*yield*/, effects_1.put(fetchingActionCreators_1.setIsFetching(true))];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 2:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.select(repositories_1.selectSearchFavoriteRepositoriesTerm)];
            case 3:
                search = _a.sent();
                return [4 /*yield*/, effects_1.call(repositoriesAPI_1.fetchGetFavoriteRepositories, { channelId: channelId, search: search })];
            case 4:
                response = _a.sent();
                return [4 /*yield*/, effects_1.put(repositoriesActionCreators_1.setFavoriteRepositoriesData(response.data))];
            case 5:
                _a.sent();
                return [3 /*break*/, 9];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, effects_1.put(fetchingActionCreators_1.setIsFetching(false))];
            case 8:
                _a.sent();
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
exports.getFavoriteRepositories = getFavoriteRepositories;
function getStashRepositories(action) {
    var channelId, name_1, limit, response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, 8, 10]);
                return [4 /*yield*/, effects_1.put(fetchingActionCreators_1.setIsFetching(true))];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 2:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.select(repositories_1.selectFilterStashRepositoriesTerm)];
            case 3:
                name_1 = _a.sent();
                return [4 /*yield*/, effects_1.select(repositories_1.selectLimitStashRepositories)];
            case 4:
                limit = _a.sent();
                return [4 /*yield*/, effects_1.call(repositoriesAPI_1.fetchGetStashRepositories, { name: name_1, limit: limit, channelId: channelId })];
            case 5:
                response = _a.sent();
                return [4 /*yield*/, effects_1.put(repositoriesActionCreators_1.setStashRepositoriesData(response.data))];
            case 6:
                _a.sent();
                return [3 /*break*/, 10];
            case 7:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, effects_1.put(fetchingActionCreators_1.setIsFetching(false))];
            case 9:
                _a.sent();
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}
exports.getStashRepositories = getStashRepositories;
function deleteFavoriteRepository(action) {
    var reponame, channelId, search, getRepositoriesResponse, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                reponame = action.payload.reponame;
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 1:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.select(repositories_1.selectSearchFavoriteRepositoriesTerm)];
            case 2:
                search = _a.sent();
                return [4 /*yield*/, effects_1.call(repositoriesAPI_1.fetchDeleteRepository, { reponame: reponame, channelId: channelId })];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.call(repositoriesAPI_1.fetchGetFavoriteRepositories, { channelId: channelId, search: search })];
            case 4:
                getRepositoriesResponse = _a.sent();
                return [4 /*yield*/, effects_1.put(repositoriesActionCreators_1.setFavoriteRepositoriesData(getRepositoriesResponse.data))];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}
exports.deleteFavoriteRepository = deleteFavoriteRepository;
function addStashRepositoryToFavorites(action) {
    var channelId, addedByName, reponame, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 1:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.select(auth_1.selectUsername)];
            case 2:
                addedByName = _a.sent();
                reponame = action.payload;
                return [4 /*yield*/, effects_1.call(repositoriesAPI_1.fetchAddStashRepositoryToFavorites, { reponame: reponame, channelId: channelId, addedByName: addedByName })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}
exports.addStashRepositoryToFavorites = addStashRepositoryToFavorites;
