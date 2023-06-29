const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/cartController');
const verifyToken = require('../middlewares/verifyToken');
router.get('/booking', cartController.booking);
router.get('/product', verifyToken, cartController.product);
router.get('/show', verifyToken, cartController.show);
router.post('/hotpot/:slug', verifyToken, cartController.addCartHotpot);
router.post('/topping/:id', verifyToken, cartController.addCartTopping);
module.exports = router;
