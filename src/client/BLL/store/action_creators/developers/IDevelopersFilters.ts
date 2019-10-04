export interface IDevelopersFilters {
    channelId: string;
    search: string;
}

export interface IStashDevelopersFilters {
    channelId: string;
    filter: string;
    limit: number;
}

export interface IDeleteDeveloperFilters {
    username: string;
    channelId?: string;
}