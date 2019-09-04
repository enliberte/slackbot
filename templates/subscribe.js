const {addSection, addDivider, addSectionWithButton, addButton} = require('./common');

const addUsersList = (users, reponame) => {
    let blocks = [addSection("Your subscribes:")];
    users.forEach(user => {
        const {username, isFollowed} = user;
        const buttonText = isFollowed ? 'Unfollow' : 'Follow';
        const buttonValue = isFollowed ? `unfollow_${username}_${reponame}` : `follow_${username}_${reponame}`;
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(username, buttonText, buttonValue));
    });
    blocks.push(addButton('Return', 'return'));
    return blocks;
};


const addReposList = (repos) => {
    let blocks = [addSection('Select repository')];
    repos.forEach(repo => {
        const {reponame} = repo;
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(reponame, 'Select', `select_${reponame}`));
    });
    blocks.push(addButton('Close', 'close'));
    return blocks;
};


module.exports = {addUsersList, addReposList};