const router = require('express').Router();

const controller = require('../controllers/books');
const validation = require('../middleware/validate');

router.get('/', controller.allBooks);
router.get('/:id', controller.singleBook);

router.post('/', validation.saveBook, controller.newBook);
router.put('/:id', validation.saveBook, controller.updateBook);
router.delete('/:id', controller.deleteBook);

module.exports = router;

