import {IRepoRequired} from "../../db/models/repoModel";
import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";

interface IBuildReposList {
    (builder: IMsgBuilder, repos: IRepoRequired[], btnText: string, command: string): IBlockMessage;
}

const buildReposList: IBuildReposList = (builder, repos, btnText = 'Select', command = 'select') => {
    builder.buildDivider().buildSection('Select repository');
    repos.forEach(repo => {
        const {reponame} = repo;
        builder.buildDivider().buildSectionWithButton(reponame, btnText, `${command}_${reponame}`);
    });
    builder.buildDivider().buildActions([{btnText: 'Close', btnValue: 'close'}]).buildDivider();
    return builder.getMsg();
};

export default buildReposList;