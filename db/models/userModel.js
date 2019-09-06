const mongoose = require('mongoose');
const BaseController = require('./baseController');

const userSchema = new mongoose.Schema({
    channelId: String,
    addedByName: String,
    username: String
});

const User = mongoose.model('User', userSchema);

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    async get(filter) {
        return await this.model.find(filter).sort({username: 1}).toArray();
    }
}

module.exports = UserController;
