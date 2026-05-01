import jwt from "jsonwebtoken";

export const adminAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Unauthorized: No token provided" });                    
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);      
        if (!verifyToken){
            return res.status(400).json({ message: "Unauthorized: Invalid token" });
        }  
        req.adminEmail = process.env.ADMIN_EMAIL        
        next();
    } catch (error) {       
        console.log("adminAuth error:", error);
        return res.status(500).json({ message: `adminAuth error ${error}` });    
    }
}