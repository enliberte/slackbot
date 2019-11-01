import {IBlockMessage} from "../builders/elements";
import IMsgBuilder from "../builders/IBuilder";

interface IBuildGreetings {
    (builder: IMsgBuilder, isAuth: boolean, name: string): IBlockMessage;
}

const purpose = "I can notify you about new pull requests " +
    "according to your subscriptions and pull requests where you was mentioned in comments or selected as reviewer";
const requestForStashName = "To do that could you please tell me your *name in stash* (for instance *I'm Sergey Popov*)";
const help = "To see whole list of commands you should write *help*";


const buildGreeting: IBuildGreetings = (builder, isAuth, name) => {
    const greeting = isAuth ? `Welcome back, ${name}!` : "Hi! I\'m *StashBot*";
    builder.buildDivider().buildSection(greeting).buildSection(purpose);
    if (!isAuth) {
        builder.buildSection(requestForStashName);
    }
    builder.buildSection(help);
    return builder.getMessage();
};

export default buildGreeting;