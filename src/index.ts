import express from 'express';
import bodyParser from 'body-parser';
import InteractiveMessagesRouter from './router/interactMsgRouter';
import UserRouter from './router/UserRouter';
import SubscribeRouter from './router/SubscribeRouter';
import RepoRouter from './router/RepoRouter';
import APIFactory from "./api/factories/APIFactory";
import NotifyRouter from "./router/NotifyRouter";
import API from "./api/API";
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();
const api = new API(new APIFactory());

app.use(new InteractiveMessagesRouter(api).getRouter());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(new UserRouter(api).getRouter());
app.use(new SubscribeRouter(api).getRouter());
app.use(new RepoRouter(api).getRouter());
app.use(new NotifyRouter(api).getRouter());
app.listen(port);