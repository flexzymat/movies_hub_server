const express = require('express')
const router = express.Router()
const FavMovies = require('../models/favMovies')

// Getting all
router.get('/', async (req, res) => {
  try {
    const favMovies = await FavMovies.find()
    res.json(favMovies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getfavMovies, (req, res) => {
  res.json(res.favMovies)
})

// Creating one
router.post('/', async (req, res) => {
  const favMovies = new FavMovies({
    title: req.body.title,
    popularity: req.body.popularity,
    release_date: req.body.release_date
  })
  try {
    const newFavMovie = await favMovies.save()
    res.status(201).json(newFavMovie)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getfavMovies, async (req, res) => {
  if (req.body.title != null) {
    res.favMovie.title = req.body.title
  }
  if (req.body.popularity != null) {
    res.favMovie.popularity = req.body.popularity
  }
  if (req.body.release_date != null) {
    res.favMovie.release_date = req.body.release_date
  }
  try {
    const updatedFavMovie = await res.favMovie.save()
    res.json(updatedFavMovie)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getfavMovies, async (req, res) => {
  try {
    await FavMovies.findByIdAndDelete(req.params.id)
    res.json({ message: 'Movie deleted Successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getfavMovies(req, res, next) {
  let favMovie
  try {
    favMovie = await FavMovies.findById(req.params.id)
    if (favMovie == null) {
      return res.status(404).json({ message: 'Cannot find favorite Movie' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.favMovie = favMovie
  next()
}

module.exports = router