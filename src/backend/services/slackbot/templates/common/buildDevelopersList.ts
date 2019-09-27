import {IDeveloperWithFollowSign} from "../../../../db/models/DeveloperModel";
import IMsgBuilder from "../builders/IBuilder";
import {IBlockMessage} from "../builders/elements";

interface IBuildDevelopersList {
    (builder: IMsgBuilder, developers: IDeveloperWithFollowSign[], reponame?: string): IBlockMessage;
}

const buildDevelopersList: IBuildDevelopersList = (builder, developers, reponame?) => {
    const headerSectionMsg = reponame ? "*Your subscribes:*" : "*Added developers:*";
    const actionBtns = reponame ?
        [{btnText: 'Return', btnValue: 'return'}, {btnText: 'Close', btnValue: 'close'}] :
        [{btnText: 'Close', btnValue: 'close'}];
    builder.buildDivider().buildSection(headerSectionMsg);
    developers.forEach(developer => {
        let commandButton = {btnText: 'Delete', btnValue: `deleteDeveloper_${developer.username}`};
        if (reponame) {
            commandButton = {
                btnText: developer.isFollowed ? 'Unfollow' : 'Follow',
                btnValue: developer.isFollowed ? `unfollow_${developer.username}_${reponame}` : `follow_${developer.username}_${reponame}`
            };
        }
        builder.buildDivider().buildSectionWithButton(developer.username, commandButton);
    });
    builder.buildDivider().buildActions(actionBtns).buildDivider();
    return builder.getMessage();
};

export default buildDevelopersList;