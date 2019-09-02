const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();
const getSubscribeSelector = require('./selectors').getSubscribeSelector;

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true });
const getSubscribes = () => client.db("subscribes").collection("followed");


const isFollowed = (followed, follower, repoName) => {
    let isFollowed = false;
    const subscribes = getSubscribes();
    subscribes.find(getSubscribeSelector(followed, follower, repoName)).toArray((err, docs) => {
        console.log('isFollowed', docs);
        isFollowed = docs.length !== 0;
    });
    return isFollowed;
};

const subscribe = (followed, follower, repoName) => {
    client.connect(err => {
        const subscribes = getSubscribes();
        if (!isFollowed(follower, followed, repoName)) {
            subscribes.insertOne(getSubscribeSelector(followed, follower, repoName));
        }
        client.close()
    })
};

const unsubscribe = (followed, follower, repoName) => {
    client.connect(err => {
        const subscribes = getSubscribes();
        if (isFollowed(follower, followed, repoName)) {
            subscribes.deleteOne(getSubscribeSelector(followed, follower, repoName));
        }
        client.close()
    })
};

module.exports = {subscribe, unsubscribe};

