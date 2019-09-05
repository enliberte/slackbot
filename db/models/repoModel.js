const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
    channelId: String,
    addedByName: String,
    reponame: String
});

const Repo = mongoose.model('Repo', repoSchema);

export default Repo;
