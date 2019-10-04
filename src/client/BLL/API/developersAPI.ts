import axios from 'axios';
import {
    IDeleteDeveloperFilters,
    IDevelopersFilters,
    IStashDevelopersFilters
} from "../store/action_creators/developers/IDevelopersFilters";
import {IDeveloper} from "../../../backend/db/models/DeveloperModel";

export const fetchGetFavoriteDevelopers = (filters: IDevelopersFilters) => axios.post('/api/developers/get', {filters});

export const fetchGetStashDevelopers = (filters: IStashDevelopersFilters) => axios.post('/api/stash/developers/get', {filters});

export const fetchDeleteDeveloper = (filters: IDeleteDeveloperFilters) => axios.post('/api/developers/delete', {filters});

export const fetchAddStashDeveloperToFavorites = (developer: IDeveloper) => axios.post('/api/developers/add', {developer});