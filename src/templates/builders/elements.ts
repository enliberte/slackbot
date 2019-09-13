interface IText {
    text: string;
}

interface IChannelId {
    channel: string;
}

interface IMrkdwnText extends IText {
    type: "mrkdwn";
}

interface IPlainText extends IText {
    type: "plain_text";
}

interface IDivider {
    type: "divider"
}

interface ISection {
    type: "section";
    text: IMrkdwnText;
}

interface IButton {
    type: "button",
    text: IPlainText,
    value: string
}

interface ISectionWithButton extends ISection {
    accessory: IButton
}

interface IActions {
    type: "actions",
    elements: IButton[]
}

type Blocks = ISection | IButton | ISectionWithButton | IActions | IDivider

interface IBlockMessage {
    channel?: string;
    blocks: Blocks[];
}

export {IButton, ISection, IActions, ISectionWithButton, IText, IDivider, IBlockMessage}