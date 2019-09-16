"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MONGO_URI = require('../../../config').MONGO_URI;
mongoose_1.connect(MONGO_URI, { useNewUrlParser: true, keepAlive: true });
var BaseController = /** @class */ (function () {
    function BaseController(model) {
        this.model = model;
    }
    BaseController.prototype.add = function (obj) {
        return this.model.update(obj, {}, { upsert: true }).exec();
    };
    BaseController.prototype.remove = function (filter) {
        return this.model.deleteMany(filter).exec();
    };
    return BaseController;
}());
exports.default = BaseController;
