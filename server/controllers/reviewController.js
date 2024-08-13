const Review = require('../modals/reviewModal');

const addReview = async (req, res) => {
    const { rating, review } = req.body;
    const movieId = req.params.id;
    const userId = req.user.id;
  
    try {
      const newReview = await Review.create({ rating, review, movieId, userId });
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const getReviewsByMovieId = async (req, res) => {
    try {
      const reviews = await Review.find({ movieId: req.params.id }).populate('userId', 'name');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  module.exports = { addReview, getReviewsByMovieId };