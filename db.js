require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const getAllUsers = async () => {
    let usernames = [];
    const conn = await client.connect();
    try {
        const usersCollection = conn.db("subscribes").collection("users");
        const users = await usersCollection.find({}).toArray();
        usernames = users.map(doc => doc.username);
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return usernames;
};

const getFollowerChannels = async (followed, reponame) => {
    let followerChannels = [];
    const conn = await client.connect();
    try {
        const followedCollection = conn.db("subscribes").collection("followed");
        const followers = await followedCollection.find({followed, reponame}).toArray();
        followerChannels = followers.map(doc => doc.follower);
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return followerChannels;
};

const getAllRepos = async () => {
    let reponames = [];
    const conn = await client.connect();
    try {
        const reposCollection = conn.db("subscribes").collection("repos");
        const repos = await reposCollection.find({}).toArray();
        reponames = repos.map(repo => repo.reponame);
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return reponames;
};

const getAllSubscribedRepos = async (followed, follower) => {
    let reponames = [];
    const conn = await client.connect();
    try {
        const followedCollection = conn.db("subscribes").collection("followed");
        const repos = await followedCollection.find({followed, follower}).toArray();
        reponames = repos.map(doc => doc.reponame);
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return reponames;
};

const getAllUnsubscribedRepos = async (followed, follower) => {
    let reponames = [];
    const conn = await client.connect();
    try {
        const reposCollection = conn.db("subscribes").collection("repos");
        const subscribedRepoNames = await getAllSubscribedRepos(followed, follower);
        console.log('subscribedRepoNames', subscribedRepoNames);
        const repos = await reposCollection.find({reponame: {$nin: subscribedRepoNames}}).toArray();
        reponames = repos.map(repo => repo.reponame);
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return reponames;
};

const getAllSubscribedUsers = async (follower) => {
    let usernames = [];
    const conn = await client.connect();
    try {
        const followedCollection = conn.db("subscribes").collection("followed");
        const users = await followedCollection.find({follower}).toArray();
        usernames = Array.from(new Set(users.map(user => user.followed)));
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return usernames;
};

const addSubscription = async (followed, follower, reponame) => {
    let err = false;
    const conn = await client.connect();
    try {
        const subscribes = conn.db("subscribes").collection("followed");
        const subscribe = {followed, follower, reponame};
        await subscribes.updateOne(subscribe, {$set: subscribe}, {upsert: true});
    } catch (e) {
        console.log(e);
        err = true;
    } finally {
        await conn.close();
    }
    return err;
};

const removeSubscription = async (followed, follower, reponame) => {
    let err = false;
    const conn = await client.connect();
    try {
        const subscribes = conn.db("subscribes").collection("followed");
        await subscribes.deleteOne({followed, follower, reponame});
    } catch (e) {
        console.log(e);
        err = true;
    } finally {
        await conn.close();
    }
    return err;
};

const addUser = async (username, addedByName, channelId) => {
    let err = false;
    const conn = await client.connect();
    try {
        const record = {username, addedByName, channelId};
        const usersCollection = conn.db("subscribes").collection("users");
        await usersCollection.updateOne({record}, {$set: {record}}, {upsert: true});
    } catch (e) {
        console.log(e);
        err = true;
    } finally {
        await conn.close();
    }
    return err;
};

const addRepo = async (reponame) => {
    let err = false;
    const conn = await client.connect();
    try {
        const reposCollection = conn.db("subscribes").collection("repos");
        await reposCollection.updateOne({reponame}, {$set: {reponame}}, {upsert: true});
    } catch (e) {
        console.log(e);
        err = true;
    } finally {
        await conn.close();
    }
    return err;
};


module.exports = {getAllUsers, getAllRepos, getAllSubscribedRepos, getAllSubscribedUsers, addSubscription, removeSubscription, getAllUnsubscribedRepos, getFollowerChannels, addUser, addRepo};