const Movie = require('../modals/movieModal');


const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('reviews.user', 'name');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getMovies, getMovieById,};
