const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();


router.post('/', bookController.save);
router.get('/', bookController.getAll);
router.get('/:bookId', bookController.getById);
router.delete('/:bookId', bookController.deleteById);
router.put('/:bookId', bookController.edit)


module.exports = router;