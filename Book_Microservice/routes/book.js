const express = require('express');

const bookRouter = express.Router();
const bookController = require('../controller/bookController');

bookRouter.post('/book/add', bookController.addBook);
bookRouter.get('/books', bookController.getAllBooks);
bookRouter.get('/book/getbyid', bookController.getBookById);
bookRouter.put('/book/updatebyid', bookController.updateBookById);
bookRouter.delete('/book/delete', bookController.deleteBookById);

module.exports = bookRouter;