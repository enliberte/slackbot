const mongoose = require('mongoose');
const {MONGO_URI} = require('./../config');

class DBController {
    constructor(controller) {
        this.controller = controller;
        mongoose.connect(MONGO_URI, {useNewUrlParser: true, keepAlive: true});
    }

    async actionWrapper(action) {
        try {
            return await action();
        } catch (e) {
            console.log(e);
        } finally {
            await mongoose.disconnect();
        }
    }

    async get(filter) {
        await this.actionWrapper(() => this.controller.get(filter));
    }

    async add(obj) {
        await this.actionWrapper(() => this.controller.add(obj));
    }

    async remove(filter) {
        await this.actionWrapper(() => this.controller.remove(filter));
    }
}

module.exports = DBController;