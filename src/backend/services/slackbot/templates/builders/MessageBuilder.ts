import IMessageBuilder, {IButtonProps} from "./IBuilder";
import {
    IButton,
    ISectionWithButton,
    IActions,
    ISection,
    IDivider,
    IBlockMessage,
    IMrkdwnText,
    ISectionWithFields
} from "./elements";

class MessageBuilder implements IMessageBuilder {
    private message: IBlockMessage;

    constructor() {
        this.message = {
            blocks: []
        };
    }

    getMessage(): IBlockMessage {
        return this.message;
    }

    private getSection(text: string): ISection {
        return {
            type: "section",
            text: {
                type: "mrkdwn",
                text: text,
            }
        }
    }

    private getButton(button: IButtonProps): IButton {
        const {btnText, btnValue} = button;
        return {
            type: "button",
            text: {
                type: "plain_text",
                text: btnText,
            },
            value: btnValue
        };
    }

    private getField(text: string): IMrkdwnText {
        return {type: "mrkdwn", text};
    }

    private getSectionWithButton(text: string, button: IButtonProps): ISectionWithButton {
        return {
            ...this.getSection(text),
            accessory: this.getButton(button)
        };
    }

    private getSectionWithFields(fields: string[]): ISectionWithFields {
        return {
            type: "section",
            fields: fields.map(field => this.getField(field))
        };
    }

    private getActions(buttons: IButtonProps[]): IActions {
        return {
            type: "actions",
            elements: buttons.map(button => this.getButton(button))
        };
    }

    buildChannelId(channelId: string): IMessageBuilder {
        this.message.channel = channelId;
        return this;
    }

    buildSection(text: string): IMessageBuilder {
        this.message.blocks.push(this.getSection(text));
        return this;
    }

    buildDivider(): IMessageBuilder {
        const msgPart: IDivider = {
            "type": "divider"
        };
        this.message.blocks.push(msgPart);
        return this;
    }

    buildSectionWithButton(text: string, button: IButtonProps): IMessageBuilder {
        this.message.blocks.push(this.getSectionWithButton(text, button));
        return this;
    }

    buildActions(buttons: {btnText: string; btnValue: string }[]): IMessageBuilder {
        this.message.blocks.push(this.getActions(buttons));
        return this;
    }

    buildSectionWithFields(fields: string[]): IMessageBuilder {
        this.message.blocks.push(this.getSectionWithFields(fields));
        return this;
    }
}

export default MessageBuilder;