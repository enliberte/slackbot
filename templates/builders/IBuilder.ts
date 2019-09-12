interface IMsgBuilder {
    buildChannelId(channelId: string): void;
    buildSection(text: string): void;
    buildDivider(): void;
    buildSectionWithButton(text: string, btnText: string, btnValue: string): void;
    buildActions(buttons: {btnText: string, btnValue: string}[]): void;
}

export default IMsgBuilder;