import IMsgBuilder from "../builders/IBuilder";
import {IBlockMessage} from "../builders/elements";
import {IDeveloper} from "../../../../db/models/DeveloperModel";

interface IBuildDevelopersList {
    (builder: IMsgBuilder, developers: IDeveloper[]): IBlockMessage;
}

const buildDevelopersList: IBuildDevelopersList = (builder, developers) => {
    builder.buildDivider().buildSection("*Added developers:*").buildDivider();
    developers.forEach(developer => {
        builder.buildSection(developer.username).buildDivider();
    });
    return builder.getMessage();
};

export default buildDevelopersList;