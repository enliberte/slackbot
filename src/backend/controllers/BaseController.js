"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BaseController = /** @class */ (function () {
    function BaseController(services) {
        this.services = services;
        this.router = express_1.Router();
    }
    return BaseController;
}());
exports.default = BaseController;
