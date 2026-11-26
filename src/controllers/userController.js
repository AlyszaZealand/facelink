const UserService = require('../services/userService');

exports.createUser = async (req, res) => {
    try {
        const user = await UserService.CreateUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.GetAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Kunne ikke hente brugere' });
    }
};

