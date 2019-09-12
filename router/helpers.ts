import {WebClient} from '@slack/web-api';
import {IBlockMessage} from "../templates/builders/elements";
import {Response} from "express";
const {BOT_TOKEN} = require('./../config');
const web = new WebClient(BOT_TOKEN);


const postMessage: (res: Response, msg: IBlockMessage, channel: string) => void = async (res, msg, channel) => {
    await web.chat.postMessage({text: '', ...msg, channel});
    res.status(200).send();
};

export default postMessage;