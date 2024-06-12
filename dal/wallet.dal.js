const Wallet = require("../models/wallet.model");

const WalletDataAccess = {
  createUser: async (wallet) => {
    return await wallet.save();
  },
  updateUser: async (id, user) => {
    return await Wallet.findByIdAndUpdate(id, user, { new: true });
  },
  deleteUser: async (id) => {
    return await Wallet.findByIdAndDelete(id);
  },
  find: async (query) => {
    return await Wallet.find(query);
  },
  findOne: async (query) => {
    return await Wallet.findOne(query);
  },
  deleteMany: async (query) => {
    return await Wallet.deleteMany(query);
  },
};

module.exports = WalletDataAccess;
