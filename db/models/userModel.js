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

    get(filter) {
        return this.model.find(filter).sort({username: 1}).exec();
    }
}

module.exports = UserController;
