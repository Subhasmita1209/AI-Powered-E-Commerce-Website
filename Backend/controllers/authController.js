import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { generateToken, generateToken1 } from '../config/token.js'
export const signup=async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(email)) {
            
            return res.status(400).json({ message: "Enter valid email " });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        let hashpassword=await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashpassword
        });
        let token = await generateToken(newUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
       return res.status(201).json(newUser);
    } catch (error) {
        console.log("signup error:", error);
        res.status(500).json({ message: `signup error ${error.message}` });
      
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User .findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        let token = await generateToken(user._id);
        res.cookie("token", token, {            
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        }); 
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {   
        console.log("login error:", error);
        res.status(500).json({ message: `login error ${error.message}` });
    }   
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("logout error:", error);
        res.status(500).json({ message: `logout error ${error.message}` });
    }
}
export const googleSignup=async(req,res)=>{
    try{
        const {name,email}=req.body;
       let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,               
            });
        }
          let token = await generateToken(user._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });
           return res.status(200).json(user);
        
    }      
 catch(error){
        console.log("google signup error:", error);
        res.status(500).json({ message: `google signup error ${error.message}` });
    }
}   

export const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
           let token = await generateToken1(email);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 1 * 24 * 60 * 60 * 1000 // 30 days
            });
           return res.status(200).json(token);
        }
           return res.status(400).json({message:"Invalid admin credentials"});
        }
    catch(error){
          console.log("AdminLogin error:", error);
        res.status(500).json({ message: `AdminLogin error ${error.message}` });
    }
}
   