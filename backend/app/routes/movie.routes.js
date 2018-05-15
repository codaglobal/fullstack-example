module.exports = (router) => {
    const movies = require('../controllers/movie.controller.js');

    // Create a new Movie
    router.post('/movies', movies.create);

    // Retrieve all movies
    router.get('/movies', movies.findAll);

    // Retrieve a single Movie with movieId
    router.get('/movies/:movieId', movies.findOne);

    // Update a Movie with movieId
    router.put('/movies/:movieId', movies.update);

    // Delete a Movie with movieId
    router.delete('/movies/:movieId', movies.delete);
}