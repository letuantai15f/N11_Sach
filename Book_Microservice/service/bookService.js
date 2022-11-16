
const customResourceResponse = require('../utils/constants');

class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async addBook(req) {
    const { name } = req.body;
    const { releaseDate } = req.body;
    const { authorName } = req.body;
    //const uuidV4 = uuid.v4();
    const response = {};

    if (!name || !releaseDate || !authorName) {
      response.message = customResourceResponse.reqValidationError.message;
      response.statusCode = customResourceResponse.reqValidationError.statusCode;
      return response;
    }
    const book = await this.bookRepository.addBook( name, releaseDate, authorName);

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

  async updateBookById(req) {
    const { name } = req.body;
    const { releaseDate } = req.body;
    const { authorName } = req.body;

    const response = {};
    // eslint-disable-next-line no-shadow
    const { _id } = req.body;

    const updatedBook = await this.bookRepository.updateBookById(_id, name, releaseDate, authorName);
    if (!updatedBook) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }

    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = updatedBook;
    return response;
  }
  async getBookById(req) {
    const response = {};
    // eslint-disable-next-line no-shadow
    const { _id } = req.body;

    const book = await this.bookRepository.getBookById(_id);
    if (!book) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }
    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    response.data = book;
    return response;
  }
  async deleteBookById(req) {
    const response = {};
    // eslint-disable-next-line no-shadow
    const { _id } = req.body;

    const deletedBook = await this.bookRepository.deleteBookById(_id);
    if (!deletedBook) {
      response.message = customResourceResponse.recordNotFound.message;
      response.statusCode = customResourceResponse.recordNotFound.statusCode;
      return response;
    }

    response.message = customResourceResponse.success.message;
    response.statusCode = customResourceResponse.success.statusCode;
    return response;
  }
}



module.exports = {
  BookService,
};