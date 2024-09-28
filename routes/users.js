const express = require('express');
const router = express.Router();

 
const usersController = require('../controllers/users');


//--ROUTES
//Get all the collection.
router.get('/', usersController.getAll);
//Get ony document.
router.get('/:id', usersController.getSingle);

module.exports = router;