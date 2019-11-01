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
var developersAPI_1 = require("../../../API/developersAPI");
var developersActionCreators_1 = require("../../action_creators/developers/developersActionCreators");
var auth_1 = require("../../selectors/auth");
function getFavoriteDevelopers(action) {
    var channelId, search, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, 5, 6]);
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 1:
                channelId = _a.sent();
                search = '';
                return [4 /*yield*/, effects_1.call(developersAPI_1.fetchGetFavoriteDevelopers, { channelId: channelId, search: search })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.setFavoriteDevelopersData(response.data))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 5: return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}
exports.getFavoriteDevelopers = getFavoriteDevelopers;
function getStashDevelopers(action) {
    var channelId, response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, 6, 8]);
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.setIsDevelopersFetching(true))];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 2:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.call(developersAPI_1.fetchGetStashDevelopers, { channelId: channelId })];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.setStashDevelopersData(response.data))];
            case 4:
                _a.sent();
                return [3 /*break*/, 8];
            case 5:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, effects_1.put(developersActionCreators_1.setIsDevelopersFetching(false))];
            case 7:
                _a.sent();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}
exports.getStashDevelopers = getStashDevelopers;
function deleteFavoriteDeveloper(action) {
    var channelId, getStashDevelopersResponse, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, 7, 9]);
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 1:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.setIsDevelopersFetching(true))];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.call(developersAPI_1.fetchDeleteDeveloper, __assign(__assign({}, action.payload), { channelId: channelId }))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.call(developersAPI_1.fetchGetStashDevelopers, { channelId: channelId })];
            case 4:
                getStashDevelopersResponse = _a.sent();
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.setStashDevelopersData(getStashDevelopersResponse.data))];
            case 5:
                _a.sent();
                return [3 /*break*/, 9];
            case 6:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, effects_1.put(developersActionCreators_1.setIsDevelopersFetching(false))];
            case 8:
                _a.sent();
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
exports.deleteFavoriteDeveloper = deleteFavoriteDeveloper;
function addStashDeveloperToFavorites(action) {
    var channelId, addedByName, username, getStashDevelopersResponse, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, 8, 10]);
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 1:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.select(auth_1.selectStashDisplayName)];
            case 2:
                addedByName = _a.sent();
                username = action.payload.username;
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.setIsDevelopersFetching(true))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.call(developersAPI_1.fetchAddStashDeveloperToFavorites, { username: username, channelId: channelId, addedByName: addedByName })];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.call(developersAPI_1.fetchGetStashDevelopers, { channelId: channelId })];
            case 5:
                getStashDevelopersResponse = _a.sent();
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.setStashDevelopersData(getStashDevelopersResponse.data))];
            case 6:
                _a.sent();
                return [3 /*break*/, 10];
            case 7:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, effects_1.put(developersActionCreators_1.setIsDevelopersFetching(false))];
            case 9:
                _a.sent();
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}
exports.addStashDeveloperToFavorites = addStashDeveloperToFavorites;
