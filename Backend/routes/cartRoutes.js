import express from "express";
import { addToCart,Updatecart,getUserCart  } from "../controllers/cartController.js";   
import {isAuth} from "../middleware/isAuth.js";
const cartRouter = express.Router();

cartRouter.post("/add", isAuth, addToCart);
cartRouter.post("/update", isAuth, Updatecart);
cartRouter.post("/get", isAuth, getUserCart);
export default cartRouter;