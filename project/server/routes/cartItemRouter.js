const express = require('express');
const cartItemController = require('../controllers/cartItemController');

const router = express.Router();


router.post('/', cartItemController.save);
router.get('/', cartItemController.getAll);
router.delete('/:cartItemId', cartItemController.deleteById);
router.patch('/:cartItemId', cartItemController.updateQuantity);


module.exports = router;