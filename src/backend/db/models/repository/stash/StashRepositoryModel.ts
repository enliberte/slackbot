interface IStashRepository {
    name: string;
    links: {
        self: {href: string}[];
    }
}

interface IStashRepositoryWithFavoriteSign {
    name: string;
    favoriteId?: string;
    isFavorite: boolean;
    url: string;
}

export {IStashRepository, IStashRepositoryWithFavoriteSign}