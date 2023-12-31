import Product from "../models/ProductModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const allProducts = async (req, res) => {
  const resultPerPage = 18;
  const productsCount = await Product.countDocuments();
  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apifeatures.query;

  let filteredproductsCount = products.length;

  apifeatures.pagination(resultPerPage);
  products = await apifeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredproductsCount,
  });
};

export const specificProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    await product.updateOne({ $set: req.body });
    res.status(200).json("Producct Deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOneAndRemove({ _id: productId });
    res.status(200).json("Product Deleted!", product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addReview = async (req, res) => {
  const { userId, rating, description } = req.body;
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = { userId, rating, description };
    product.reviews.push(newReview);

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
