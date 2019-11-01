interface IStashDeveloper {
    id: number;
    displayName: string;
    emailAddress: string;
    slug: string;
}

interface IStashDeveloperWithFavoriteSign extends IStashDeveloper {
    favoriteId: string;
    isFavorite: boolean;
}

export {IStashDeveloper, IStashDeveloperWithFavoriteSign}