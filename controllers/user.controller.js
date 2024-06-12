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