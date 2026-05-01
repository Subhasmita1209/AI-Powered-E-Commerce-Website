import express from "express";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/:productId", isAuth, addReview);
router.get("/:productId", getReviews);
router.put("/:reviewId", isAuth, updateReview);
router.delete("/:reviewId", isAuth, deleteReview);

export default router;
