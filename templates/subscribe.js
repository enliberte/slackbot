const {addSection, addDivider, addSectionWithButton, addButton} = require('./common');

const addUsersList = (users, reponame) => {
    const sectionMsg = reponame ? "Your subscribes:" : "Added users:";
    const mainBtnText = reponame ? 'Return' : 'Close';
    const mainBtnValue = reponame ? 'return' : 'close';
    let blocks = [addSection(sectionMsg)];
    users.forEach(user => {
        let buttonText = 'Delete';
        let buttonValue = `deleteUser_${user.username}`;
        if (reponame) {
            buttonText = user.isFollowed ? 'Unfollow' : 'Follow';
            buttonValue = user.isFollowed ? `unfollow_${user.username}_${reponame}` : `follow_${user.username}_${reponame}`;
        }
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(user.username, buttonText, buttonValue));
    });
    blocks.push(addButton(mainBtnText, mainBtnValue));
    return blocks;
};

const addReposList = (repos, buttonText='Select', command='select') => {
    let blocks = [addSection('Select repository')];
    repos.forEach(repo => {
        const {reponame} = repo;
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(reponame, buttonText, `${command}_${reponame}`));
    });
    blocks.push(addButton('Close', 'close'));
    return blocks;
};

module.exports = {addUsersList, addReposList};