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
var subscribesActionCreators_1 = require("../../action_creators/subscribes/subscribesActionCreators");
var subscribesAPI_1 = require("../../../API/subscribesAPI");
var auth_1 = require("../../selectors/auth");
var subscribes_1 = require("../../selectors/subscribes");
var developersActionCreators_1 = require("../../action_creators/developers/developersActionCreators");
var repositoriesActionCreators_1 = require("../../action_creators/repositories/repositoriesActionCreators");
function getSubscribes(action) {
    var channelId, subscribeFilters, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 1:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.select(subscribes_1.selectSubscribeFilters)];
            case 2:
                subscribeFilters = _a.sent();
                return [4 /*yield*/, effects_1.call(subscribesAPI_1.fetchGetSubscribes, __assign(__assign({}, subscribeFilters), { channelId: channelId }))];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, effects_1.put(subscribesActionCreators_1.setSubscribesData(response.data))];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}
exports.getSubscribes = getSubscribes;
function saveSubscribe(action) {
    var channelId, follower, _a, followed, reponame, addSubscribeResponse, isSuccess, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 1:
                channelId = _b.sent();
                return [4 /*yield*/, effects_1.select(auth_1.selectUsername)];
            case 2:
                follower = _b.sent();
                return [4 /*yield*/, effects_1.select(subscribes_1.selectSubscribe)];
            case 3:
                _a = _b.sent(), followed = _a.followed, reponame = _a.reponame;
                return [4 /*yield*/, effects_1.call(subscribesAPI_1.fetchSaveSubscribe, { followed: followed, follower: follower, reponame: reponame, channelId: channelId })];
            case 4:
                addSubscribeResponse = _b.sent();
                isSuccess = addSubscribeResponse.data;
                return [4 /*yield*/, effects_1.put(subscribesActionCreators_1.setIsSuccess(isSuccess))];
            case 5:
                _b.sent();
                return [4 /*yield*/, effects_1.put(subscribesActionCreators_1.toggleEditingWindow())];
            case 6:
                _b.sent();
                return [4 /*yield*/, effects_1.put(subscribesActionCreators_1.runGetSubscribesSaga())];
            case 7:
                _b.sent();
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.runGetFavoriteDevelopersSaga())];
            case 8:
                _b.sent();
                return [4 /*yield*/, effects_1.put(repositoriesActionCreators_1.runGetFavoriteRepositoriesSaga())];
            case 9:
                _b.sent();
                return [3 /*break*/, 11];
            case 10:
                err_2 = _b.sent();
                console.log(err_2);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}
exports.saveSubscribe = saveSubscribe;
function editSubscribe(action) {
    var channelId, follower, subscribeData, editSubscribeResponse, isSuccess, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                return [4 /*yield*/, effects_1.select(auth_1.selectChannelId)];
            case 1:
                channelId = _a.sent();
                return [4 /*yield*/, effects_1.select(auth_1.selectUsername)];
            case 2:
                follower = _a.sent();
                return [4 /*yield*/, effects_1.select(subscribes_1.selectSubscribe)];
            case 3:
                subscribeData = _a.sent();
                return [4 /*yield*/, effects_1.call(subscribesAPI_1.fetchEditSubscribe, __assign({ follower: follower, channelId: channelId }, subscribeData))];
            case 4:
                editSubscribeResponse = _a.sent();
                isSuccess = editSubscribeResponse.data;
                return [4 /*yield*/, effects_1.put(subscribesActionCreators_1.setIsSuccess(isSuccess))];
            case 5:
                _a.sent();
                return [4 /*yield*/, effects_1.put(subscribesActionCreators_1.toggleEditingWindow())];
            case 6:
                _a.sent();
                return [4 /*yield*/, effects_1.put(subscribesActionCreators_1.runGetSubscribesSaga())];
            case 7:
                _a.sent();
                return [4 /*yield*/, effects_1.put(developersActionCreators_1.runGetFavoriteDevelopersSaga())];
            case 8:
                _a.sent();
                return [4 /*yield*/, effects_1.put(repositoriesActionCreators_1.runGetFavoriteRepositoriesSaga())];
            case 9:
                _a.sent();
                return [3 /*break*/, 11];
            case 10:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}
exports.editSubscribe = editSubscribe;
function deleteSubscribe(action) {
    var deleteSubscribeResponse, isSuccess, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, effects_1.call(subscribesAPI_1.fetchDeleteSubscribe, action.payload)];
            case 1:
                deleteSubscribeResponse = _a.sent();
                isSuccess = deleteSubscribeResponse.data;
                return [4 /*yield*/, effects_1.put(subscribesActionCreators_1.runGetSubscribesSaga())];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}
exports.deleteSubscribe = deleteSubscribe;
