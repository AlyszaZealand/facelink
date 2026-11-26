const express = require('express');
const router = express.Router();

const userValidators = require("../validators/userValidator");
const userController = require('../controllers/userController');


const { validateCreateUser } = require('../middleware/validateCreateUser');
// const { validateId } = require("../middleware/validateCreateUser");

router.get('/', userController.getAllUsers);
router.post('/', userValidators.validateUser, validateCreateUser, userController.createUser);


module.exports = router;