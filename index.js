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

    processSubscriptionEvent(req, res, cb, errorMsg) {
        const result = req.body.text.match(/(^.*) (.*$)/);
        if (result) {
            const [, followed, repo] = result;
            cb(followed, req.body.user_name, repo);
            res.status(200).send();
        } else {
            res.status(404).send(errorMsg);
        }
    }

    router() {
        this.app.get('/', (req, res) => {
            res.status(200).send('React app will be there');
        });

        this.app.post('/push', (req, res) => {
            console.log(req.body);
            if (req.body.text && req.body.attachments) {
                this.notifyAboutPushEvent(req.body);
            }
        });

        this.app.post('/subscribe', (req, res) => {
            this.processSubscriptionEvent(req, res, this.subscribe, 'Specify user and repo you subscribe to');
        });

        this.app.post('/unsubscribe', (req, res) => {
            this.processSubscriptionEvent(req, res, this.unsubscribe, 'Specify user and repo you unsubscribe from');
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
            for (let repo in followed) {
                if (data.text.match(new RegExp(`^Push(.*)${repo}(.*)${followed}`))) {
                    this.subscribes[followed].forEach(
                        follower =>  this.instance.postMessageToUser(follower, data.text, {attachments: data.attachments})
                    );
                }
            }

        }
    }

    subscribe(followed, follower, repo) {
        if (this.subscribes[followed]) {
            if (this.subscribes[followed][repo]) {
                this.subscribes[followed][repo] = [...this.subscribes[followed][repo], follower];
            } else {
                this.subscribes[followed][repo] = [follower];
            }
        } else {
            this.subscribes[followed] = {};
            this.subscribes[followed][repo] = [follower];
        }
        this.instance.postMessageToUser(follower, `You have subscribed to ${followed} on ${repo}`);
    }

    unsubscribe(followed, follower, repo) {
        if (this.subscribes[followed]) {
            if (this.subscribes[followed][repo]) {
                this.subscribes[followed][repo] = this.subscribes[followed][repo].filter(currentFollower => currentFollower !== follower);
            }
        }
        this.instance.postMessageToUser(follower, `You have unsubscribed from ${followed} on ${repo}`);
    }
}

new Bot(process.env.BOT_TOKEN,  'testbot').start();
