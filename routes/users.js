const express = require('express');
const router = express.Router();

 
const usersController = require('../controllers/users');


//--ROUTES
//Get all the collection.
router.get('/', usersController.getAll);
//Get ony document.
router.get('/:id', usersController.getSingle);
//Get all the collection.
router.post('/', usersController.createUser);
//Get ony document.
router.put('/:id', usersController.updateUser);
//Get ony document.
router.delete('/:id', usersController.deleteUser);

module.exports = router;