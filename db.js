require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const getAllUsers = async () => {
    let users = [];
    const conn = await client.connect();
    try {
        const usersCollection = conn.db("subscribes").collection("users");
        users = await usersCollection.find({}).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return users;
};

const getAllRepos = async () => {
    let repos = [];
    const conn = await client.connect();
    try {
        const reposCollection = conn.db("subscribes").collection("repos");
        repos = await reposCollection.find({}).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return repos;
};

const getAllSubscribedRepos = async (follower) => {
    let repos = [];
    const conn = await client.connect();
    try {
        const followedCollection = conn.db("subscribes").collection("followed");
        repos = await followedCollection.find({follower}).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return repos;
};

const getAllSubscribedUsers = async (reponame, follower) => {
    let users = [];
    const conn = await client.connect();
    try {
        const followedCollection = conn.db("subscribes").collection("followed");
        users = await followedCollection.find({follower, reponame}).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        await conn.close();
    }
    return users;
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


module.exports = {getAllUsers, getAllRepos, getAllSubscribedRepos, getAllSubscribedUsers, addSubscription, removeSubscription};