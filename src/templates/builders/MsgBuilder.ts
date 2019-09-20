import IMsgBuilder, {IButtonProps} from "./IBuilder";
import {IButton, ISectionWithButton, IActions, ISection, IDivider, IBlockMessage} from "./elements";

class MsgBuilder implements IMsgBuilder {
    private static builderInstance: MsgBuilder;
    private msg: IBlockMessage;

    private constructor() {
        this.msg = {
            blocks: []
        };
    }

    static getInstance(): MsgBuilder {
        if (!MsgBuilder.builderInstance) {
            MsgBuilder.builderInstance = new MsgBuilder();
        }
        return MsgBuilder.builderInstance;
    }

    reset(): void {
        this.msg = {
            blocks: []
        };
    }

    getMsg(): IBlockMessage {
        const msg = this.msg;
        this.reset();
        return msg;
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

    private getSectionWithButton(text: string, button: IButtonProps): ISectionWithButton {
        return {
            ...this.getSection(text),
            accessory: this.getButton(button)
        }
    }

    private getActions(buttons: IButtonProps[]): IActions {
        return {
            type: "actions",
            elements: buttons.map(button => this.getButton(button))
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

    buildSectionWithButton(text: string, button: IButtonProps): IMsgBuilder {
        this.msg.blocks.push(this.getSectionWithButton(text, button));
        return this;
    }

    buildActions(buttons: {btnText: string; btnValue: string }[]): IMsgBuilder {
        this.msg.blocks.push(this.getActions(buttons));
        return this;
    }
}

export default MsgBuilder;