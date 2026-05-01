import mongoose from "mongoose";
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL) ;
    console.log("db connected successfully");
}
    catch(err){
      console.log("db connection failed",err);
    }
}
export default connectDB;