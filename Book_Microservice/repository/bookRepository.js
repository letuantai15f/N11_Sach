class BookRepository {
  constructor(bookModel) {
    this.bookModel = bookModel;
  }

  addBook(uuid, name, releaseDate, authorName) {
    return this.bookModel.create({
      uuid,
      name,
      releaseDate,
      authorName,
    });
  }

  getAllBooks() {
    return this.bookModel.find();
  }

  
}

module.exports = {
  BookRepository,
};
