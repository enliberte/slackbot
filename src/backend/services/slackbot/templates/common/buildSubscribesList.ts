import IMsgBuilder from "../builders/IBuilder";
import {IBlockMessage} from "../builders/elements";
import {ISubscribe} from "../../../../db/models/SubscribeModel";

interface IBuildSubscribesList {
    (builder: IMsgBuilder, subscribes: ISubscribe[]): IBlockMessage;
}

const buildSubscribesList: IBuildSubscribesList = (builder, subscribes) => {
    builder.buildDivider().buildSection("*Your subscribes:*").buildDivider();
    subscribes.forEach(subscribe => {
        builder.buildSectionWithFields([subscribe.reponame, subscribe.followed]).buildDivider();
    });
    return builder.getMessage();
};

export default buildSubscribesList;