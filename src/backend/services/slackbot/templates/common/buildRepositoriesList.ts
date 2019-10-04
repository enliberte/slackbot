import {IRepository} from "../../../../db/models/RepositoryModel";
import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";

interface IBuildReposList {
    (builder: IMsgBuilder, repos: IRepository[]): IBlockMessage;
}

const buildRepositoriesList: IBuildReposList = (builder, repos) => {
    builder.buildDivider().buildSection('*Added repositories:*').buildDivider();
    repos.forEach(repo => {
        builder.buildSection(repo.reponame).buildDivider();
    });
    return builder.getMessage();
};

export default buildRepositoriesList;