const mongoose = require('mongoose');
const {MONGO_URI} = require('./../config');


class DBController {
    constructor(Model) {
        mongoose.connect(MONGO_URI);
        this.Model = Model;
    }

    async get(filter) {
        try {
            return await this.Model.find(filter).toArray();
        } catch (e) {
            console.log(e);
        } finally {
            await mongoose.disconnect();
        }
    }

    async add(data) {
        try {
            await this.Model.update(data, {upsert: true});
        } catch (e) {
            console.log(e);
        } finally {
            await mongoose.disconnect();
        }
    }

    async remove(filter) {
        try {
            await this.Model.deleteOne(filter);
        } catch (e) {
            console.log(e);
        } finally {
            await mongoose.disconnect();
        }
    }
}

module.exports = {DBController};