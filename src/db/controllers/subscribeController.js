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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var subscribeModel_1 = require("../models/subscribeModel");
var baseController_1 = __importDefault(require("./baseController"));
var SubscribeController = /** @class */ (function (_super) {
    __extends(SubscribeController, _super);
    function SubscribeController() {
        return _super.call(this, subscribeModel_1.SubscribeModel) || this;
    }
    SubscribeController.prototype.get = function (filter) {
        return this.model.find(filter).sort({ reponame: 1 }).exec();
    };
    return SubscribeController;
}(baseController_1.default));
exports.default = SubscribeController;
