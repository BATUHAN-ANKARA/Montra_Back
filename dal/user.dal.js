const User = require("../models/user.model");

const UserDataAccess = {
  createUser: async (user) => {
    return await user.save();
  },
  updateUser: async (id, user) => {
    return await User.findByIdAndUpdate(id, user, { new: true });
  },
  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },
  find: async (query) => {
    return await User.find(query);
  },
  findOne: async (query) => {
    return await User.findOne(query);
  },
  deleteMany: async (query) => {
    return await User.deleteMany(query);
  },
};

module.exports = UserDataAccess;