const router = require('express').Router();

const controller = require('../controllers/books');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', controller.allBooks);
router.get('/:id', controller.singleBook);

router.post('/', isAuthenticated, validation.saveBook, controller.newBook);
router.put('/:id', isAuthenticated, validation.saveBook, controller.updateBook);
router.delete('/:id', isAuthenticated, controller.deleteBook);

module.exports = router;

