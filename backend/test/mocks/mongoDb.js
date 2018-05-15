const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoUnit = require('mongo-unit');
const testData = require('./sample-data');
const Movie = require('../../app/models/movie.model');

class MongoDb {

    constructor() {
    }

    startMockDb(cb) {
        mongoUnit.start()
            .then(url => this.createModels(url))
            .then(() => this.loadTestData(cb))
    }

    createModels(url) {
        mongoose.connect(url);
        console.log("connected");
        var object = {
            Movie: Movie
        };
    }

    loadTestData(cb) {
        mongoUnit.load(testData).then(cb());
    }

}


module.exports.MongoDb = MongoDb;
module.exports.MongoUnit = mongoUnit;
module.exports.initDb = () => {
  let mongoDb = new MongoDb();
  mongoDb.startMockDb(() => {
      console.log("db started.");
  });
};
