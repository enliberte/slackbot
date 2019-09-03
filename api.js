require('dotenv').config();
const {addUsersListForSubscribe, addUsersListForUnsubscribe, addReposListForUnsubscribe, addReposListForSubscribe} = require('./templates/subscribe');
const {getAllUsers, getAllUnsubscribedRepos, getAllSubscribedRepos, getAllSubscribedUsers, addSubscription, removeSubscription} = require('./db');
const {WebClient} = require('@slack/web-api');
const web = new WebClient(process.env.BOT_TOKEN);

const listUsersForSubscribe = async (channelId, res) => {
    const usernames = await getAllUsers();
    try {
        await web.chat.postMessage({
            blocks: addUsersListForSubscribe(usernames),
            channel: channelId
        });
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(404).send();
    }
};

const listUsersForUnsubscribe = async (channelId, res) => {
    const usernames = await getAllSubscribedUsers(channelId);
    try {
        await web.chat.postMessage({
            blocks: addUsersListForUnsubscribe(usernames),
            channel: channelId
        });
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(404).send();
    }
};

const listReposForSubscribe = async (followed, respond) => {
    const reponames = await getAllUnsubscribedRepos();
    try {
        await respond({blocks: addReposListForSubscribe(followed, reponames)});
    } catch (e) {
        console.log(e)
    }
};

const listReposForUnsubscribe = async (followed, follower, respond) => {
    const reponames = await getAllSubscribedRepos(followed, follower);
    try {
        await respond({blocks: addReposListForUnsubscribe(followed, reponames)});
    } catch (e) {
        console.log(e)
    }
};

const subscribe = async (followed, follower, repoName, respond) => {
    const err = await addSubscription(followed, follower, repoName);
    const msgText = err ? 'insert into db failed' : `You have subscribed to ${followed} on ${repoName}`;
    respond({text: msgText});
};

const unsubscribe = async (followed, follower, repoName, respond) => {
    const err = await removeSubscription(followed, follower, repoName);
    const msgText = err ? 'delete from db failed' : `You have unsubscribed from ${followed} on ${repoName}`;
    respond({text: msgText});
};


module.exports = {listUsersForSubscribe, listUsersForUnsubscribe, listReposForSubscribe, listReposForUnsubscribe, subscribe, unsubscribe};