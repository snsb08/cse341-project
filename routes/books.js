const router = require('express').Router();

const controller = require('../controllers/books');

router.get('/', controller.allBooks);
router.get('/:id', controller.singleBook);

router.post('/', controller.newBook);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

module.exports = router;

