import IMsgBuilder from "./IBuilder";
import {IButton, ISectionWithButton, IActions, ISection, IDivider, IBlockMessage} from "./elements";

class MsgBuilder implements IMsgBuilder {
    private msg: IBlockMessage;

    constructor() {
        this.msg = {
            blocks: []
        };
    }

    getMsg(): IBlockMessage {
        return this.msg;
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

    private getButton(text: string, value: string): IButton {
        return {
            type: "button",
            text: {
                type: "plain_text",
                text: text,
            },
            value: value
        };
    }

    private getSectionWithButton(text: string, btnText: string, btnValue: string): ISectionWithButton {
        return {
            ...this.getSection(text),
            accessory: this.getButton(btnText, btnValue)
        }
    }

    private getActions(buttons: {btnText: string, btnValue: string}[]): IActions {
        return {
            type: "actions",
            elements: buttons.map(button => this.getButton(button.btnText, button.btnValue))
        }
    }

    buildChannelId(channelId: string): IMsgBuilder {
        this.msg.channel = channelId;
        return this;
    }

    buildSection(text: string): IMsgBuilder {
        this.msg.blocks.push(this.getSection(text));
        return this;
    }

    buildDivider(): IMsgBuilder {
        const msgPart: IDivider = {
            "type": "divider"
        };
        this.msg.blocks.push(msgPart);
        return this;
    }

    buildSectionWithButton(text: string, btnText: string, btnValue: string): IMsgBuilder {
        this.msg.blocks.push(this.getSectionWithButton(text, btnText, btnValue));
        return this;
    }

    buildActions(buttons: {btnText: string; btnValue: string }[]): IMsgBuilder {
        this.msg.blocks.push(this.getActions(buttons));
        return this;
    }
}

export default MsgBuilder;