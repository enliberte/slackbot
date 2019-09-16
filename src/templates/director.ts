import IMsgBuilder from "./builders/IBuilder";
import {IRepoRequired} from "../db/models/repoModel";
import {IUserWithFollowSign} from "../db/models/userModel";

class DirectorMsgBuilder {
    private builder: IMsgBuilder;

    constructor(builder: IMsgBuilder) {
        this.builder = builder;
    }

    buildReposList(repos: IRepoRequired[], btnText: string ='Select', command: string ='select') {
        this.builder.buildDivider();
        this.builder.buildSection('Select repository');
        repos.forEach(repo => {
            const {reponame} = repo;
            this.builder.buildDivider();
            this.builder.buildSectionWithButton(reponame, btnText, `${command}_${reponame}`);
        });
        this.builder.buildDivider();
        this.builder.buildActions([{btnText: 'Close', btnValue: 'close'}]);
        this.builder.buildDivider();
    }

    buildUsersList(users: IUserWithFollowSign[], reponame?: string) {
        const headerSectionMsg = reponame ? "Your subscribes:" : "Added users:";
        const actionBtns = reponame ?
            [{btnText: 'Return', btnValue: 'return'}, {btnText: 'Close', btnValue: 'close'}] :
            [{btnText: 'Close', btnValue: 'close'}];
        this.builder.buildDivider();
        this.builder.buildSection(headerSectionMsg);
        users.forEach(user => {
            let btnText = 'Delete';
            let btnValue = `deleteUser_${user.username}`;
            if (reponame) {
                btnText = user.isFollowed ? 'Unfollow' : 'Follow';
                btnValue = user.isFollowed ? `unfollow_${user.username}_${reponame}` : `follow_${user.username}_${reponame}`;
            }
            this.builder.buildDivider();
            this.builder.buildSectionWithButton(user.username, btnText, btnValue);
        });
        this.builder.buildDivider();
        this.builder.buildActions(actionBtns);
        this.builder.buildDivider();
    }
}

export default DirectorMsgBuilder;