module.exports = (app) => {
    const movies = require('../controllers/movie.controller.js');

    // Create a new Movie
    app.post('/movies', movies.create);

    // Retrieve all movies
    app.get('/movies', movies.findAll);

    // Retrieve a single Movie with movieId
    app.get('/movies/:movieId', movies.findOne);

    // Update a Movie with movieId
    app.put('/movies/:movieId', movies.update);

    // Delete a Movie with movieId
    app.delete('/movies/:movieId', movies.delete);
}