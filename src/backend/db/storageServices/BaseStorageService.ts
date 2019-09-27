import {Document, Model, connect} from 'mongoose';
const {MONGO_URI} = require('../../../../config');
connect(MONGO_URI, {useNewUrlParser: true, keepAlive: true});


export interface IStorageService<T> {
    add(obj: T): Promise<boolean>;
    get(filter: Partial<T>): Promise<T[]>;
    remove(filter: Partial<T>): Promise<boolean>;
}

export default abstract class BaseStorageService<T extends Document, U> implements IStorageService<U> {
    protected model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    abstract get(filter: Partial<U>): Promise<U[]>

    add(obj: U): Promise<boolean> {
        return this.model.update(obj, {}, {upsert: true}).exec();
    }

    async remove(filter: Partial<U>): Promise<boolean> {
        const operationResult = await this.model.deleteMany(filter).exec();
        return operationResult.ok === 1;
    }
}