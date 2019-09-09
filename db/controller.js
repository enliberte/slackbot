const mongoose = require('mongoose');
const {MONGO_URI} = require('./../config');
mongoose.connect(MONGO_URI, {useNewUrlParser: true, keepAlive: true});

class DBController {
    constructor(controller) {
        this.controller = new controller;
    }

    async actionWrapper(action) {
        try {
            return await action();
        } catch (e) {
            console.log(e);
        }
    }

    async get(filter) {
        return await this.actionWrapper(() => this.controller.get(filter));
    }

    async add(obj) {
        return await this.actionWrapper(() => this.controller.add(obj));
    }

    async remove(filter) {
        return await this.actionWrapper(() => this.controller.remove(filter));
    }
}

module.exports = DBController;