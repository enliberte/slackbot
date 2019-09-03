require('dotenv').config();
const {addUsersListForSubscribe, addUsersListForUnsubscribe, addReposListForUnsubscribe, addReposListForSubscribe} = require('./templates/subscribe');
const {getAllUsers, getAllRepos, getAllSubscribedRepos, getAllSubscribedUsers} = require('./db');
const {WebClient} = require('@slack/web-api');
const web = new WebClient(process.env.BOT_TOKEN);

const listUsersForSubscribe = async (channelId) => {
    const docs = await getAllUsers();
    const usernames = docs.map(doc => doc.username);
    try {
        await web.chat.postMessage({
            blocks: addUsersListForSubscribe(usernames),
            channel: channelId
        });
    } catch (e) {
        console.log(e)
    }
};

const listUsersForUnsubscribe = async (channelId) => {
    const docs = await getAllSubscribedUsers(channelId);
    const usernames = docs.map(doc => doc.follower);
    try {
        await web.chat.postMessage({
            blocks: addUsersListForUnsubscribe(usernames),
            channel: channelId
        });
    } catch (e) {
        console.log(e)
    }
};

const listReposForSubscribe = async (followed, respond) => {
    const docs = await getAllRepos();
    const reponames = docs.map(doc => doc.reponame);
    try {
        await respond({blocks: addReposListForSubscribe(followed, reponames)});
    } catch (e) {
        console.log(e)
    }
};

const listReposForUnsubscribe = async (followed, follower, respond) => {
    const docs = await getAllSubscribedRepos();
    const reponames = docs.map(doc => doc.reponame);
    try {
        await respond({blocks: addReposListForUnsubscribe(followed, reponames)});
    } catch (e) {
        console.log(e)
    }
};


module.exports = {listUsersForSubscribe, listUsersForUnsubscribe, listReposForSubscribe, listReposForUnsubscribe};