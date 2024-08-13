const express = require('express');
const router = express.Router();
const { getMovies, getMovieById} = require('../controllers/movieController');



router.get('/movie', getMovies);
router.get('/:id/movie', getMovieById);



module.exports = router;