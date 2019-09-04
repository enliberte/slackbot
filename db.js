require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const getAddedUsers = async (channelId) => {
    let users = [];
    const conn = await client.connect();
    try {
        const usersCollection = conn.db("subscribes").collection("users");
        users = await usersCollection.find({channelId}).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return users;
};

const getFollowedUsers = async (channelId, reponame) => {
    let users = [];
    const conn = await client.connect();
    try {
        const usersCollection = conn.db("subscribes").collection("followed");
        users = await usersCollection.find({channelId, reponame}).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return users;
};

const getFollowerChannels = async (followed, reponame) => {
    let followerChannels = [];
    const conn = await client.connect();
    try {
        const followedCollection = conn.db("subscribes").collection("followed");
        const followers = await followedCollection.find({followed, reponame}).toArray();
        followerChannels = followers.map(doc => doc.channelId);
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return followerChannels;
};

const getAddedRepos = async (channelId) => {
    let repos = [];
    const conn = await client.connect();
    try {
        const reposCollection = conn.db("subscribes").collection("repos");
        repos = await reposCollection.find({channelId}).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return repos;
};

const addUser = async (username, addedByName, channelId) => {
    let err = false;
    const conn = await client.connect();
    try {
        const record = {username, addedByName, channelId};
        const usersCollection = conn.db("subscribes").collection("users");
        await usersCollection.updateOne(record, {$set: record}, {upsert: true});
    } catch (e) {
        console.log(e);
        err = true;
    } finally {
        await conn.close();
    }
    return err;
};

const addRepo = async (reponame, addedByName, channelId) => {
    let err = false;
    const conn = await client.connect();
    try {
        const record = {reponame, addedByName, channelId};
        const reposCollection = conn.db("subscribes").collection("repos");
        await reposCollection.updateOne(record, {$set: record}, {upsert: true});
    } catch (e) {
        console.log(e);
        err = true;
    } finally {
        await conn.close();
    }
    return err;
};

const addSubscription = async (followed, follower, channelId, reponame) => {
    let err = false;
    const conn = await client.connect();
    try {
        const subscribes = conn.db("subscribes").collection("followed");
        const subscribe = {followed, follower, channelId, reponame};
        await subscribes.updateOne(subscribe, {$set: subscribe}, {upsert: true});
    } catch (e) {
        console.log(e);
        err = true;
    } finally {
        await conn.close();
    }
    return err;
};

const removeSubscription = async (followed, follower, channelId, reponame) => {
    let err = false;
    const conn = await client.connect();
    try {
        const subscribes = conn.db("subscribes").collection("followed");
        await subscribes.deleteOne({followed, follower, channelId, reponame});
    } catch (e) {
        console.log(e);
        err = true;
    } finally {
        await conn.close();
    }
    return err;
};

module.exports = {getAddedUsers, getFollowedUsers, getAddedRepos, addUser, addRepo, getFollowerChannels, addSubscription, removeSubscription};