import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import paypal from "@paypal/checkout-server-sdk";
import { paypalClient } from "../config/paypal.js";


export const placeOrder = async (req, res) => {
    try {
        const {  items, amount, address, } = req.body;
        const userId = req.userId;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false, 
            date: Date.now()
        } 
        const newOrder = new Order(orderData);
        await newOrder.save();
         
        await User.findByIdAndUpdate(userId, {cartData:{}})

        res.status(201).json({ message: 'Order placed successfully'});
    }catch(error) {
        console.log('placeOrder error:', error);
        res.status(500).json({ message: 'Failed to place order' });
    }
};

export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId })
        return res.status(200).json(orders);
    }catch(error) {
        console.log('userOrders error:', error);
        res.status(500).json({ message: 'userOrders error' });
    }
}

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json(orders);
    }catch(error) {
        console.log('allOrders error:', error);
        res.status(500).json({ message: 'adminAllorders error' });
    }
}

   export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        return res.status(200).json({ message: 'Order status updated successfully' });
    }catch(error) {

        console.log('updateOrderStatus error:', error);
        res.status(500).json({ message: 'updateOrderStatus error' });
    }
}

export const createPaypalOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: Number(amount).toFixed(2),
          },
        },
      ],
    });

    const order = await paypalClient().execute(request);
    res.json({ id: order.result.id });

  } catch (error) {
    console.error("PayPal CREATE error:", {
      status: error.statusCode,
      details: error.result,
    });
    res.status(500).json({ message: "PayPal create order failed" });
  }
};


export const capturePaypalOrder = async (req, res) => {
  try {
    const { orderID, items, address } = req.body;
    const userId = req.userId;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await paypalClient().execute(request);

    if (capture.result.status !== "COMPLETED") {
      return res.status(400).json({
        message: "Payment not completed",
        paypalStatus: capture.result.status,
      });
    }

    const paypalAmount =
      capture.result.purchase_units[0].payments.captures[0].amount.value;

    const newOrder = new Order({
      userId,
      items,
      amount: paypalAmount,
      address,
      paymentMethod: "PAYPAL",
      payment: true,
      date: Date.now(),
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true });

  } catch (error) {
    console.error("PayPal CAPTURE error:", {
      status: error.statusCode,
      details: error.result,
    });
    res.status(500).json({ message: "PayPal capture failed" });
  }
};
