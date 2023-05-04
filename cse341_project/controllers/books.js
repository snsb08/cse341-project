const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



const allBooks = async (req, res) => {
  const result = await mongodb.getDb().db().collection('books').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const singleBook = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('books').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const newBook = async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    finishedReading: req.body.finishedReading   
  };
  const result = await mongodb.getDb().db().collection('books').insertOne(book);
  if (result) {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({
      message: 'Book added succesfully',
      newBook: result
    });
  } else {
    res.status(500).json({
      message: 'An error occured while creating new book'
    });
  }
};

const updateBook = async (req, res) => {
  const userId = new ObjectId({ id: req.params.id });
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    finishedReading: req.body.finishedReading  };

  // ObjectId.updateOne({ id: req.params.id}, book)
  const result = await mongodb
    .getDb()
    .db()
    .collection('books')
    .replaceOne({ _id: userId }, book);
  if (result.modifiedCount > 0) {
    res.status(204).json({
      message: 'Book updated successfully'
    });
  } else {
    res.status(500).json({
      message: 'An error occured while updating'
    });
  }
};

const deleteBook = async (req, res) => {
  const userId = new ObjectId({ id: req.params.id });
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    finishedReading: req.body.finishedReading  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('books')
    .deleteOne({ _id: userId }, book);
  if (result) {
    res.status(200).json({
      message: 'Book deleted successfully'
    });
  } else {
    res.status(500).json({
      message: 'An error occured while deleting'
    });
  }
};


module.exports = { allBooks, singleBook, newBook, updateBook, deleteBook };

