import axios from 'axios';
import {IDevelopersFilters} from "../store/action_creators/developers/IDevelopersFilters";

export const fetchGetDevelopers = (filters: IDevelopersFilters) => axios.post('/api/developers/get', {filters});