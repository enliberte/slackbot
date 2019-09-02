const express = require('express');
const SlackBot = require('slackbots');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
require('dotenv').config();
const m = require('./db');


class Bot {
    constructor(token, name) {
        this.instance = new SlackBot({token, name});
        this.subscribes = {};
        this.app = express();

        //app settings
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    processSubscriptionEvent(req, res, subscribe) {
        const result = req.body.text.match(/(^.*) (.*$)/);
        if (result) {
            const [, followed, repo] = result;
            if (subscribe) {
                this.subscribe(followed, req.body.user_name, repo);
            } else {
                this.unsubscribe(followed, req.body.user_name, repo);
            }
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    }

    router() {
        this.app.get('/', (req, res) => {
            res.status(200).send('React app will be there');
        });

        this.app.post('/push', (req, res) => {
            console.log(JSON.stringify(req.body));
            if (req.body.text && req.body.author_name) {
                this.notifyAboutPR(req.body);
            }
        });

        this.app.post('/subscribe', (req, res) => {
            this.processSubscriptionEvent(req, res, true);
        });

        this.app.post('/unsubscribe', (req, res) => {
            this.processSubscriptionEvent(req, res, false);
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

    notifyAboutPR(data) {
        const result = data.text.match(/opened pull request <(.*)\/pull-requests/);
        console.log('-------------------------------------------------------');
        console.log(result);
        console.log('-------------------------------------------------------');
        if (result) {
            const followers = m.getFollowers(data.author_name, result[1]);
            console.log('-------------------------------------------------------');
            console.log(followers);
            console.log('-------------------------------------------------------');
            followers.forEach(follower => this.instance.postMessageToUser(follower, data.text, {attachments: data.attachments}))
        }
    }

    subscribe(followed, follower, repo) {
        m.subscribe(followed, follower, repo);
        this.instance.postMessageToUser(follower, `You have subscribed to ${followed} on ${repo}`);
    }

    unsubscribe(followed, follower, repo) {
        m.unsubscribe(followed, follower, repo);
        this.instance.postMessageToUser(follower, `You have unsubscribed from ${followed} on ${repo}`);
    }
}

new Bot(process.env.BOT_TOKEN,  'testbot').start();
