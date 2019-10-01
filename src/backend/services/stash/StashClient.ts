import axios from 'axios';
const {BITBUCKETSESSIONID} = require('../../../../config');

const StashClient = axios.create({
    baseURL: 'https://stash.firmglobal.com/rest/api/1.0/',
    withCredentials: true,
    headers: {
        Cookie: `BITBUCKETSESSIONID=${BITBUCKETSESSIONID}`
    }
});

export default StashClient;