import {Document, Model} from 'mongoose';


export interface IStorageService<T, U> {
    add(obj: T): Promise<boolean>;
    get(filter: U, search?: string, limit?: number): Promise<T[]>;
    remove(filter: Partial<T>): Promise<boolean>;
}

export default abstract class BaseStorageService<T extends Document, U, V> implements IStorageService<U, V> {
    protected model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    abstract get(filter: V, search?: string, limit?: number): Promise<U[]>

    add(obj: U): Promise<boolean> {
        return this.model.update(obj, {}, {upsert: true}).exec();
    }

    async remove(filter: Partial<U>): Promise<boolean> {
        const operationResult = await this.model.deleteMany(filter).exec();
        return operationResult.ok === 1;
    }
}