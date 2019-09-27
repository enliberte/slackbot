import express, {Request, Response, Router} from "express";
const path = require('path');
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";


export default class MainController extends BaseController {
    makeRouter(): Router {
        this.router.get('/', userAuth, express.static(__dirname + '/dist'));
        return this.router;
    }
}