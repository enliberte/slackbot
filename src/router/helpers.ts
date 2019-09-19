import {WebClient} from '@slack/web-api';
import {IBlockMessage} from "../templates/builders/elements";
import {Response} from "express";
const {BOT_TOKEN} = require('../../config');
const web = new WebClient(BOT_TOKEN);


interface IPostMessage {
    (res: Response, msg: IBlockMessage, channel: string): void;
}


export const postMessage: IPostMessage = async (res, msg, channel) => {
    await web.chat.postMessage({text: '', ...msg, channel});
    res.status(200).send();
};