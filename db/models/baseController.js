class BaseController {
    constructor(model) {
        this.model = model;
    }

    async get(filter) {
        return this.model.find(filter).exec();
    }

    async add(obj) {
        return this.model.update(obj, {}, {upsert: true}).exec();
    }

    async remove(filter) {
        return await this.model.deleteMany(filter).exec();
    }
}

module.exports = BaseController;