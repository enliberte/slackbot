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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
console.log(1);
app.use(InteractiveMessagesRouter);
console.log(2);
app.use(UserRouter);
console.log(3);
app.use(SubscribeRouter);
console.log(4);
app.use(RepoRouter);
console.log(5);
app.use(NotifyRouter);
console.log(6);
app.listen(port);