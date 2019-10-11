import axios from 'axios';
import {
    IRepositoriesFilters,
    IStashRepositoriesFilters
} from "../store/action_creators/repositories/IRepositoriesFilters";
import {
    IFavoriteRepository,
    INewFavoriteRepository
} from "../../../backend/db/models/repository/favorite/FavoriteRepositoryModel";
import URLS from "../../../common/URLS";
import queryString from 'query-string';


export const fetchGetFavoriteRepositories = (filters: IRepositoriesFilters) =>
    axios.get(`${URLS.API_FAVORITE_REPOSITORIES}?${queryString.stringify(filters)}`);

export const fetchGetStashRepositories = (filters: IStashRepositoriesFilters) =>
    axios.get(`${URLS.API_STASH_REPOSITORIES}?${queryString.stringify(filters)}`);

export const fetchDeleteRepository = (repository: Partial<IFavoriteRepository>) =>
    axios.delete(`${URLS.API_FAVORITE_REPOSITORIES}?${queryString.stringify(repository)}`);

export const fetchAddStashRepositoryToFavorites = (repository: INewFavoriteRepository) =>
    axios.post(URLS.API_FAVORITE_REPOSITORIES, repository);