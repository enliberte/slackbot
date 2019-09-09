class BaseController {
    constructor(model) {
        this.model = model;
    }

    get(filter) {
        return this.model.find(filter).exec();
    }

    add(obj) {
        return this.model.update(obj, {}, {upsert: true}).exec();
    }

    remove(filter) {
        return this.model.deleteMany(filter).exec();
    }
}

module.exports = BaseController;