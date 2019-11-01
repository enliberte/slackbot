import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";

interface IBuildAddUserResult {
    (builder: IMsgBuilder, addUserResult: string): IBlockMessage;
}

const buildAddUserResult: IBuildAddUserResult = (builder, addUserResult) => {
    builder.buildSection(addUserResult);
    return builder.getMessage();
};

export default buildAddUserResult;