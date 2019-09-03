require('dotenv').config();
const {addSection} = require("./templates/common");
const {addUsersListForSubscribe, addUsersListForUnsubscribe, addReposListForUnsubscribe, addReposListForSubscribe} = require('./templates/subscribe');
const {getAllUsers, getAllUnsubscribedRepos, getAllSubscribedRepos, getAllSubscribedUsers, addSubscription, removeSubscription, getFollowerChannels, addUser, addRepo} = require('./db');
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

const listReposForSubscribe = async (followed, follower, respond) => {
    const reponames = await getAllUnsubscribedRepos(followed, follower);
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
    await respond({text: msgText});
};

const unsubscribe = async (followed, follower, repoName, respond) => {
    const err = await removeSubscription(followed, follower, repoName);
    const msgText = err ? 'delete from db failed' : `You have unsubscribed from ${followed} on ${repoName}`;
    await respond({text: msgText});
};

const addNewUser = async (username, channelId, res) => {
    if (username.length !== 0) {
        const err = await addUser(username);
        const msgText = err ? 'insert into db failed' : `You have added new user ${username}`;
        await res.status(200).send();
        await web.chat.postMessage({...addSection(msgText), channel: channelId});
    } else {
        await res.status(404).send();
        await web.chat.postMessage({...addSection(`Incorrect username ${username}`), channel: channelId});
    }
};

const addNewRepo = async (reponame, channelId, res) => {
    if (username.length !== 0) {
        const err = await addRepo(reponame);
        const msgText = err ? 'insert into db failed' : `You have added new repository ${reponame}`;
        await res.status(200).send();
        await web.chat.postMessage({...addSection(msgText), channel: channelId});
    } else {
        await res.status(404).send();
        await web.chat.postMessage({...addSection(`Incorrect reponame ${reponame}`), channel: channelId});
    }
};

const notifyAboutPR = async (attachments) => {
    const {fallback, author_name: followed} = attachments[0];
    if (fallback && followed) {
        const result = fallback.match(/<(.*)\/pull-requests/);
        if (result) {
            const reponame = result[1];
            const followers = await getFollowerChannels(followed, reponame);
            followers.map(async follower => {
                await web.chat.postMessage({
                    ...attachments,
                    channel: follower
                })
            });
        }
    }
};


module.exports = {listUsersForSubscribe, listUsersForUnsubscribe, listReposForSubscribe, listReposForUnsubscribe, subscribe, unsubscribe, notifyAboutPR, addNewUser, addNewRepo};