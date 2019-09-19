import {IBlockMessage} from "./elements";

interface IMsgBuilder {
    buildChannelId(channelId: string): IMsgBuilder;
    buildSection(text: string): IMsgBuilder;
    buildDivider(): IMsgBuilder;
    buildSectionWithButton(text: string, btnText: string, btnValue: string): IMsgBuilder;
    buildActions(buttons: {btnText: string, btnValue: string}[]): IMsgBuilder;
    getMsg(): IBlockMessage;
}

export default IMsgBuilder;