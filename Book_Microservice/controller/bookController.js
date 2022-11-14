const { BookService } = require('../service/bookService');
const { BookRepository } = require('../Repository/bookRepository');

const BookModel = require('../models/bookModal');

const bookRepository = new BookRepository(BookModel);

const bookService = new BookService(bookRepository);

exports.addBook = async (req, res, next) => {
  try {
    const response = await bookService.addBook(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};
exports.getAllBooks = async (req, res, next) => {
  try {
    const response = await bookService.getAllBooks(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
};