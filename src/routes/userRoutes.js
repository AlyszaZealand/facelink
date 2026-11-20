const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const validateCreateUser = require('../middleware/validateCreateUser');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.post('/', validateCreateUser, userController.createUser);


module.exports = router;