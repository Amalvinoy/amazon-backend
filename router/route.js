const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

// auth routes
router.post('/api/register', userController.registerUser);
router.post('/api/login', userController.loginUser);

//product routes
router.use('/api/products', jwtMiddleware);
router.post('/api/products', productController.addProduct);
router.get('/api/products', productController.getAllProducts);

module.exports = router;