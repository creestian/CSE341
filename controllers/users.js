const { createSecureServer } = require('http2');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;



//-------------------------------------
//  GET DB COLLECTION
//-------------------------------------
const getAll = async (req, res, next) => {
    try{
      const result = await mongodb.getDatabase().db().collection('users').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (err) {
      res.status(500).json({message: err.message});
    }
  };
  
  //------------------------------------
  // GET SINGLE USER
  //------------------------------------
  
  const getSingle = async (req, res, next) => {
    try{
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    }catch(err) {
      res.status(500).json(err);
  }
  };

  //------------------------------------
  // CREATE USER
  //------------------------------------
  
  const createUser = async (req, res, next) => {
    try{
      const user = {
        name: req.body.firstName,
        name: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .insertOne(user);
        if (response.acknowledged && response.insertedId) {
          res.status(201).json({ id: response.insertedId });
        } else {
          res.status(500).json({ message: 'Failed to create user' });
        }
    }catch(err) {
      res.status(500).json(err);
  }
  };

  //------------------------------------
  // UPDATE USER
  //------------------------------------
  
  const updateUser = async (req, res, next) => {
    try{
      const userId = new ObjectId(req.params.id);
      const user = {
        name: req.body.firstName,
        name: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .replaceOne({ _id: userId, user});
        if (response.modifiedcount > 0 && response.insertedId) {
          res.status(201).json({ id: response.insertedId });
        } else {
          res.status(500).json({ message: 'Failed to update user' });
        }
    }catch(err) {
      res.status(500).json(err);
  }
  };

  //------------------------------------
  // DELETE USER
  //------------------------------------
  
  const deleteUser = async (req, res, next) => {
    try{
      const userId = new ObjectId(req.params.id);
      const user = {
        name: req.body.firstName,
        name: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .remove({ _id: userId, user});
        if (response.modifiedcount > 0 && response.insertedId) {
          res.status(201).json({ id: response.insertedId });
        } else {
          res.status(500).json({ message: 'Failed to delete user' });
        }
    }catch(err) {
      res.status(500).json(err);
  }
  };


  module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
  }