import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";
import {commandsDescription} from "../../commands/commands";

interface IBuildCommandsList {
    (builder: IMsgBuilder): IBlockMessage;
}

const buildCommandsList: IBuildCommandsList = (builder) => {
    builder.buildDivider().buildSection('*I support the following commands:*').buildDivider();
    commandsDescription.forEach((command, idx) => {
        builder
            .buildSectionWithFields([`*${idx + 1}) ${command.name}*`, command.description])
            .buildSection(command.hint)
            .buildDivider();
    });
    return builder.getMessage();
};

export default buildCommandsList;