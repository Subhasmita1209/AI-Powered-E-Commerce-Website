import express from 'express';
import { allOrders,updateOrderStatus, placeOrder,userOrders, createPaypalOrder,
  capturePaypalOrder } from '../controllers/orderController.js';
import { isAuth } from '../middleware/isAuth.js';
import { adminAuth } from '../middleware/adminAuth.js';


const orderRoutes = express.Router();

//for user
orderRoutes.post("/placeorder", isAuth,placeOrder);
orderRoutes.post("/userorder", isAuth,userOrders);

//for admin
orderRoutes.post("/list",adminAuth,allOrders );
orderRoutes.post("/status",adminAuth,updateOrderStatus );

// PayPal payment routes
orderRoutes.post("/paypal/create", isAuth, createPaypalOrder);
orderRoutes.post("/paypal/capture", isAuth, capturePaypalOrder);



export default orderRoutes;