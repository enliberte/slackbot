const axios = require('axios');

const StashClient = axios.create({
    headers: {
        Authorization: 'Basic YWxleGV5c3U6TmV3cGFzc3dvcmQxMjM0IQ=='
    }
});

const list = async () => {
    const response = await StashClient.get('https://stash.firmglobal.com/rest/api/1.0/users');
    console.log(response.data);
};

list();