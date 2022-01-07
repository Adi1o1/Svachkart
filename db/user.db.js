const User = require('../Models/user.model.js');
const { deleteUser } = require('../services/user.service.js');

var getUsers = async() => {
    try {
        let users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
}

var getUserById = async(userID) => {
    try {
        let user = await User.findById(userID);
        return user;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

var createUser = async(userData) => {
    try {
        let newUser = await user.create(userData);
        return newUser;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

var updateUserDetails = async(userID, userData) => {
    try {
        let updatedUser = await User.findOneAndUpdate({ _id: id }, product);
        return updatedUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}

var deleteUserById = async(userID) => {
    try {
        let deletedUser = await User.findOneAndDelete({ _id: userID });
        return deleteUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserDetails,
    deleteUserById
}