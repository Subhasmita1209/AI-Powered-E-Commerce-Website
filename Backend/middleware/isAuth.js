import jwt from "jsonwebtoken"; 

export const isAuth = (req, res, next) => {
    try {
       
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Unauthorized: No token provided" });
        }                               
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.userId = verifyToken.id;    
        next();
    } catch (error) {       
        console.log("isAuth error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });    
    }
}   