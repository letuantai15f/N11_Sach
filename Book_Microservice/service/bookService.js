const uuid = require('uuid');
const customResourceResponse = require('../utils/constants');

class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async addBook(req) {
    const { name } = req.body;
    const { releaseDate } = req.body;
    const { authorName } = req.body;
    const uuidV4 = uuid.v4();
    const response = {};

    if (!name || !releaseDate || !authorName) {
      response.message = customResourceResponse.reqValidationError.message;
      response.statusCode = customResourceResponse.reqValidationError.statusCode;
      return response;
    }
    const book = await this.bookRepository.addBook(uuidV4, name, releaseDate, authorName);

    if (!book) {
      response.message = customResourceResponse.serverError.message;
      response.statusCode = customResourceResponse.serverError.statusCode;
      return response;
    }
    response.message = customResourceResponse.reqCreated.message;
    response.statusCode = customResourceResponse.reqCreated.statusCode;
    response.data = book;
    return response;
  }

  // eslint-disable-next-line no-unused-vars
  async getAllBooks(req) {
    const response = {};

    const books = await this.bookRepository.getAllBooks();

    if (!books) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }
    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = books;
    return response;
  }
}

module.exports = {
  BookService,
};