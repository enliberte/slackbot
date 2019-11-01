import axios from 'axios';
import URLS from "../../../common/URLS";
import {INewUser} from "../../../backend/db/models/user/UserModel";

export const fetchGetAuth = () => axios.get(URLS.API_AUTH);

export const fetchRefreshToken = () => axios.get(URLS.REFRESH);

export const fetchPostStashUser = (user: INewUser) => axios.post(URLS.API_USERS, user);