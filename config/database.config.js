let database = '/movies';
let host = process.env.MONGODB_HOST || (() => {database = '/test'; return 'localhost'})();
let port = process.env.MONGODB_PORT || (() => {database = '/test'; return '27018'})();

let url = 'mongodb://' + host + ':' + port + database;

module.exports = {
    url
}
