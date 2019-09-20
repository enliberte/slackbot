import API from "../api/API";
import {Router} from "express";

export default abstract class BaseRouter {
    protected api: API;
    protected router: Router;

    constructor(api: API) {
        this.api = api;
        this.router = Router();
        this.addListeners();
    }

    abstract addListeners(): void;

    getRouter(): Router {
        return this.router;
    }
}