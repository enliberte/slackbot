require('dotenv').config();
const {addUsersList, addReposList} = require('./templates/subscribe');
const {getAddedUsers, getFollowedUsers, getAddedRepos, addUser, addRepo, getFollowerChannels, addSubscription, removeSubscription} = require('./db');
const {WebClient} = require('@slack/web-api');
const web = new WebClient(process.env.BOT_TOKEN);

const listUsers = async (channelId, reponame, respond) => {
    try {
        const addedUsers = await getAddedUsers(channelId);
        const followedUsers = await getFollowedUsers(channelId, reponame);
        const followedUserNames = followedUsers.map(user => user.followed);
        const users = addedUsers.map(user => ({...user, isFollowed: followedUserNames.indexOf(user.username) !== -1}));
        await respond({blocks: addUsersList(users, reponame)});
    } catch (e) {
        console.log(e);
    }
};

const listRepos = async (channelId, res, respond) => {
    try {
        const repos = await getAddedRepos(channelId);
        if (respond) {
            await respond({blocks: addReposList(repos)});
        } else {
            await web.chat.postMessage({
                blocks: addReposList(repos),
                channel: channelId
            });
            res.status(200).send();
        }
    } catch (e) {
        console.log(e);
    }
};

const subscribe = async (followed, follower, channelId, repoName, respond) => {
    await addSubscription(followed, follower, channelId, repoName);
    await listUsers(channelId, repoName, respond);
};

const unsubscribe = async (followed, follower, channelId, repoName, respond) => {
    await removeSubscription(followed, follower, channelId, repoName);
    await listUsers(channelId, repoName, respond);
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
        console.log('---------------------------------------------');
        console.log(fallback);
        console.log('---------------------------------------------');
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