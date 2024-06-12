const { StatusCodes } = require("http-status-codes");
const utils = require("../utils/index");
const consts = require("../consts/index");

module.exports = (req, res, next) => {
  try {
    let query = consts.general.ROUTES.find((route) => {
      if (req.url.includes(route)) {
        return true;
      } else {
        return false;
      }
    });
    if (!query) {
      const token = req.headers.authorization.split(" ")[1];
      const decodeToken = utils.helper.verifyToken(token);
      if (decodeToken.decodeToken === null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: `${error.message}\nUnauthorized access.`,
        });
      }
      req.user = decodeToken;

      next();
      return;
    }
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: `${error.message}\nUnauthorized access.`,
    });
  }
};
