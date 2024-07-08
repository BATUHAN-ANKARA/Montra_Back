const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOtpVertificationSchema = new Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserOtpVertification = mongoose.model(
  "UserOtpVertification",
  UserOtpVertificationSchema
);

module.exports = UserOtpVertification;
