import express from 'express';
import bodyParser from 'body-parser';
import InteractiveMessagesRouter from './router/InteractiveMessagesRouter';
import UserRouter from './router/UserRouter';
import SubscribeRouter from './router/SubscribeRouter';
import RepoRouter from './router/RepoRouter';
import ServicesFactory from "./services/factories/ServicesFactory";
import NotifyRouter from "./router/NotifyRouter";
import Services from "./services/Services";
import SignupRouter from "./router/SignupRouter";
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();
const services = new Services(new ServicesFactory());

app.use(new InteractiveMessagesRouter(services).makeRouter());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(new UserRouter(services).makeRouter());
app.use(new SubscribeRouter(services).makeRouter());
app.use(new RepoRouter(services).makeRouter());
app.use(new NotifyRouter(services).makeRouter());
app.use(new SignupRouter(services).makeRouter());
app.listen(port);