import IMsgBuilder from "../builders/IBuilder";
import {IBlockMessage} from "../builders/elements";
import {IFavoriteDeveloper} from "../../../../db/models/developer/favorite/FavoriteDeveloperModel";

interface IBuildDevelopersList {
    (builder: IMsgBuilder, developers: IFavoriteDeveloper[]): IBlockMessage;
}

const buildDevelopersList: IBuildDevelopersList = (builder, developers) => {
    builder.buildDivider().buildSection("*Added developers:*").buildDivider();
    developers.forEach(developer => {
        builder.buildSection(developer.username).buildDivider();
    });
    return builder.getMessage();
};

export default buildDevelopersList;