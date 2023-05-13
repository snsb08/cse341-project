const router = require('express').Router();

const controller = require('../controllers/book-series');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controller.allBookSeries);
router.get('/:id', controller.singleBookSeries);
router.post('/', isAuthenticated, validation.saveBookSeries, controller.newBookSeries);
router.put('/:id', isAuthenticated, validation.saveBookSeries, controller.updateBookSeries);
router.delete('/:id', isAuthenticated, controller.deleteBookSeries);

// router.post('/', validation.saveBookSeries, controller.newBookSeries);
// router.put('/:id', validation.saveBookSeries, controller.updateBookSeries);
// router.delete('/:id', controller.deleteBookSeries);

module.exports = router;

//testing Joi
// const validation = require('../middleware/joi-validation');
// const {bookSeriesSchema} = require('../helpers/validate-schema');

// router.post('/', bookSeriesSchema, controller.newBookSeries);
// router.put('/:id', bookSeriesSchema, controller.updateBookSeries);
