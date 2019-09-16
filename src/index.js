"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var interactMsgRouter_1 = __importDefault(require("./router/interactMsgRouter"));
var userRouter_1 = __importDefault(require("./router/userRouter"));
var subscribeRouter_1 = __importDefault(require("./router/subscribeRouter"));
var repoRouter_1 = __importDefault(require("./router/repoRouter"));
var notifyRouter_1 = __importDefault(require("./router/notifyRouter"));
require('dotenv').config();
var port = process.env.PORT || 8080;
var app = express_1.default();
app.use(interactMsgRouter_1.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(userRouter_1.default);
app.use(subscribeRouter_1.default);
app.use(repoRouter_1.default);
app.use(notifyRouter_1.default);
app.listen(port);