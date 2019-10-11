interface IStashRepository {
    name: string;
    links: {
        self: {href: string}[];
    }
}

interface IStashRepositoryWithFavoriteSign extends IStashRepository {
    favoriteId?: string;
    isFavorite: boolean;
}

export {IStashRepository, IStashRepositoryWithFavoriteSign}