require('dotenv').config();
const {addUsersList, addReposList} = require('./templates/subscribe');
const {getAddedUsers, getFollowedUsers, getAddedRepos, addUser, addRepo, getFollowerChannels} = require('./db');
const {WebClient} = require('@slack/web-api');
const web = new WebClient(process.env.BOT_TOKEN);

const listUsers = async (channelId, reponame, respond) => {
    try {
        const addedUsers = await getAddedUsers(channelId);
        const followedUsers = await getFollowedUsers(channelId, reponame);
        const followedUserNames = followedUsers.map(user => user.followed);
        const users = addedUsers.map(user => ({...user, isFollowed: followedUserNames.indexOf(user.username) !== -1}));
        await respond({blocks: addUsersList(users)});
    } catch (e) {
        console.log(e);
    }
};

const listRepos = async (channelId, res) => {
    try {
        const repos = await getAddedRepos(channelId);
        await web.chat.postMessage({
            blocks: addReposList(repos),
            channel: channelId
        });
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(404).send();
    }
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

const subscribe = async (followed, follower, repoName, respond) => {
    const err = await addSubscription(followed, follower, repoName);
    const msgText = err ? 'insert into db failed' : `You have subscribed to ${followed} on ${repoName}`;
    await respond({text: msgText});
};

const unsubscribe = async (followed, follower, repoName, respond) => {
    const err = await removeSubscription(followed, follower, repoName);
    const msgText = err ? 'delete from db failed' : `You have unsubscribed from ${followed} on ${repoName}`;
    await respond({text: msgText});
};

const addNewUser = async (username, addedByName, channelId, res) => {
    if (username.length !== 0) {
        const err = await addUser(username, addedByName, channelId);
        const msgText = err ? 'insert into db failed' : `You have added new user ${username}`;
        await res.status(200).send();
        await web.chat.postMessage({text: msgText, channel: channelId});
    } else {
        await res.status(404).send();
        await web.chat.postMessage({text: `Incorrect username ${username}`, channel: channelId});
    }
};

const addNewRepo = async (reponame, addedByName, channelId, res) => {
    if (reponame.length !== 0) {
        const err = await addRepo(reponame, addedByName, channelId);
        const msgText = err ? 'insert into db failed' : `You have added new repository ${reponame}`;
        await res.status(200).send();
        await web.chat.postMessage({text: msgText, channel: channelId});
    } else {
        await res.status(404).send();
        await web.chat.postMessage({text: `Incorrect reponame ${reponame}`, channel: channelId});
    }
};

const notifyAboutPR = async (data) => {
    const {fallback, author_name: followed} = data.attachments[0];
    if (fallback && followed) {
        const result = fallback.match(/<(.*)\/pull-requests/);
        if (result) {
            const reponame = result[1];
            const followerChannels = await getFollowerChannels(followed, reponame);
            followerChannels.map(async channel => {
                await web.chat.postMessage({
                    text: 'Added new Pull request',
                    ...data,
                    channel
                })
            });
        }
    }
};


module.exports = {listUsers, listRepos, subscribe, unsubscribe, notifyAboutPR, addNewUser, addNewRepo, addSubscription, removeSubscription};