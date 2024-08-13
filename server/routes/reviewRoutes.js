const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const {addReview, getReviewsByMovieId } = require('../controllers/reviewController')


router.post('/:id', auth, addReview);
router.get('/:id', getReviewsByMovieId);


module.exports = router;