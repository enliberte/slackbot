const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient(process.env.MONGO_URI, {useNewUrlParser: true});

const test = () => {
    mongoClient.connect(function(err, client){
        if(err){
            return console.log(err);
        } else {
            console.log('success');
        }
        client.close();
    });
};

module.exports.test = test;

