// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/:movie_id', reviewController.getReviewsForMovie);
router.post('/', reviewController.addReview);

module.exports = router;
