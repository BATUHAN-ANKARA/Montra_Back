const User = require("../models/user.model");
const utils = require("../utils/index");
const telegramResponse = require("./telegram.service");

// 1 Kullanıcı kayıt işlemi (register) - Kemal
exports.register = async (req) => {
  try {
    let { name, surname, email, password, birthDate } = req.body;
    const existUser = await User.find({ email: email });
    if (existUser.length > 0) {
      throw new Error("Bu email adresi ile kayıtlı kullanıcı bulunmaktadır.");
    }
    const _password = utils.helper.hashToPassword(password);
    birthDate = new Date(birthDate);
    const user = new User({
      name,
      surname,
      email,
      password: _password,
      birthDate,
    });
    await user.save();
    const token = utils.helper.createToken(user._id, user.name, user.email);
    const response = await telegramResponse.telegramResponse(name, surname, email);
    return {
      token,
      user,
      telegramResult: response,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
