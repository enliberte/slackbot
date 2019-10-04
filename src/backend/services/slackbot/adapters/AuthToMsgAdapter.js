"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SIGN_IN_URL = require('../../../../../config').SIGN_IN_URL;
var AuthToMessageAdapter = /** @class */ (function () {
    function AuthToMessageAdapter(authService) {
        this.authService = authService;
    }
    AuthToMessageAdapter.prototype.getCreateAuthLinkMsg = function (builder, payload) {
        var jwt = this.authService.createJWT(payload, { expiresIn: '1m' });
        var text = "To sign in to admin site please follow " + SIGN_IN_URL + "/" + jwt;
        return builder.buildSection(text).buildDivider().getMessage();
    };
    return AuthToMessageAdapter;
}());
exports.default = AuthToMessageAdapter;
