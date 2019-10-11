import axios from 'axios';
import {INewSubscribe, ISubscribe} from "../../../backend/db/models/subscribe/SubscribeModel";
import URLS from "../../../common/URLS";
import queryString from "query-string";


export const fetchGetSubscribes = (filters: Partial<ISubscribe>) =>
    axios.get(`${URLS.API_SUBSCRIBES}?${queryString.stringify(filters)}`);

export const fetchSaveSubscribe = (subscribe: INewSubscribe) => axios.post(URLS.API_SUBSCRIBES, subscribe);

export const fetchEditSubscribe = ({id, ...subscribeData}: ISubscribe) =>
    axios.put(`${URLS.API_SUBSCRIBES}/${id}`, subscribeData);

export const fetchDeleteSubscribe = (subscribe: Partial<ISubscribe>) =>
    axios.delete(`${URLS.API_SUBSCRIBES}?${queryString.stringify(subscribe)}`);