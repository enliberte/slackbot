const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    channelId: String,
    addedByName: String,
    username: String
});

const User = mongoose.model('User', userSchema);

export default User;
