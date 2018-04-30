const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    genre: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);