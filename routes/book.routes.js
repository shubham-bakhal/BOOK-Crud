const { getBook, createBook, deleteBook, updateBook } = require('../controllers/book.controllers');
const router = require('express').Router();

router.get('/', getBook);
router.post('/create', createBook);
router.delete('/delete/:id', deleteBook);
router.put('/update/:id', updateBook)


module.exports = router;
