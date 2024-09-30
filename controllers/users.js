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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .insertOne(user);
        if (result.acknowledged) {
          res.status(204).send();
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

  const updateUser = async (req, res) => {
    //swagger.tags=['User']
   const userId = new ObjectId(req.params.id);
  
   const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday 
   };
  
   const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .replaceOne({_id: userId}, user); 
   if(result.modifiedCount > 0) {
    res.status(204).send();
   } else {
    res.status(500).json(result.error || "Error while Updating User")
   }
  }


  //------------------------------------
  // DELETE USER
  //------------------------------------
  
  const deleteUser = async (req, res, next) => {
    
      const userId = new ObjectId(req.params.id);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      };
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .deleteOne({ _id: userId}, user);
        if (result.modifiedcount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json({ message: 'Failed to delete user' });
        }
    
  };


  module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
  }