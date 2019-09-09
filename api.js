require('dotenv').config();
const {addUsersList, addReposList} = require('./templates/subscribe');
const {getAddedUsers, getFollowedUsers, getAddedRepos, addUser, addRepo, getFollowerChannels, addSubscription, removeSubscription, removeRepo, removeUser} = require('./db');
const {WebClient} = require('@slack/web-api');
const web = new WebClient(process.env.BOT_TOKEN);

const listUsers = async (channelId, reponame, res, respond) => {
    try {
        const emptyUsersMsg = "You don't have added users yet. To add them please use command /add_user";
        const addedUsers = await getAddedUsers(channelId);
        let users = addedUsers;
        const postFunc = res ?
            async msg => {
                await web.chat.postMessage({...msg, channel: channelId});
                res.status(200).send();
            } :
            async msg => {await respond({...msg, delete_original: true})};
        if (reponame) {
            const followedUsers = await getFollowedUsers(channelId, reponame);
            const followedUserNames = followedUsers.map(user => user.followed);
            users = addedUsers.map(user => ({...user, isFollowed: followedUserNames.indexOf(user.username) !== -1}));
        }
        const msg = addedUsers.length === 0 ? {text: emptyUsersMsg} : {blocks: addUsersList(users, reponame)};
        await postFunc(msg);
    } catch (e) {
        console.log(e);
    }
};

const listRepos = async (channelId, res, respond, buttonText='Select', command='select') => {
    try {
        const emptyReposMsg = "You don't have added repositories yet. To add them please use command /add_repo";
        const postFunc = res ?
            async msg => {
                await web.chat.postMessage({...msg, channel: channelId});
                res.status(200).send();
            } :
            async msg => {await respond({...msg, delete_original: true})};
        const repos = await getAddedRepos(channelId);
        const msg = repos.length === 0 ? {text: emptyReposMsg} : {blocks: addReposList(repos, buttonText, command)};
        await postFunc(msg);
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

const deleteRepo = async (reponame, channelId, respond) => {
    await removeRepo(reponame, channelId);
    await listRepos(channelId, undefined, respond, 'Delete', 'deleteRepo');
};

const deleteUser = async (username, channelId, respond) => {
    await removeUser(username, channelId);
    await listUsers(channelId, undefined, undefined, respond);
};

const notifyAboutPR = async (data) => {
    const {fallback, author_name: followed} = data.attachments[0];
    if (fallback && followed) {
        const result = fallback.match(/<(.*)\/pull-requests/);
        if (result) {
            const reponame = result[1];
            const followerChannels = await getFollowerChannels(followed, reponame);
            followerChannels.map(async channel => {
                await web.chat.postMessage({text: 'Added new Pull request', ...data, channel})
            });
        }
    }
};


module.exports = {listUsers, listRepos, subscribe, unsubscribe, notifyAboutPR, addNewUser, addNewRepo, addSubscription, removeSubscription, deleteRepo, deleteUser};