import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";


export default class DeveloperController extends BaseController {

    async postDevelopersList(req: Request, res: Response): Promise<void> {
        const developersList = await this.services.developerService.list(req.body.filters);
        res.send(developersList);
    }

    async postStashDevelopersList(req: Request, res: Response): Promise<void> {
        const developersList = await this.services.stashDeveloperService.list(req.body.filters);
        res.send(developersList);
    }

    async postDeveloperDeleteResult(req: Request, res: Response): Promise<void> {
        const developerDeleteResult = await this.services.developerService.delete(req.body.filters);
        const code = developerDeleteResult ? 200 : 404;
        res.status(code).send();
    }

    async postAddStashDeveloperToFavoritesResult(req: Request, res: Response): Promise<void> {
        const addStashDeveloperToFavoritesResult = await this.services.developerService.add(req.body.developer);
        const code = addStashDeveloperToFavoritesResult ? 200 : 404;
        res.status(code).send();
    }

    makeRouter(): Router {
        this.router.post('/api/developers/get', userAuth, this.postDevelopersList.bind(this));
        this.router.post('/api/developers/add', userAuth, this.postAddStashDeveloperToFavoritesResult.bind(this));
        this.router.post('/api/stash/developers/get', userAuth, this.postStashDevelopersList.bind(this));
        this.router.post('/api/developers/delete', userAuth, this.postDeveloperDeleteResult.bind(this));
        return this.router;
    }
}