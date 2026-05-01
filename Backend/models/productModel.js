import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },  
    image1:
    {
        type: String,
        required: true
    },
    image2: 
    {
        type: String,
        required: false 
    },
    image3:
    {
        type: String,
        required: false 
    },  
      image4:
    {
        type: String,
        required: false 
    },  
    description:
    {
        type: String,
        required: true
    },
    
    price:
    {
        type: Number,
        required: true
    },
    category:   
    {
        type: String,
        required: true
    },
    subCategory:
    {
        type: String,
        required: true
    },
    sizes:
    {
        type: Array,
        required: false,
        default: []
    },
    date:{
        type:Number,
        required:true   
    },
    bestSeller:{
        type:Boolean,
      
    },
 
reviews: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
],


},{ timestamps: true });   

const Product = mongoose.model("Product", productSchema);

export default Product;