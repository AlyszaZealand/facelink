const User = require('../Models/userModel');

// CRUD

exports.createUser = async (user) => {
    return await User.create(user);
}

exports.findUserById = async (id) => {
    return await User.findById(id);
}

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

exports.updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
}

exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}
