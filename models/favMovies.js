const mongoose = require('mongoose')

const favMoviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  popularity: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true,
  }
})

module.exports = mongoose.model('FavMovies', favMoviesSchema)