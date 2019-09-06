class BaseController {
    constructor(model) {
        this.model = model;
    }

    async get(filter) {
        return await this.model.find(filter);
    }

    async add(obj) {
        return await this.model.update(obj, {upsert: true});
    }

    async remove(filter) {
        return await this.model.deleteOne(filter);
    }
}

module.exports = BaseController;