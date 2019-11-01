"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var BaseController_1 = __importDefault(require("./BaseController"));
var URLS_1 = __importDefault(require("../../common/URLS"));
var JWT_DURATION = require('../../../config').JWT_DURATION;
var AuthController = /** @class */ (function (_super) {
    __extends(AuthController, _super);
    function AuthController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthController.prototype.setJWT = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sessions, newJWT;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.services.sessionService.list({ filter: { sid: req.params.token } })];
                    case 1:
                        sessions = _a.sent();
                        if (!(sessions.length !== 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.services.sessionService.delete(sessions[0])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.services.authService.createJWT({ channelId: sessions[0].channelId }, { expiresIn: JWT_DURATION })];
                    case 3:
                        newJWT = _a.sent();
                        res.cookie('token', newJWT, { httpOnly: true });
                        res.redirect('/');
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(401).send();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.refreshJWT = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var oldDecodedJWT, newJWT, newDecodedJWT;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.services.authService.verifyJWT(req.cookies.token)];
                    case 1:
                        oldDecodedJWT = _a.sent();
                        if (!oldDecodedJWT) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.services.authService.createJWT({ channelId: oldDecodedJWT.channelId }, { expiresIn: JWT_DURATION })];
                    case 2:
                        newJWT = _a.sent();
                        return [4 /*yield*/, this.services.authService.verifyJWT(newJWT)];
                    case 3:
                        newDecodedJWT = _a.sent();
                        res.cookie('token', newJWT, { httpOnly: true });
                        res.status(200).send({ exp: newDecodedJWT.exp });
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(401).send();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.postAuthData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var oldDecodedJWT, users, newJWT, newDecodedJWT, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.cookies && req.cookies.token)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.services.authService.verifyJWT(req.cookies.token)];
                    case 1:
                        oldDecodedJWT = _a.sent();
                        if (!oldDecodedJWT) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.services.userService.list({ filter: { channelId: oldDecodedJWT.channelId } })];
                    case 2:
                        users = _a.sent();
                        return [4 /*yield*/, this.services.authService.createJWT({ channelId: oldDecodedJWT.channelId }, { expiresIn: JWT_DURATION })];
                    case 3:
                        newJWT = _a.sent();
                        return [4 /*yield*/, this.services.authService.verifyJWT(newJWT)];
                    case 4:
                        newDecodedJWT = _a.sent();
                        res.cookie('token', newJWT, { httpOnly: true });
                        if (users.length > 0) {
                            user = users[0];
                            res.status(200).send(__assign(__assign({}, user), { exp: newDecodedJWT.exp }));
                        }
                        else {
                            res.status(200).send({ channelId: newDecodedJWT.channelId, exp: newDecodedJWT.exp });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(401).send();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        res.status(404).send();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.makeRouter = function () {
        this.router.get(URLS_1.default.LOGIN, this.setJWT.bind(this));
        this.router.get(URLS_1.default.REFRESH, this.refreshJWT.bind(this));
        this.router.get(URLS_1.default.API_AUTH, this.postAuthData.bind(this));
        return this.router;
    };
    return AuthController;
}(BaseController_1.default));
exports.default = AuthController;
