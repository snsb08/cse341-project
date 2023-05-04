const router = require('express').Router();

const controller = require('../controllers/book-series');

router.get('/', controller.allBookSeries);
router.get('/:id', controller.singleBookSeries);

router.post('/', controller.newBookSeries);
router.put('/:id', controller.updateBookSeries);
router.delete('/:id', controller.deleteBookSeries);

module.exports = router;

