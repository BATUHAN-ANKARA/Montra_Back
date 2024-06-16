const { StatusCodes } = require("http-status-codes");
const utils = require("../utils/index");
const baseResponse = require("../dto/baseResponse.dto");
const service = require("../services/index");

exports.register = async (req, res) => {
  try {
    const isInvalid = utils.helper.handleValidation(req);
    if (isInvalid) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ ...baseResponse, ...isInvalid });
    }
    const user = await service.userService.register(req);
    res
      .json({ ...baseResponse, data: user, message: "Kayıt oluşturuldu" })
      .status(StatusCodes.CREATED);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "Kayıt oluşturulamadı",
        error: true,
        success: false,
        errorMessage: error.message,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const _password = utils.helper.hashToPassword(password);
    const user = await User.find({ email: email, password: _password });
    {
    }
    res
      .json({
        ...baseResponse,
        data: user,
        message: "Giriş yapıldı",
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "Giriş yapılamadı",
        error: error,
        errorMessage: error.message,
        succes: false,
        error: true,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .json({
        ...baseResponse,
        data: users,
        message: "Kullanıcılar:",
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "Kullanıcılar bulunamadı",
        error: error,
        errorMessage: error.message,
        succes: false,
        error: true,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const User = await service.userService.updateAvatar(req);
    res
      .json({
        ...baseResponse,
        data: User,
        message: "Güncelleme başarılı",
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "Fotoğrafınız güncellenemedi",
        error: error,
        errorMessage: error.message,
        succes: false,
        error: true,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res
      .json({
        ...baseResponse,
        data: user,
        message: "Kullanıcı:",
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "Kullanıcı bulunamadı",
        error: error,
        errorMessage: error.message,
        succes: false,
        error: true,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (id !== id) {
      throw new Error("Aradığınız id ile kullanıcı bulunamadı");
    }
    const User = await service.userService.updateUserById(req);
    res
      .json({
        ...baseResponse,
        data: User,
        message: "Güncelleme başarılı",
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "Bilgileriniz güncellenemedi",
        error: error,
        errorMessage: error.message,
        succes: false,
        error: true,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const updatedUser = await service.userService.updatePassword(req)
    res
    .json({
      ...baseResponse,
      data: User,
      message: "Güncelleme başarılı",
    })
    .status(StatusCodes.OK);
} catch (error) {
  res
    .json({
      ...baseResponse,
      message: "Şifreniz güncellenemedi",
      error: error,
      errorMessage: error.message,
      succes: false,
      error: true,
    })
    .status(StatusCodes.INTERNAL_SERVER_ERROR);
}
};