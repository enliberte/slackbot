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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var repositoriesActions_1 = __importDefault(require("../../action_creators/repositories/repositoriesActions"));
var initialState = {
    favorites: {
        data: [],
    },
    stash: {
        data: [],
        isFavoriteOnly: false
    },
    isFetching: false
};
exports.default = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case repositoriesActions_1.default.SET_FAVORITE_REPOSITORIES:
            return __assign(__assign({}, state), { favorites: __assign(__assign({}, state.favorites), { data: action.payload }) });
        case repositoriesActions_1.default.SET_STASH_REPOSITORIES:
            return __assign(__assign({}, state), { stash: __assign(__assign({}, state.stash), { data: action.payload }) });
        case repositoriesActions_1.default.SEARCH_FAVORITE_REPOSITORIES:
            return __assign(__assign({}, state), { favorites: __assign(__assign({}, state.favorites), { search: action.payload }) });
        case repositoriesActions_1.default.FILTER_STASH_REPOSITORIES:
            return __assign(__assign({}, state), { stash: __assign(__assign({}, state.stash), { name: action.payload }) });
        case repositoriesActions_1.default.SET_IS_REPOSITORIES_FETCHING:
            return __assign(__assign({}, state), { isFetching: action.payload });
        case repositoriesActions_1.default.SET_IS_FAVORITE_ONLY:
            return __assign(__assign({}, state), { stash: __assign(__assign({}, state.stash), { isFavoriteOnly: action.payload }) });
        default:
            return state;
    }
});
