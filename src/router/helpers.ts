import {IBlockMessage} from "../templates/builders/elements";
import {Response} from "express";
import WebChatAdapter from "../api/slackbot/adapters/WebChatAdapter";


interface IPostMessage {
    (res: Response, msg: IBlockMessage, channelId: string): void;
}

export const postMessage: IPostMessage = async (res, msg, channelId) => {
    await new WebChatAdapter().post({text: '', msg, channelId});
    res.status(200).send();
};