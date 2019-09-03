const express = require('express');
const {RTMClient} = require('@slack/rtm-api');
const {WebClient} = require('@slack/web-api');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


class Bot {
    constructor(token) {
        this.rtm = new RTMClient(token);
        this.web = new WebClient(token);
        this.app = express();
        this.client = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

        //app settings
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    processSubscriptionEvent(req, res, subscribe) {
        const result = req.body.text.match(/(^.*) (.*$)/);
        if (result) {
            const [, followed, repo] = result;
            if (subscribe) {
                this.subscribe(req.body.channel_id, followed, req.body.user_name, repo);
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
            if (req.body.attachments) {
                this.notifyAboutPR(req.body.attachments);
            }
        });

        this.app.post('/test', (req, res) => {
            this.testRichMessages(req, res);
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
        (async () => {
            await this.rtm.start();
        })();
    }

    notifyAboutPR(attachments) {
        const {fallback, author_name: followed} = attachments[0];
        if (fallback && followed) {
            const result = fallback.match(/<(.*)\/pull-requests/);
            if (result) {
                const repoName = result[1];
                this.client.connect(err => {
                    const subscribes = this.client.db("subscribes").collection("followed");
                    subscribes.find({followed, repoName}).toArray((err, docs) => {
                        if (docs) {
                            docs.forEach(doc => this.rtm.postMessageToUser(doc.follower, 'PR!', {attachments}));
                        }
                        this.client.close()
                    });
                });
            }
        }
    }

    testRichMessages(req, res) {
        console.log(req.body);
        this.web.chat.postMessage({
            mrkdwn :true,
            link_names: true,
            attachments :[{
                mrkdwn: ["pretext","text","title","fields","fallback"],
                fields:[
                    {title:"Source","value":"_Alexey Sumatokhin.EXT — bbb_\n`bugfix`",short:true},
                    {title:"Destination","value":"_Alexey Sumatokhin.EXT — bbb_\n`master`",short:true}],
                fallback:"Alexey Sumatokhin.EXT opened pull request \"'test'\". <https://stash.firmglobal.com/users/alexeysu/repos/bbb/pull-requests/9/overview|(open)>",
                color:"#2267c4","text":"opened pull request <https://stash.firmglobal.com/users/alexeysu/repos/bbb/pull-requests/9/overview|#9: 'test'>",
                author_name:"Alexey Sumatokhin.EXT","author_icon":"https://secure.gravatar.com/avatar/0935625e030219ae5492d9f4e6c31219.jpg?s=16&d=mm",
            }],
            username:"",
            icon_url:"",
            icon_emoji:"",
            channel: req.body.channel_id
        })
            .then(result => {
                console.log(result);
                res.status(200).send()
            })
            .catch(err => {
                console.log(err);
                res.status(404).send(err)
            });
    }

    subscribe(channel_id, followed, follower, repoName) {
        this.client.connect(err => {
            const subscribes = this.client.db("subscribes").collection("followed");
            const subscribe = {followed, follower, repoName};
            subscribes.updateOne(subscribe, {$set: subscribe}, {upsert: true}, err => {
                this.client.close();
                const msgText = err ? 'insert into db failed' : `You have subscribed to ${followed} on ${repoName}`;
                this.web.chat.postMessage({
                    text: msgText,
                    channel: channel_id
                });
            });
        });
    }

    unsubscribe(followed, follower, repoName) {
        this.client.connect(err => {
            const subscribes = this.client.db("subscribes").collection("followed");
            subscribes.deleteOne({followed, follower, repoName}, {}, err => this.client.close());
        });
        this.rtm.postMessageToUser(follower, `You have unsubscribed from ${followed} on ${repoName}`);
    }
}

new Bot(process.env.BOT_TOKEN).start();