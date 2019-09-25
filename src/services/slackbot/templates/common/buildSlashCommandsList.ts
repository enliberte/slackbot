import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";
import slashCommands from "../../slashCommands/slashCommands";

interface IBuildSlashCommandsList {
    (builder: IMsgBuilder): IBlockMessage;
}

const buildSlashCommandsList: IBuildSlashCommandsList = (builder) => {
    builder.buildDivider().buildSection('*I support the following commands*').buildDivider();
    slashCommands.forEach(slashCommand => {
        builder.buildSection(slashCommand.name).buildSection(slashCommand.description).buildSection(slashCommand.hint);
    });
    builder.buildDivider();
    return builder.getMessage();
};

export default buildSlashCommandsList;