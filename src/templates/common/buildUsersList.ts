import {IUserWithFollowSign} from "../../db/models/userModel";
import IMsgBuilder from "../builders/IBuilder";
import {IBlockMessage} from "../builders/elements";

interface IBuildUsersList {
    (builder: IMsgBuilder, users: IUserWithFollowSign[], reponame?: string): IBlockMessage;
}

const buildUsersList: IBuildUsersList = (builder, users, reponame?) => {
    const headerSectionMsg = reponame ? "Your subscribes:" : "Added users:";
    const actionBtns = reponame ?
        [{btnText: 'Return', btnValue: 'return'}, {btnText: 'Close', btnValue: 'close'}] :
        [{btnText: 'Close', btnValue: 'close'}];
    builder.buildDivider().buildSection(headerSectionMsg);
    users.forEach(user => {
        let commandButton = {btnText: 'Delete', btnValue: `deleteUser_${user.username}`};
        if (reponame) {
            commandButton = {
                btnText: user.isFollowed ? 'Unfollow' : 'Follow',
                btnValue: user.isFollowed ? `unfollow_${user.username}_${reponame}` : `follow_${user.username}_${reponame}`
            };
        }
        builder.buildDivider().buildSectionWithButton(user.username, commandButton);
    });
    builder.buildDivider().buildActions(actionBtns).buildDivider();
    return builder.getMsg();
};

export default buildUsersList;