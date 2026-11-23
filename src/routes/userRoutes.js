const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const validateCreateUser = require('../middleware/validateCreateUser');

router.post('/', validateCreateUser, userController.createUser);
router.get('/', userController.getAllUsers);


module.exports = router;