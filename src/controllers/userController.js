const User = require('../models/user');

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save(); // gemmer brugeren i databasen
    res.status(201).json(user);
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}


