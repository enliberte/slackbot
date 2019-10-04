export interface IRepositoriesFilters {
    channelId: string;
    search: string;
}

export interface IStashRepositoriesFilters {
    channelId: string;
    name: string;
    limit: number;
}

export interface IDeleteRepositoryFilters {
    reponame: string;
    channelId?: string;
}