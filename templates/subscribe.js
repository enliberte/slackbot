const {addSection, addDivider, addSectionWithButton, addButton} = require('./common');

const addUsersList = (users, reponame) => {
    let blocks = [addSection("Your subscribes:")];
    users.forEach(user => {
        const {username, isFollowed} = user;
        const buttonText = isFollowed ? 'Unfollow' : 'Follow';
        const buttonValue = isFollowed ? `unfollow_${username}_${reponame}` : `follow_${username}_${reponame}`;
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(user, buttonText, buttonValue));
    });
    blocks.push(addButton('Close', 'close_userlist'));
    return blocks;
};


const addReposList = (repos) => {
    let blocks = [addSection(`Select repositories for tracking PR of ${user}`)];
    repos.forEach(repo => {
        const {reponame} = repo;
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(reponame, 'Select', `select_${reponame}`));
    });
    blocks.push(addButton('Close', 'close_repolist'));
    return blocks;
};


module.exports = {addUsersList, addReposList};