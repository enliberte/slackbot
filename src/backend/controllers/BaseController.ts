import Services from "../services/Services";
import {Router} from "express";


export interface IRouter {
    makeRouter(): Router;
}

export default abstract class BaseController implements IRouter {
    protected services: Services;
    protected router: Router;

    constructor(services: Services) {
        this.services = services;
        this.router = Router();
    }

    abstract makeRouter(): Router;
}