import axios from 'axios';
import {IDeleteDeveloperFilters, IDevelopersFilters} from "../store/action_creators/developers/IDevelopersFilters";

export const fetchGetDevelopers = (filters: IDevelopersFilters) => axios.post('/api/developers/get', {filters});

export const fetchDeleteDeveloper = (filters: IDeleteDeveloperFilters) => axios.post('/api/developers/delete', {filters});