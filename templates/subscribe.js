const {addSection, addDivider, addSectionWithButton} = require('./common');

const addUsersListForSubscribe = (users) => {
    let blocks = [addSection("Users you can follow")];
    users.forEach(user => {
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(user, 'Follow', `follow_${user}`));
    });
    return blocks;
};

const addReposListForSubscribe = (user, repos) => {
    let blocks = [addSection(`Select repositories for tracking PR of ${user}`)];
    repos.forEach(repo => {
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(repo, 'Select', `subscribe_${user}_${repo}`));
    });
    return blocks;
};

const addUsersListForUnsubscribe = (users) => {
    let blocks = [addSection("Users you follow")];
    users.forEach(user => {
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(user, 'Unfollow', `unfollow_${user}`));
    });
    return blocks;
};

const addReposListForUnsubscribe = (user, repos) => {
    let blocks = [addSection(`Unselect repositories to stop track PR of ${user}`)];
    repos.forEach(repo => {
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(repo, 'Unselect', `unsubscribe_${user}_${repo}`));
    });
    return blocks;
};

module.exports = {addUsersListForSubscribe, addReposListForSubscribe, addUsersListForUnsubscribe, addReposListForUnsubscribe};