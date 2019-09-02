const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();
const getSubscribeSelector = require('./selectors').getSubscribeSelector;

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true });
const getSubscribes = (client) => client.db("subscribes").collection("followed");

const subscribe = (followed, follower, repoName) => {
    client.connect(err => {
        const subscribes = getSubscribes(client);
        const subscribe = getSubscribeSelector(followed, follower, repoName);
        subscribes.update(subscribe, subscribe, {upsert: true});
        client.close()
    })
};

const unsubscribe = (followed, follower, repoName) => {
    client.connect(err => {
        const subscribes = getSubscribes(client);
        subscribes.deleteOne(getSubscribeSelector(followed, follower, repoName));
        client.close()
    })
};

module.exports = {subscribe, unsubscribe};

