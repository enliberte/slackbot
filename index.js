const express = require('express');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const InteractiveMessagesRouter = require('./router/interactMsgRouter');
const UserRouter = require('./router/userRouter');
const SubscribeRouter = require('./router/subscribeRouter');
const RepoRouter = require('./router/repoRouter');
const NotifyRouter = require('./router/notifyRouter');
require('dotenv').config();


const app = express();
app.use(InteractiveMessagesRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(UserRouter);
app.use(SubscribeRouter);
app.use(RepoRouter);
app.use(NotifyRouter);
app.listen(port);