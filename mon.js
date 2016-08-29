var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/data';

var mongoWrapper = (callback) => {
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server.");
        var collection = db.collection('test');
        callback(collection);
        db.close();
    });
};

var insertItems = (item, callback) => {
    console.log('insert items\n');
    mongoWrapper((collection) => {
        console.log('doing stuff in mongo wrapper');
            collection.save(item, callback);
    });
};

var readAllItems = (callback) => {
    console.log('read all items\n');
    var array = [];
    mongoWrapper((collection) => {
        console.log('doing stuff in mongo wrapper');
    collection.find({}).limit(10).each((err, item) => {
        if (item !== null && item !== undefined) {
            array.push(item);
        }
        if (item == undefined) {
            callback(array);
        }
    });
    });
};

function dropCollection(callback) {
     mongoWrapper((collection) => {
         collection.drop();
         console.log('collection dropped');
         callback();
     });
}

// readAllItems(function (array) { console.log(array) });

module.exports = {
    insertItems,
    readAllItems,
    dropCollection,
}
