const express = require('express');
const SlackBot = require('slackbots');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
require('dotenv').config();

class Bot {
    constructor(token, name) {
        this.instance = new SlackBot({token, name});
        this.subscribes = {};
        this.app = express();

        //app settings
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    router() {
        this.app.get('/', (req, res) => {
            res.status(200).send('React app will be there');
        });

        this.app.post('/push', (req, res) => {
            if (req.body.text && req.body.attachments) {
                this.notifyAboutPushEvent(req.body);
            }
        });

        this.app.post('/subscribe', (req, res) => {
            if (req.body.text && req.body.user_name) {
                this.subscribe(req.body.text, req.body.user_name);
                res.status(200).send();
            } else {
                res.status(404).send('Specify user you subscribe to')
            }
        });

        this.app.post('/unsubscribe', (req, res) => {
            if (req.body.text && req.body.user_name) {
                this.unsubscribe(req.body.text, req.body.user_name);
                res.status(200).send();
            } else {
                res.status(404).send('Specify user you unsubscribe from')
            }
        });
    }

    start() {
        this.app.listen(port);
        this.router();
        this.listenStart();
    }

    listenStart() {
        this.instance.on('start', () => {
            this.instance.postMessageToChannel('pushes', "I'm alive (Skynet)", {});
        });
    }

    notifyAboutPushEvent(data) {
        for (let followed in this.subscribes) {
            if (data.text.match(new RegExp(`^Push(.*)${followed}`))) {
                this.subscribes[followed].forEach(
                    follower =>  this.instance.postMessageToUser(follower, data.text, {attachments: data.attachments})
                );
            }
        }
    }

    subscribe(followed, follower) {
        if (this.subscribes[followed]) {
            this.subscribes[followed] = [...this.subscribes[followed], follower];
        } else {
            this.subscribes[followed] = [follower]
        }
        this.instance.postMessageToUser(follower, `You have subscribed to ${followed}`);
    }

    unsubscribe(followed, follower) {
        if (this.subscribes[followed]) {
            this.subscribes[followed] = this.subscribes[followed].filter(currentFollower => currentFollower !== follower);
        }
        this.instance.postMessageToUser(follower, `You have unsubscribed from ${followed}`);
    }
}

new Bot(process.env.BOT_TOKEN,  'testbot').start();
