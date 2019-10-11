import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";
import URLS from "../../common/URLS";


export default class RepositoryController extends BaseController {

    async postRepositoriesList(req: Request, res: Response): Promise<void> {
        const {search, limit, ...filter} = req.query;
        const repositoriesList = await this.services.repositoryService.list({search, limit, filter});
        res.send(repositoriesList);
    }

    async postStashRepositoriesList(req: Request, res: Response): Promise<void> {
        const repositoriesList = await this.services.stashRepositoryService.list(req.query);
        res.send(repositoriesList);
    }

    async postRepositoryDeleteResult(req: Request, res: Response): Promise<void> {
        const repositoryDeleteResult = await this.services.repositoryService.delete(req.query);
        const code = repositoryDeleteResult ? 200 : 404;
        res.status(code).send();
    }

    async postAddStashRepositoryToFavoritesResult(req: Request, res: Response): Promise<void> {
        const addStashRepositoryToFavoritesResult = await this.services.repositoryService.add(req.body);
        const code = addStashRepositoryToFavoritesResult ? 200 : 404;
        res.status(code).send();
    }

    makeRouter(): Router {
        this.router.get(URLS.API_FAVORITE_REPOSITORIES, userAuth, this.postRepositoriesList.bind(this));
        this.router.post(URLS.API_FAVORITE_REPOSITORIES, userAuth, this.postAddStashRepositoryToFavoritesResult.bind(this));
        this.router.get(URLS.API_STASH_REPOSITORIES, userAuth, this.postStashRepositoriesList.bind(this));
        this.router.delete(URLS.API_FAVORITE_REPOSITORIES, userAuth, this.postRepositoryDeleteResult.bind(this));
        return this.router;
    }
}