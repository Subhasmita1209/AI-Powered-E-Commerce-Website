import Review from "../models/reviewModel.js";

/* ADD REVIEW */
export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
      // prevent duplicate review by same user
    const existingReview = await Review.findOne({
      productId: req.params.productId,
      userId: req.userId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }


  const review = await Review.create({
    productId: req.params.productId,
    userId: req.userId,
    rating,
    comment,
  });

  res.status(201).json(review);
};

/* GET REVIEWS */
export const getReviews = async (req, res) => {
  const reviews = await Review.find({
    productId: req.params.productId,
  }).populate("userId", "name");

  res.json(reviews);
};

/* UPDATE REVIEW */
export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review)
    return res.status(404).json({ message: "Review not found" });

  if (review.userId.toString() !== req.userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  review.rating = req.body.rating;
  review.comment = req.body.comment;

  await review.save();
  res.json(review);
};

/* DELETE REVIEW */
export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review)
    return res.status(404).json({ message: "Review not found" });

  if (review.userId.toString() !== req.userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await review.deleteOne();
  res.json({ message: "Review deleted" });
};
