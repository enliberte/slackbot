const express = require('express');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const {InteractiveMessagesRouter, UserRouter, SubscribeRouter, RepoRouter, NotifyRouter} = require('./router');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(InteractiveMessagesRouter);
app.use(UserRouter);
app.use(SubscribeRouter);
app.use(RepoRouter);
app.use(NotifyRouter);
app.listen(port);