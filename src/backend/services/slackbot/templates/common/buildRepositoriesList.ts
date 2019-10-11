import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";
import {IFavoriteRepository} from "../../../../db/models/repository/favorite/FavoriteRepositoryModel";

interface IBuildReposList {
    (builder: IMsgBuilder, repos: IFavoriteRepository[]): IBlockMessage;
}

const buildRepositoriesList: IBuildReposList = (builder, repos) => {
    builder.buildDivider().buildSection('*Added repositories:*').buildDivider();
    repos.forEach(repo => {
        builder.buildSection(repo.reponame).buildDivider();
    });
    return builder.getMessage();
};

export default buildRepositoriesList;