let database = '/movies';
let testCases = process.env.test;
let host = testCases ? 'localhost' : process.env.MONGODB_HOST;
let port = testCases ? '27017' : process.env.MONGODB_PORT;

let url = 'mongodb://' + host + ':' + port + database;

module.exports = {
    url
}
