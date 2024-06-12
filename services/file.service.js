const utils = require("../utils/index");
const singleImg = require("../middlewares/singleImage.middleware");

exports.uploadImage = (req, res) => {
  return new Promise((resolve, reject) => {
    singleImg(req, res, async (err) => {
      if (err) {
        reject(err);
      }
      const ip = await utils.helper.getHost();
      const filePath = process.env.FILE_PATH;
      const fileName = req.file.filename;
      const fileString = `${ip}${filePath}${fileName}`;
      resolve(fileString);
    });
  });
};
