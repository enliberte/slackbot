import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import InteractiveMessagesController from './controllers/InteractiveMessagesController';
import DeveloperController from './controllers/DeveloperController';
import SubscribeController from './controllers/SubscribeController';
import RepositoryController from './controllers/RepositoryController';
import ServicesFactory from "./services/factories/ServicesFactory";
import NotifyController from "./controllers/NotifyController";
import Services from "./services/Services";
import AuthController from "./controllers/AuthController";
import MainController from "./controllers/MainController";
import HelpController from "./controllers/HelpController";
require('dotenv').config();


const port = process.env.PORT || 8080;
const app = express();
const services = new Services(new ServicesFactory());


app.use(new InteractiveMessagesController(services).makeRouter());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(new AuthController(services).makeRouter());
app.use(new HelpController(services).makeRouter());
app.use(new DeveloperController(services).makeRouter());
app.use(new SubscribeController(services).makeRouter());
app.use(new RepositoryController(services).makeRouter());
app.use(new NotifyController(services).makeRouter());
app.use(new MainController(services).makeRouter());
app.listen(port);