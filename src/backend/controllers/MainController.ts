import express, {Request, Response, Router} from "express";
const path = require('path');
import BaseController from "./BaseController";
import {userAuth} from "../middlewares/auth";
const {DIST} = require('../../../config');


export default class MainController extends BaseController {

    makeRouter(): Router {
        this.router.get('/', userAuth);
        return this.router;
    }
}