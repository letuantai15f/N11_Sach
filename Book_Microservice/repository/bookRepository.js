class BookRepository {
  constructor(bookModel) {
    this.bookModel = bookModel;
  }

  addBook( name, releaseDate, authorName) {
    return this.bookModel.create({
      name,
      releaseDate,
      authorName,
    });
  }

  getAllBooks() {
    return this.bookModel.find();
  }

  getBookById(_id) {
    return this.bookModel.findOne({ _id });
  }
  
  updateBookById(_id, name, releaseDate, authorName) {
    return this.bookModel.findOneAndUpdate({ _id }, {
      $set: { name, releaseDate, authorName }
    }, { new: true });
  }

  deleteBookById(_id) {
    return this.bookModel.findOneAndDelete({ _id });
  }
}

module.exports = {
  BookRepository,
};
