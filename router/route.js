const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

// auth routes
router.post('/api/registerUser', userController.registerUser);
router.post('/api/loginUser', userController.loginUser);

//product routes
router.post('/api/products', productController.addProduct);
router.get('/api/products', productController.getAllProducts);

module.exports = router;