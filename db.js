const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();
const getSubscribeSelector = require('./selectors').getSubscribeSelector;

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true });

const subscribe = (followed, follower, repoName) => {
    client.connect(err => {
        const subscribes = client.db("subscribes").collection("followed");
        const subscribe = getSubscribeSelector(followed, follower, repoName);
        subscribes.updateOne(subscribe, subscribe, {upsert: true}, err => client.close());
    })
};

const unsubscribe = (followed, follower, repoName) => {
    client.connect(err => {
        const subscribes = client.db("subscribes").collection("followed");
        subscribes.deleteOne(getSubscribeSelector(followed, follower, repoName), {}, err => client.close());
    })
};

module.exports = {subscribe, unsubscribe};

