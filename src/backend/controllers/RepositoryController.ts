import {Request, Response, Router} from "express";
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";


export default class RepositoryController extends BaseController {

    async postRepositoriesList(req: Request, res: Response): Promise<void> {
        const repositoriesList = await this.services.repositoryService.list(req.body.filters);
        res.send(repositoriesList);
    }

    async postStashRepositoriesList(req: Request, res: Response): Promise<void> {
        const repositoriesList = await this.services.stashRepositoryService.list(req.body.filters);
        res.send(repositoriesList);
    }

    async postRepositoryDeleteResult(req: Request, res: Response): Promise<void> {
        const repositoryDeleteResult = await this.services.repositoryService.delete(req.body.filters);
        const code = repositoryDeleteResult ? 200 : 404;
        res.status(code).send();
    }

    async postAddStashRepositoryToFavoritesResult(req: Request, res: Response): Promise<void> {
        const addStashRepositoryToFavoritesResult = await this.services.repositoryService.add(req.body.repository);
        const code = addStashRepositoryToFavoritesResult ? 200 : 404;
        res.status(code).send();
    }

    makeRouter(): Router {
        this.router.post('/api/repositories/get', userAuth, this.postRepositoriesList.bind(this));
        this.router.post('/api/repositories/add', userAuth, this.postAddStashRepositoryToFavoritesResult.bind(this));
        this.router.post('/api/stash/repositories/get', userAuth, this.postStashRepositoriesList.bind(this));
        this.router.post('/api/repositories/delete', userAuth, this.postRepositoryDeleteResult.bind(this));
        return this.router;
    }
}