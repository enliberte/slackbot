import axios from 'axios';
import {
    IDeleteRepositoryFilters,
    IRepositoriesFilters,
    IStashRepositoriesFilters
} from "../store/action_creators/repositories/IRepositoriesFilters";
import {IRepository} from "../../../backend/db/models/RepositoryModel";


export const fetchGetFavoriteRepositories = (filters: IRepositoriesFilters) => axios.post('/api/repositories/get', {filters});

export const fetchGetStashRepositories = (filters: IStashRepositoriesFilters) => axios.post('/api/stash/repositories/get', {filters});

export const fetchDeleteRepository = (filters: IDeleteRepositoryFilters) => axios.post('/api/repositories/delete', {filters});

export const fetchAddStashRepositoryToFavorites = (repository: IRepository) => axios.post('/api/repositories/add', {repository});