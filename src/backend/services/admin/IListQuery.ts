export interface IListQuery<T> {
    search?: string;
    limit?: number;
    filter: Partial<T>;
}