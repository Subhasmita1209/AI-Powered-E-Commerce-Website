import User from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;

    const userData = await User.findById(req.userId);

    // Check if user exists
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure cartData exists
    let cartData = userData.cartData || {};

    // --------------------------
    //   PRODUCT ALREADY EXISTS
    // --------------------------
    if (cartData[itemId]) {

      if (size) {
        // Product has size
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        // Product has NO SIZE
        if (cartData[itemId]["nosize"]) {
          cartData[itemId]["nosize"] += 1;
        } else {
          cartData[itemId]["nosize"] = 1;
        }
      }

    }

    // --------------------------
    //   PRODUCT NOT IN CART
    // --------------------------
    else {

      cartData[itemId] = {};

      if (size) {
        cartData[itemId][size] = 1;
      } else {
        cartData[itemId]["nosize"] = 1;
      }
    }

    // Save cart
    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Added to cart" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "addToCart error" });
  }
};



export const Updatecart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;

    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    // If product does NOT exist in cart
    if (!cartData[itemId]) {
      return res.status(400).json({ message: "Item not found in cart" });
    }

    // Detect key → size or nosize
    const key = size ? size : "nosize";

    // If requested size/nosize does not exist
    if (!cartData[itemId][key]) {
      return res.status(400).json({ message: "Cart entry not found for update" });
    }

    // Update quantity
    cartData[itemId][key] = quantity;

    // If quantity becomes 0 → remove size/nosize key
    if (quantity <= 0) {
      delete cartData[itemId][key];
    }

   

    // Save update
    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(200).json({ message: "Cart updated successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Updatecart error" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    let cartData=await userData.cartData;
    return res.status(200).json( cartData );
    } catch (error) {       
    console.log(error);
    return res.status(500).json({ message: "getUserCart error" });
  }
};