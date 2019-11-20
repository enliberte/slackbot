import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";
import EM from "../../../ServiceErrorMessages";

interface IBuildNotAddedStashData {
    (builder: IMsgBuilder): IBlockMessage;
}

const buildNotAddedStashData: IBuildNotAddedStashData = (builder) => {
    builder.buildSection(EM.STASH_NAME_NOT_GIVEN);
    return builder.getMessage();
};

export default buildNotAddedStashData;