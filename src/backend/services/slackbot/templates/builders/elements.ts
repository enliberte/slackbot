interface IText {
    text: string;
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

interface ISectionWithFields {
    type: "section";
    fields: IMrkdwnText[];
}

interface IActions {
    type: "actions",
    elements: IButton[]
}

type Blocks = ISection | IButton | ISectionWithButton | ISectionWithFields | IActions | IDivider

interface IBlockMessage {
    channel?: string;
    blocks: Blocks[];
}

export {IMrkdwnText, IButton, ISection, IActions, ISectionWithButton, ISectionWithFields, IText, IDivider, IBlockMessage}