const userDal = require("./user.dal");
const walletDal = require("./wallet.dal");

module.exports = {
  user: userDal,
  wallet: walletDal,
};
