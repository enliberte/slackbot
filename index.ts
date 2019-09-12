import express from 'express';
import bodyParser from 'body-parser';
import InteractiveMessagesRouter from './router/interactMsgRouter';
import UserRouter from './router/userRouter';
import SubscribeRouter from './router/subscribeRouter';
import RepoRouter from './router/repoRouter';
import NotifyRouter from './router/notifyRouter';
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();
app.use(InteractiveMessagesRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(UserRouter);
app.use(SubscribeRouter);
app.use(RepoRouter);
app.use(NotifyRouter);
app.listen(port);