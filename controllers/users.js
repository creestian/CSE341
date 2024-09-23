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


  module.exports = {
    getAll,
    getSingle
  }