import Product from "..model/product.js";

export async function addProduct(req, res) {
  try {
    let { name, slug, category, actualPrice, discountedPrice,description } = req.body;
    const newProduct = new Product({
        name, 
        slug,
         category, 
         actualPrice,
          discountedPrice,
          description 
    })
    await newProduct.save();
    return res
      .status(201)
      .json({ message: "new product added", product: {id:newProduct._id ,title:newProduct.slug},
      });}
       catch (error) {
    return res.status(500).json({ message: error.message });
  }
}