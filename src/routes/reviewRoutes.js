const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/reviews", reviewController.getAllReviews);
router.get("/reviews/:id", reviewController.getReviewById);
router.get("/reviews/order/:order_id", reviewController.getReviewByOrderId);
router.post("/reviews", reviewController.createReview);
router.put("/reviews/:id", reviewController.updateReview);
router.delete("/reviews/:id", reviewController.deleteReview);

module.exports = router;
