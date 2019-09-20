import {IRepoRequired} from "../../db/models/repoModel";
import {IBlockMessage} from "../builders/elements";
import IMsgBuilder, {IButtonProps} from "../builders/IBuilder";

interface IBuildReposList {
    (builder: IMsgBuilder, repos: IRepoRequired[], button: IButtonProps): IBlockMessage;
}

const buildReposList: IBuildReposList = (builder, repos, button) => {
    builder.buildDivider().buildSection('Select repository');
    repos.forEach(repo => {
        const commandButton = {btnText: button.btnText, btnValue: `${button.btnValue}_${repo.reponame}`};
        builder.buildDivider().buildSectionWithButton(repo.reponame, commandButton);
    });
    builder.buildDivider().buildActions([{btnText: 'Close', btnValue: 'close'}]).buildDivider();
    return builder.getMsg();
};

export default buildReposList;