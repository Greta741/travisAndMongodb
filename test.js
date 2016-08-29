const mongo = require('./mon.js');
const expect = require('code').expect;

describe('mongodb', () => {
   // var expected = {}

let actualData;
let dataToDb = { _id: 'id1', name: 'dog', text: 'text about dog'};
let expectedData = [ { _id: 'id1', name: 'dog', text: 'text about dog' } ];

before((done) => {
    mongo.insertItems(dataToDb, function () {
        console.log('done');
         mongo.readAllItems(function (array) {
            actualData = array;
            done();  
        });
    });
});

after((done) => {
    mongo.dropCollection(done);
});

    it('readAllItems() should return an array of items', () => {
        expect(actualData).to.be.an.array();
     });
     
     it('readAllItems() should return an array of expected items', () => {
         console.log('actual data\n', actualData);
         console.log('expected data\n', expectedData);
        expect(actualData).to.be.equal(expectedData);
    });
});
