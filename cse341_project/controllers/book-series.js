const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const allBookSeries = async (req, res) => {
  const result = await mongodb.getDb().db().collection('book-series').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const singleBookSeries = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Please insert a valid book series id.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('book-series').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const newBookSeries = async (req, res) => {
  const bookSeries = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    numberOfBooks: req.body.numberOfBooks,
    published: req.body.published,
    finishedReading: req.body.finishedReading
  };

  const result = await mongodb.getDb().db().collection('book-series').insertOne(bookSeries);
  if (result) {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({
      message: 'Book Series added succesfully',
      newBookSeries: result
    });
  } else {
    res.status(500).json({
      message: 'An error occured while creating new book series'
    });
  }
};

const updateBookSeries = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Please insert a valid book series id to update.');
  }
  const userId = new ObjectId({ id: req.params.id });
  const bookSeries = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    numberOfBooks: req.body.numberOfBooks,
    published: req.body.published,
    finishedReading: req.body.finishedReading
  };

  // ObjectId.updateOne({ id: req.params.id}, book-series)
  const result = await mongodb
    .getDb()
    .db()
    .collection('book-series')
    .replaceOne({ _id: userId }, bookSeries);
  if (result.modifiedCount > 0) {
    res.status(204).json({
      message: 'Book Series updated successfully'
    });
  } else {
    res.status(500).json({
      message: 'An error occured while updating'
    });
  }
};

const deleteBookSeries = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Please insert a valid book series id to delete.');
  }
  const userId = new ObjectId({ id: req.params.id });
  const bookSeries = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    numberOfBooks: req.body.numberOfBooks,
    published: req.body.published,
    finishedReading: req.body.finishedReading
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('book-series')
    .deleteOne({ _id: userId }, bookSeries);
  if (result) {
    res.status(200).json({
      message: 'Book Series deleted successfully'
    });
  } else {
    res.status(500).json({
      message: 'An error occured while deleting'
    });
  }
};

module.exports = {
  allBookSeries,
  singleBookSeries,
  newBookSeries,
  updateBookSeries,
  deleteBookSeries
};
