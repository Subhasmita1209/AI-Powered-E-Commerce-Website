import express from "express";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();


// ===============================
// ADD TO WISHLIST
// ===============================
router.post("/add", isAuth, async (req, res) => {
   
  try {
     
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

        const wishIds = user.wishlist.map(id => id.toString());
    if (wishIds.includes(productId)) {
      return res.status(409).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to wishlist"
    });

  } catch (error) {
    console.log("Wishlist add error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// REMOVE FROM WISHLIST
// ===============================
router.delete("/remove/:productId", isAuth, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.userId);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Removed from wishlist"
    });

  } catch (error) {
    console.log("Wishlist remove error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// GET USER WISHLIST
// ===============================
router.get("/", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("wishlist");

    res.status(200).json({
      success: true,
      wishlist: user.wishlist
    });

  } catch (error) {
    console.log("Wishlist fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// CHECK PRODUCT IN WISHLIST
// ===============================
router.get("/check/:productId", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const isWishlisted = user.wishlist
  .map(id => id.toString())
  .includes(req.params.productId);


    res.status(200).json({ isWishlisted });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
