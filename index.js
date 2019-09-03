const express = require('express');
const {createMessageAdapter} = require('@slack/interactive-messages');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const {listUsersForSubscribe, listUsersForUnsubscribe} = require('./api');
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

        // this.app.post('/push', (req, res) => {
        //     if (req.body.attachments) {
        //         this.notifyAboutPR(req.body.attachments);
        //     }
        // });

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

    // notifyAboutPR(attachments) {
    //     const {fallback, author_name: followed} = attachments[0];
    //     if (fallback && followed) {
    //         const result = fallback.match(/<(.*)\/pull-requests/);
    //         if (result) {
    //             const repoName = result[1];
    //             this.client.connect(err => {
    //                 const subscribes = this.client.db("subscribes").collection("followed");
    //                 subscribes.find({followed, repoName}).toArray((err, docs) => {
    //                     if (docs) {
    //                         docs.forEach(doc => this.rtm.postMessageToUser(doc.follower, 'PR!', {attachments}));
    //                     }
    //                     this.client.close()
    //                 });
    //             });
    //         }
    //     }
    // }
    //
    //

}

new Bot(process.env.BOT_TOKEN).start();