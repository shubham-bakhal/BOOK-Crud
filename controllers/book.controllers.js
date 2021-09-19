const Book = require('../models/book.model');

module.exports.getBook = async (req, res) => {
  const page = parseInt(req.query.page);
  const startIndex = (page - 1) * 5;

  const Books = await Book.find({}).limit(5).skip(startIndex);
  res.status(200).json({ Books: Books });
};

module.exports.createBook = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newBook = new Book({
      name,
      quantity,
    });
    savedBook = await newBook.save();
    return res.status(201).json({ message: savedBook });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.deleteOne({ _id: req.params.id });
    if (deletedBook) {
      res.status(202).json({ message: `${deletedBook.name} is deleted` });
    } else {
      return res.status(404).json({ error: 'No book found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).exec();
    if (!book) return res.status(404).send('No book found');

    let query = { $set: {} };
    for (let key in req.body) {
      if (book[key] && book[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];

      // const updatedBook = await Book.updateOne({
      //   _id: req.params.id,
      //   query,
      // });

      const updatedBook = await Book.findByIdAndUpdate(req.params.id, query, {
        new: true,
      });

      if (updatedBook) {
        return res.status(200).json({ updatedBook });
      } else {
        return res.status(400).json({ error: 'Something went wrong' });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
