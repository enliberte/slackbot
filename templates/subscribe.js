const {addSection, addDivider, addSectionWithButton} = require('./common');

const addUsersListForSubscribe = (users) => {
    let blocks = [addSection("Users you can follow")];
    users.forEach(user => {
        blocks.push(addDivider());
        blocks.push(addSectionWithButton(user, 'Follow'));
    });
    return blocks;
};