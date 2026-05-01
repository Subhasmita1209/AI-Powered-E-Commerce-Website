import express from 'express';
import {googleSignup, signup,login, logout, adminLogin } from '../controllers/authController.js';

export const authRouter = express.Router();
authRouter.post("/signup",  signup);
authRouter.post("/login",  login);
authRouter.get("/logout",  logout);
authRouter.post("/googlesignup",  googleSignup);
authRouter.post("/adminlogin",  adminLogin);

