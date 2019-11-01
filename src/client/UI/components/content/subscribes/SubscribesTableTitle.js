"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var react_redux_1 = require("react-redux");
var SubscribesTableTitle = function (_a) {
    var massOperationOpened = _a.massOperationOpened, setMassOperationOpened = _a.setMassOperationOpened, deleteSelectedSubscribes = _a.deleteSelectedSubscribes, clearSelectedSubscribes = _a.clearSelectedSubscribes;
    var toggleMassOperation = function () {
        clearSelectedSubscribes();
        setMassOperationOpened(!massOperationOpened);
    };
    return (react_1.default.createElement(core_1.Grid, { container: true, spacing: 3 },
        react_1.default.createElement(core_1.Grid, { item: true },
            react_1.default.createElement(Typography_1.default, { variant: "h6", style: { lineHeight: 2 } }, "Subscribes"))));
};
var mapDispatchToProps = function (dispatch) { return ({
    clearSelectedSubscribes: function () {
    },
    deleteSelectedSubscribes: function () {
    }
}); };
exports.default = react_redux_1.connect(mapDispatchToProps)(SubscribesTableTitle);
