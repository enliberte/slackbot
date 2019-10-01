import {IBlockMessage} from "./elements";

export interface IButtonProps {
    btnText: string;
    btnValue: string;
}

interface IMessageBuilder {
    buildChannelId(channelId: string): IMessageBuilder;
    buildSection(text: string): IMessageBuilder;
    buildDivider(): IMessageBuilder;
    buildSectionWithButton(text: string, button: IButtonProps): IMessageBuilder;
    buildSectionWithFields(fields: string[]): IMessageBuilder;
    buildActions(buttons: IButtonProps[]): IMessageBuilder;
    getMessage(): IBlockMessage;
}

export default IMessageBuilder;