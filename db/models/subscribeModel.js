const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    channelId: String,
    followed: String,
    follower: String,
    reponame: String
});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

export default Subscribe;
