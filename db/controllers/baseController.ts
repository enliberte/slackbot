import {Document, Model, connect} from 'mongoose';
const {MONGO_URI} = require('./../../config');
connect(MONGO_URI, {useNewUrlParser: true, keepAlive: true});


interface IDBController<T extends Document, U, V extends U> {
    add(obj: V): Promise<T[]>;
    get(filter: U): Promise<T[]>;
    remove(filter: U): Promise<{ok?: number, n?: number}>;
}

export const logger: () => Function = () => {
    return (target: Function) => {
        try {
            target();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
};


abstract class BaseController<T extends Document, U, V extends U> implements IDBController<T, U, V> {
    protected model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    abstract get(filter: U): Promise<T[]>

    @logger()
    add(obj: V) {
        return this.model.update(obj, {}, {upsert: true}).exec();
    }

    @logger()
    remove(filter: U) {
        return this.model.deleteMany(filter).exec();
    }
}

export default BaseController;