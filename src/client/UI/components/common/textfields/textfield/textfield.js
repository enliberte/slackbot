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
var react_1 = __importDefault(require("react"));
var deburr_1 = __importDefault(require("lodash/deburr"));
var core_1 = require("@material-ui/core");
var styles_1 = __importDefault(require("./styles"));
var react_autosuggest_1 = __importDefault(require("react-autosuggest"));
var match_1 = __importDefault(require("autosuggest-highlight/match"));
var parse_1 = __importDefault(require("autosuggest-highlight/parse"));
var Paper_1 = __importDefault(require("@material-ui/core/Paper"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var renderInputComponent = function (isValid, label, focused) { return function (inputProps) {
    // const inputEl = React.useRef<HTMLInputElement>(null);
    //
    // const focus = () => {
    //     if (focused && inputEl && inputEl.current) {
    //         inputEl.current.focus();
    //     }
    // };
    //
    // React.useEffect(focus, []);
    return (react_1.default.createElement(core_1.TextField, __assign({ autofocus: focused, required: true, error: !isValid, label: label, 
        // inputRef={inputEl}
        fullWidth: true }, inputProps)));
}; };
var renderSuggestion = function (suggestion, _a) {
    var query = _a.query, isHighlighted = _a.isHighlighted;
    var matches = match_1.default(suggestion, query);
    var parts = parse_1.default(suggestion, matches);
    return (react_1.default.createElement(MenuItem_1.default, { selected: isHighlighted, component: "div" },
        react_1.default.createElement("div", null, parts.map(function (part) { return (react_1.default.createElement("span", { key: part.text, style: { fontWeight: part.highlight ? 550 : 400 } }, part.text)); }))));
};
var AdminTextField = function (_a) {
    var value = _a.value, onChange = _a.onChange, isValid = _a.isValid, label = _a.label, focused = _a.focused, data = _a.data;
    var _b = react_1.default.useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var classes = styles_1.default();
    var getSuggestions = function (input) {
        var maxSuggestionsCount = 5;
        var inputValue = deburr_1.default(input.trim()).toLowerCase();
        return inputValue.length === 0 ? [] : data.filter(function (item) { return item.slice(0, inputValue.length).toLowerCase() === inputValue; }).slice(0, maxSuggestionsCount);
    };
    var handleSuggestionsFetchRequested = function (_a) {
        var value = _a.value;
        setSuggestions(getSuggestions(value));
    };
    var handleSuggestionsClearRequested = function () {
        setSuggestions([]);
    };
    var handleChange = function (event, _a) {
        var newValue = _a.newValue;
        return onChange(newValue);
    };
    var autosuggestProps = {
        renderInputComponent: renderInputComponent(isValid, label, focused),
        suggestions: suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue: function (suggestion) { return suggestion; },
        renderSuggestion: renderSuggestion,
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_autosuggest_1.default, __assign({}, autosuggestProps, { inputProps: {
                value: value,
                onChange: handleChange,
            }, theme: {
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
            }, renderSuggestionsContainer: function (options) { return (react_1.default.createElement(Paper_1.default, __assign({}, options.containerProps, { square: true }), options.children)); } }))));
};
exports.default = AdminTextField;
