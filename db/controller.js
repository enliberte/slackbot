const mongoose = require('mongoose');
const {MONGO_URI} = require('./../config');

class DBController {
    constructor(controller) {
        this.controller = new controller;
        mongoose.connect(MONGO_URI, {useNewUrlParser: true, keepAlive: true}).then(res => console.log('YES!!!!!!!!!!')).catch(err => console.log('NO!!!!!!!!!!!!!!!'));
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