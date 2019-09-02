const getFollowersSelector = (followed, repoName) => ({followed, repoName});

const getSubscribeSelector = (followed, follower, repoName) => ({followed, follower, repoName});



module.exports = {getFollowersSelector, getSubscribeSelector};