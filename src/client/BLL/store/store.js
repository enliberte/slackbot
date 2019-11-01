"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_saga_1 = __importDefault(require("redux-saga"));
var auth_1 = __importDefault(require("./reducers/auth/auth"));
var developers_1 = __importDefault(require("./reducers/developers/developers"));
var repositories_1 = __importDefault(require("./reducers/repositories/repositories"));
var subscribes_1 = __importDefault(require("./reducers/subscribes/subscribes"));
var newSubscribe_1 = __importDefault(require("./reducers/subscribes/newSubscribe"));
var settings_1 = __importDefault(require("./reducers/settings/settings"));
var rootSaga_1 = __importDefault(require("./sagas/rootSaga"));
var sagaMiddleware = redux_saga_1.default();
var store = redux_1.createStore(redux_1.combineReducers({
    auth: auth_1.default,
    settings: settings_1.default,
    developers: developers_1.default,
    repositories: repositories_1.default,
    subscribes: subscribes_1.default,
    subscribe: newSubscribe_1.default,
}), redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga_1.default);
exports.default = store;
