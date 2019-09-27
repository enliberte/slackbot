import axios from 'axios';
import {IRepositoriesFilters} from "../store/action_creators/repositories/IRepositoriesFilters";

export const fetchGetRepositories = (filters: IRepositoriesFilters) => axios.post('/api/repositories/get', {filters});