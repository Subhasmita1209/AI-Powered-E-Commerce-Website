
import Product from '../models/productModel.js';
import  uploadOnCloudinary  from '../config/cloudinary.js';
 const addProduct = async(req, res) => {
    try{
      let {name, description, price, category,  subCategory,sizes,bestSeller} = req.body;
    
     let image1 = req.files?.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : null;
let image2 = req.files?.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : null;
let image3 = req.files?.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : null;
let image4 = req.files?.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : null;


         let productData={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes: sizes ? JSON.parse(sizes) : [],
            bestSeller:bestSeller==="true"?true:false,
            date: Date.now(),
            image1,
            image2,
            image3,
            image4
         }
         const product = await Product.create(productData);
          return res.status(201).json({message:"Product added successfully", product});
    }catch(err){
        console.log("Error in adding product:", err);
        return res.status(500).json({message:"Add product Error"+err.message});
    }
}

 const listProduct= async(req, res) => {
    try{
        const products = await Product.find({})
        return res.status(200).json(products);
    }catch(err){
        console.log("Error in listing products:", err);
        return res.status(500).json({message:"List product Error"+err.message});
    }
}

 const removeProduct= async(req, res) => {
    try{
        const {productId} = req.params;
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({message:"Product removed successfully"});
    }catch(err){        
        console.log("Error in removing product:", err);
        return res.status(500).json({message:"Remove product Error"+err.message});
    }
}

 const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        let updateData = { ...req.body };

        // Convert numeric fields
        if (updateData.price) {
            updateData.price = Number(updateData.price);
        }

        // Convert bestseller string to boolean
        if (updateData.bestSeller !== undefined) {
            updateData.bestSeller = updateData.bestSeller === "true";
        }

        // Convert sizes JSON string to array
        if (updateData.sizes) {
            updateData.sizes = JSON.parse(updateData.sizes);
        }

        // Update images if new ones uploaded
        if (req.files) {
            if (req.files.image1) {
                updateData.image1 = await uploadOnCloudinary(req.files.image1[0].path);
            }
            if (req.files.image2) {
                updateData.image2 = await uploadOnCloudinary(req.files.image2[0].path);
            }
            if (req.files.image3) {
                updateData.image3 = await uploadOnCloudinary(req.files.image3[0].path);
            }
            if (req.files.image4) {
                updateData.image4 = await uploadOnCloudinary(req.files.image4[0].path);
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (err) {
        console.log("Error in updating product:", err);
        return res.status(500).json({ message: "Update product Error " + err.message });
    }
};
export {
  addProduct,
  listProduct,
  removeProduct,
  updateProduct
};

