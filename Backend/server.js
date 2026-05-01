import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import wishlistRoute from "./routes/wishlistRoutes.js";
import reviewRoutes from './routes/reviewRoutes.js';
import aiFilterRoute from './routes/aiFilter.js';
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5174','http://localhost:5173'] ,// Replace with your frontend URL
  credentials: true, // Allow cookies to be sent  

}))
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoutes);

app.use("/api/wishlist", wishlistRoute);

app.use("/api/reviews", reviewRoutes);
app.use("/api/ai", aiFilterRoute);


let port = process.env.PORT ||8080;
app.get('/', (req, res) => {
  res.send('Hello from server!');
});
app.listen(port, () => {
  console.log('Server is running on port 3000');
  connectDB();
});
export default app;