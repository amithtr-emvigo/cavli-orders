const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/upload-orders', orderController.uploadOrders);
router.get('/get-orders-by-company', orderController.getOrdersByCompany);
router.get('/get-orders-by-address', orderController.getOrdersByAddress);
router.post('/delete-order', orderController.deleteOrder);
router.get('/get-orders-count-of-items', orderController.getOrdersCountOfItems);

module.exports = router;