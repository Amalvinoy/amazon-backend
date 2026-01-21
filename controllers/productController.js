const Products = require('../models/Products');

// Add a new product with jwt
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newProduct = new Products({
            name,
            description,
            price,
            category,
            stock: 100
        });
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
