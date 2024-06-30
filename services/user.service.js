const User = require("../models/user.model");
const utils = require("../utils/index");
const telegramResponse = require("./telegram.service");
const fileService = require("./file.service");

// uygulamaya kayıt
exports.register = async (req) => {
  try {
    let { name, surname, email, password, birthDate, pin } = req.body;
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
      pin,
    });
    await user.save();
    const token = utils.helper.createToken(user._id, user.name, user.email);
    const response = await telegramResponse.registerMessage(
      name,
      surname,
      email
    );
    return {
      token,
      user,
      telegramResult: response,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// hesaba giriş yapma
exports.login = async (req) => {
  try {
    const { email, password } = req.body;
    const _password = utils.helper.hashToPassword(password);
    const user = await User.find({ email: email, password: _password });
    if (user === null || user.length === 0) {
      throw new Error("Email veya şifre hatalı");
    }
    const token = utils.helper.createToken(
      user[0]._id,
      user[0].name,
      user[0].email
    );
    return {
      token,
      user: user[0],
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// bütün kullanıcıları getirme
exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

// profil fotoğrafı güncelleme
exports.updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const str = await fileService.uploadImage(req, res);
    const json = await User.findByIdAndUpdate(
      id,
      { avatar: str },
      { new: true }
    );
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

// şifre güncelleme
exports.updatePassword = async (req) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.find({ email: email });
    if (user === null || user.length === 0) {
      throw new Error("Email hatalı");
    }
    const _password = utils.helper.hashToPassword(newPassword);
    const id = user[0]._id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        newPassword: _password,
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// id ile kullanıcı silme
exports.deleteUserById = async (req) => {
  const userId = req.params.id;
  try {
    // id ile kullanıcıyı silme
    const result = await User.findByIdAndDelete(userId);
    if (result.deletedCount === 1) {
      await telegramResponse.deleteMessage(
        result.name,
        result.surname,
        result.email
      );
      return { message: "Kullanıcı başarıyla silindi." };
    } else {
      return { message: "Kullanıcı bulunamadı." };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

// id ile kullanıcı güncelleme
exports.updateUserById = async (req) => {
  try {
    const { id } = req.params;
    const { name, surname, email, password } = req.body;
    const updatedUserById = await User.findByIdAndUpdate(
      id,
      {
        name,
        surname,
        email,
        password,
      },
      { new: true }
    );
    return updatedUserById;
  } catch (error) {
    throw new Error(error.message);
  }
};

// id ile kullanıcı görme
exports.getUserById = async (req) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user === null || user.length === 0) {
      throw new Error("kullanıcı bulunamadı");
    } else {
      return user;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// uygulama şifresi güncelleme
exports.updateUserPin = async (req) => {
  try {
    const { id } = req.params; // Kullanıcı ID'sini istek parametrelerinden alın
    const { currentPin, newPin } = req.body; // Güncellenmiş PIN verilerini istek gövdesinden alın
    // Kullanıcıyı ID ve mevcut PIN ile bulun
    const user = await User.findOne({ _id: id, pin: currentPin });
    if (!user) {
      throw new Error("Kullanıcı bulunamadı veya mevcut PIN hatalı");
    }
    // Kullanıcı PIN'ini güncelle
    user.pin = newPin;
    await user.save(); // Değişiklikleri kaydedin
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};