import axios from 'axios';
import {
    IDevelopersFilters,
    IStashDevelopersFilters
} from "../store/action_creators/developers/IDevelopersFilters";
import {
    IFavoriteDeveloper,
    INewFavoriteDeveloper
} from "../../../backend/db/models/developer/favorite/FavoriteDeveloperModel";
import URLS from "../../../common/URLS";
import queryString from 'query-string';


export const fetchGetFavoriteDevelopers = (filters: IDevelopersFilters) =>
    axios.get(`${URLS.API_FAVORITE_DEVELOPERS}?${queryString.stringify(filters)}`);

export const fetchGetStashDevelopers = (filters: IStashDevelopersFilters) =>
    axios.get(`${URLS.API_STASH_DEVELOPERS}?${queryString.stringify(filters)}`);

export const fetchDeleteDeveloper = (developer: Partial<IFavoriteDeveloper>) =>
    axios.delete(`${URLS.API_FAVORITE_DEVELOPERS}?${queryString.stringify(developer)}`);

export const fetchAddStashDeveloperToFavorites = (developer: INewFavoriteDeveloper) =>
    axios.post(URLS.API_FAVORITE_DEVELOPERS, developer);