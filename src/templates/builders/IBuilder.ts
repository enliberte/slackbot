import {IBlockMessage} from "./elements";

export interface IButtonProps {
    btnText: string;
    btnValue: string;
}

interface IMsgBuilder {
    buildChannelId(channelId: string): IMsgBuilder;
    buildSection(text: string): IMsgBuilder;
    buildDivider(): IMsgBuilder;
    buildSectionWithButton(text: string, button: IButtonProps): IMsgBuilder;
    buildActions(buttons: IButtonProps[]): IMsgBuilder;
    getMsg(): IBlockMessage;
}

export default IMsgBuilder;