interface IStashDeveloper {
    id: number;
    displayName: string;
}

interface IStashDeveloperWithFavoriteSign extends IStashDeveloper {
    favoriteId: string;
    isFavorite: boolean;
}

export {IStashDeveloper, IStashDeveloperWithFavoriteSign}