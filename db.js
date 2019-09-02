const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();

const getSubscribeSelector = require('./selectors').getSubscribeSelector;
const getFollowersSelector = require('./selectors').getFollowersSelector;

const client = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const subscribe = (followed, follower, repoName) => {
    client.connect(err => {
        const subscribes = client.db("subscribes").collection("followed");
        const subscribe = getSubscribeSelector(followed, follower, repoName);
        subscribes.updateOne(subscribe, {$set: subscribe}, {upsert: true}, err => client.close());
    });
};

const unsubscribe = (followed, follower, repoName) => {
    client.connect(err => {
        const subscribes = client.db("subscribes").collection("followed");
        subscribes.deleteOne(getSubscribeSelector(followed, follower, repoName), {}, err => client.close());
    });
};

const getFollowers = (followed, repoName) => {
    console.log(followed, repoName);
    let followers = [];
    client.connect(err => {
        const subscribes = client.db("subscribes").collection("followed");
        subscribes.find(getFollowersSelector(followed, repoName)).toArray(err, docs => {
            if (docs) {
                followers = docs.map(doc => doc.follower);
            }
            client.close()
        });
    });
    return followers;
};

module.exports = {subscribe, unsubscribe, getFollowers};