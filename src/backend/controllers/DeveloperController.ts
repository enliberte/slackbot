import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";
import URLS from "../../common/URLS";


export default class DeveloperController extends BaseController {

    async postDevelopersList(req: Request, res: Response): Promise<void> {
        const {search, limit, ...filter} = req.query;
        const developersList = await this.services.developerService.list({filter, search, limit});
        res.send(developersList);
    }

    async postStashDevelopersList(req: Request, res: Response): Promise<void> {
        const developersList = await this.services.stashDeveloperService.list(req.query);
        res.send(developersList);
    }

    async postDeveloperDeleteResult(req: Request, res: Response): Promise<void> {
        const developerDeleteResult = await this.services.developerService.delete(req.query);
        const code = developerDeleteResult ? 200 : 404;
        res.status(code).send();
    }

    async postAddStashDeveloperToFavoritesResult(req: Request, res: Response): Promise<void> {
        const addStashDeveloperToFavoritesResult = await this.services.developerService.add(req.body);
        const code = addStashDeveloperToFavoritesResult ? 200 : 404;
        res.status(code).send();
    }

    makeRouter(): Router {
        this.router.get(URLS.API_FAVORITE_DEVELOPERS, userAuth, this.postDevelopersList.bind(this));
        this.router.post(URLS.API_FAVORITE_DEVELOPERS, userAuth, this.postAddStashDeveloperToFavoritesResult.bind(this));
        this.router.get(URLS.API_STASH_DEVELOPERS, userAuth, this.postStashDevelopersList.bind(this));
        this.router.delete(URLS.API_FAVORITE_DEVELOPERS, userAuth, this.postDeveloperDeleteResult.bind(this));
        return this.router;
    }
}