const getFollowersSelector = (followed, repoName) => ({"followed": followed, "repoName": repoName});

const getSubscribeSelector = (followed, follower, repoName) => ({"followed": followed, "follower": follower, "repoName": repoName});



module.exports = {getFollowersSelector, getSubscribeSelector};