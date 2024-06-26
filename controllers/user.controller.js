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

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await service.userService.getUserByEmail(req);
    res
      .json({
        ...baseResponse,
        message: "Email ile kullancıcı getirildi",
        data: user,
        timestamp: new Date(),
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "kullanıcı bulunamadı",
        success: false,
        error: true,
        errorMessage: error.message,
        timestamp: new Date(),
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.getUserByName = async (req, res) => {
  try {
    const user = await service.userService.getUserByName(req);
    res
      .json({
        ...baseResponse,
        message: "İsim ile kullancıcı getirildi",
        data: user,
        timestamp: new Date(),
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "kullanıcı bulunamadı",
        success: false,
        error: true,
        errorMessage: error.message,
        timestamp: new Date(),
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.getUserBySurname = async (req, res) => {
  try {
    const user = await service.userService.getUserBySurname(req);
    res
      .json({
        ...baseResponse,
        message: "Soyisim ile kullancıcı getirildi",
        data: user,
        timestamp: new Date(),
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "kullanıcı bulunamadı",
        success: false,
        error: true,
        errorMessage: error.message,
        timestamp: new Date(),
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.getUserByAge = async (req, res) => {
  try {
    const user = await service.userService.getUserByAge(req);
    res
      .json({
        ...baseResponse,
        message: "Yaş ile kullancıcı getirildi",
        data: user,
        timestamp: new Date(),
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "kullanıcı bulunamadı",
        success: false,
        error: true,
        errorMessage: error.message,
        timestamp: new Date(),
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

exports.getUserByGender = async (req, res) => {
  try {
    const user = await service.userService.getUserByGender(req);
    res
      .json({
        ...baseResponse,
        message: "Cinsiyet ile kullancıcı getirildi",
        data: user,
        timestamp: new Date(),
      })
      .status(StatusCodes.OK);
  } catch (error) {
    res
      .json({
        ...baseResponse,
        message: "kullanıcı bulunamadı",
        success: false,
        error: true,
        errorMessage: error.message,
        timestamp: new Date(),
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
