const Movie = require('../app/models/movie.model');
const data = require('./dummy-data.config');

class PopuldateDb {

    static async loadData() {
        return new Promise(async (resolve, reject) => {
            try {
                let movies = await
                Movie.find();
                if(movies.length == 0) {
                    console.log('No records found in database, populating with dummy data.');
                    let result = await
                    Movie.collection.insertMany(data.movies);
                    console.log('Populated with', data.movies.length, 'records');
                } else{
                    console.log('database has', movies.length, 'movies');
                }
            } catch (err) {
                console.log(err);
                process.exit();
            }
        });
    }
}

module.exports = PopuldateDb;