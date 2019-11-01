import {Document, Model} from 'mongoose';


export interface IStorageService<T, U extends T> {
    add(obj: T): Promise<boolean>;
    get(filter: Partial<U>, search?: string, limit?: number): Promise<U[]>;
    remove(filter: Partial<U>): Promise<boolean>;
}

export default abstract class BaseStorageService<T extends Document, U, V extends U> implements IStorageService<U, V> {
    protected model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    abstract get(filter: Partial<V>): Promise<V[]>

    async add(obj: U): Promise<boolean> {
        const operationResult = await this.model.update(obj, {}, {upsert: true}).exec();
        return operationResult.ok === 1;
    }

    async remove(filter: Partial<V>): Promise<boolean> {
        const operationResult = await this.model.deleteMany(filter).exec();
        return operationResult.ok === 1;
    }
}