const express = require('express');

const bookRouter = express.Router();
const bookController = require('../controller/bookController');

bookRouter.post('/book/add', bookController.addBook);
bookRouter.get('/books', bookController.getAllBooks);

module.exports = bookRouter;