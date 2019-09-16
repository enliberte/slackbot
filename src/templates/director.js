"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectorMsgBuilder = /** @class */ (function () {
    function DirectorMsgBuilder(builder) {
        this.builder = builder;
    }
    DirectorMsgBuilder.prototype.buildReposList = function (repos, btnText, command) {
        var _this = this;
        if (btnText === void 0) { btnText = 'Select'; }
        if (command === void 0) { command = 'select'; }
        this.builder.buildDivider();
        this.builder.buildSection('Select repository');
        repos.forEach(function (repo) {
            var reponame = repo.reponame;
            _this.builder.buildDivider();
            _this.builder.buildSectionWithButton(reponame, btnText, command + "_" + reponame);
        });
        this.builder.buildActions([{ btnText: 'Close', btnValue: 'close' }]);
        this.builder.buildDivider();
    };
    DirectorMsgBuilder.prototype.buildUsersList = function (users, reponame) {
        var _this = this;
        var headerSectionMsg = reponame ? "Your subscribes:" : "Added users:";
        var actionBtns = reponame ?
            [{ btnText: 'Return', btnValue: 'return' }, { btnText: 'Close', btnValue: 'close' }] :
            [{ btnText: 'Close', btnValue: 'close' }];
        this.builder.buildDivider();
        this.builder.buildSection(headerSectionMsg);
        users.forEach(function (user) {
            var btnText = 'Delete';
            var btnValue = "deleteUser_" + user.username;
            if (reponame) {
                btnText = user.isFollowed ? 'Unfollow' : 'Follow';
                btnValue = user.isFollowed ? "unfollow_" + user.username + "_" + reponame : "follow_" + user.username + "_" + reponame;
            }
            _this.builder.buildDivider();
            _this.builder.buildSectionWithButton(user.username, btnText, btnValue);
        });
        this.builder.buildActions(actionBtns);
        this.builder.buildDivider();
    };
    return DirectorMsgBuilder;
}());
exports.default = DirectorMsgBuilder;
