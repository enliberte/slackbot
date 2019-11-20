import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";

interface IBuildStashNotification {
    (builder: IMsgBuilder, stashNotification: IStashNotification): IBlockMessage;
}

export interface IStashNotification {
    header: string;
    repositoryName: string;
    source: string;
    destination: string;
    comment?: string;
}

const buildStashNotification: IBuildStashNotification = (builder, stashNotification: IStashNotification) => {
    const {header, repositoryName, source, destination, comment} = stashNotification;
    builder.buildDivider().buildSection(header);
    if (comment) {
        builder.buildSection(comment);
    }
    builder
        .buildSectionWithFields([
            `*Source:* ${repositoryName} - ${source}`,
            `*Destination:* ${repositoryName} - ${destination}`
        ])
        .buildDivider();

    return builder.getMessage();
};

export default buildStashNotification;