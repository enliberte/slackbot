const express = require('express');
const {createMessageAdapter} = require('@slack/interactive-messages');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const {listUsersForSubscribe, listUsersForUnsubscribe, notifyAboutPR, addNewUser, addNewRepo} = require('./api');
const {interactMessagesRouter} = require('./interact_msg');
require('dotenv').config();


class Bot {
    constructor(token) {
        this.slackInteractions = createMessageAdapter(process.env.SIGNING_SECRET);
        this.app = express();

        //app settings
        this.app.use('/interactive-messages', this.slackInteractions.requestListener());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    router() {
        this.app.get('/', (req, res) => {
            res.status(200).send('React app will be there');
        });

        this.app.post('/push', (req, res) => {
            if (req.body.attachments) {
                notifyAboutPR(req.body);
            }
        });

        this.app.post('/add-user', (req, res) => {
            addNewUser(req.body.text, req.body.channel_id, res);
        });

        this.app.post('/add-repo', (req, res) => {
            addNewRepo(req.body.text, req.body.channel_id, res);
        });

        this.app.post('/subscribe', (req, res) => {
            listUsersForSubscribe(req.body.channel_id, res);
        });

        this.app.post('/unsubscribe', (req, res) => {
            listUsersForUnsubscribe(req.body.channel_id, res);
        });

        this.slackInteractions.action({type: 'button'}, interactMessagesRouter);
    }

    start() {
        this.app.listen(port);
        this.router();
        (async () => {
            await this.slackInteractions.start(port);
        })();
    }
}

new Bot(process.env.BOT_TOKEN).start();