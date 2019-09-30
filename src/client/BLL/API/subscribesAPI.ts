import axios from 'axios';
import {ISubscribe} from "../../../backend/db/models/SubscribeModel";

export const fetchGetSubscribes = (filters: Partial<ISubscribe>) => axios.post('/api/subscribes/get', {filters});

export const fetchDeleteSubscribes = (filters: Partial<ISubscribe>) => axios.post('/api/subscribes/delete', {filters});