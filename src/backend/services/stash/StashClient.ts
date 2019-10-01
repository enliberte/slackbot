import axios from 'axios';
const {BITBUCKET_CREDENTIALS} = require('../../../../config');

const StashClient = axios.create({
    baseURL: 'https://stash.firmglobal.com/rest/api/1.0/',
    withCredentials: true,
    headers: {
        Authorization: `Basic ${BITBUCKET_CREDENTIALS}`
    }
});

export default StashClient;