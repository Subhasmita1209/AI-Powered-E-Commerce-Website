import User from "../models/userModel.js";


export const getCurrentUser=async(req,res)=>{ 
    try{
    const userId=req.userId;
    const user=await User.findById(userId).select("-password");
    if(!user){
        return res.status(404).json({message:"User not found"});    
    }
    return res.status(200).json(user);
    }catch(error){
        console.log("get user error:", error);
        res.status(500).json({ message: `get user error ${error.message}` });

    }
}

export const getAdmin =async(req,res)=>{
    try{
        let adminEmail=req.adminEmail;
        if(!adminEmail){
            return res.status(404).json({message:"Admin not found"});
    }   
        return res.status(200).json({
           email:adminEmail,
           role:"admin"
        })
    }catch(error){
        console.log("get admin error:", error);
        res.status(500).json({ message: `get admin error ${error.message}` });
    }
}
