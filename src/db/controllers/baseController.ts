import {Document, Model, connect} from 'mongoose';
const {MONGO_URI} = require('../../../config');
connect(MONGO_URI, {useNewUrlParser: true, keepAlive: true});


export interface IDBController<T, U extends T> {
    add(obj: U): Promise<boolean>;
    get(filter: T): Promise<U[]>;
    remove(filter: T): Promise<boolean>;
}

abstract class BaseController<T extends Document, U, V extends U> implements IDBController<U, V> {
    protected model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    abstract get(filter: U): Promise<V[]>

    add(obj: V): Promise<boolean> {
        return this.model.update(obj, {}, {upsert: true}).exec();
    }

    async remove(filter: U): Promise<boolean> {
        const operationResult = await this.model.deleteMany(filter).exec();
        return operationResult.ok === 1;
    }
}

export default BaseController;